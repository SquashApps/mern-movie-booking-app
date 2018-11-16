import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';
import configureStore from './store/configure';
import rootSaga from './store/sagas';
import App from './containers/App';


const store = configureStore({});

store.runSaga(rootSaga);

const root = document.getElementById('root');

const renderApp = () => (
  <AppContainer>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </AppContainer>
);

render(renderApp(), root);

if (module.hot) {
  module.hot.accept(() => {
    // eslint-disable-next-line
    render(renderApp(), root);
  });
}
