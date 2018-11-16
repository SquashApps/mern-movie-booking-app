import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import theme from './styles/theme';
import configureStore from './store/configure';
import rootSaga from './store/sagas';
import App from './containers/App';
import routes from './routes';
import AsyncRoute from './containers/AsyncRoute';


const history = createHistory();
const store = configureStore({}, history);

store.runSaga(rootSaga);

const root = document.getElementById('root');

const renderApp = () => (
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <div>
            <App />
            <Switch>
              {routes.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact
                  component={props => (
                    <AsyncRoute
                      authenticated={route.authenticated}
                      visibleOnlyGuest={route.visibleOnlyGuest}
                      footer={route.footer}
                      bottomNav={route.bottomNav}
                      container={import(`./routes/${route.route}/index.js`)}
                      {...props}
                    />
                  )}
                />
              ))}
              <Redirect to="/" />
            </Switch>
          </div>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  </AppContainer>
);

render(renderApp(), root);

if (module.hot) {
  module.hot.accept('routes', () => {
    // eslint-disable-next-line
    require('./routes');
    render(renderApp(), root);
  });
}
