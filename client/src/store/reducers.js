import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import seatReducer from '../redux/seats/reducer';

const routeInitialState = fromJS({ location: null });

function routerReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({ location: action.payload });
    default:
      return state;
  }
}

export default combineReducers({
  router: routerReducer,
  seat: seatReducer,
});
