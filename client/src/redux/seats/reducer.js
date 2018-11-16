import { fromJS } from 'immutable';

import {
  GET_MOVIE_GENRE_REQUEST,
  GET_MOVIE_GENRE_SUCCEEDED,
  GET_MOVIE_GENRE_FAILED,
  GET_SEATS_REQUEST,
  GET_SEATS_SUCCEEDED,
  GET_SEATS_FAILED,
} from './constants';

export const initialState = fromJS({
  genres: [],
  seats: [],
  selectedGenre: 'action',
  isRequestPending: false,
  error: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_GENRE_REQUEST:
      return state.set('isRequestPending', true);

    case GET_MOVIE_GENRE_SUCCEEDED:
      return state.set('genres', fromJS(action.payload))
        .set('isRequestPending', false);

    case GET_MOVIE_GENRE_FAILED:
      return state.set('isRequestPending', false)
        .set('errors', fromJS(action.payload));

    case GET_SEATS_REQUEST:
      return state.set('isRequestPending', true);

    case GET_SEATS_SUCCEEDED:
      return state.set('seats', fromJS(action.payload));

    case GET_SEATS_FAILED:
      return state.set('isRequestPending', false);

    default:
      return state;
  }
};
