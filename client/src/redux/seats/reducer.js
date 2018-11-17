import { fromJS } from 'immutable';

import {
  GET_MOVIE_GENRE_REQUEST,
  GET_MOVIE_GENRE_SUCCEEDED,
  GET_MOVIE_GENRE_FAILED,
  GET_SEATS_REQUEST,
  GET_SEATS_SUCCEEDED,
  GET_SEATS_FAILED,
  SEAT_NOT_AVAILABLE,
  TOGGLE_SEAT_BOOKING_SUCCEEDED,
  TOGGLE_SEAT_BOOKING_FAILED,
} from './constants';

export const initialState = fromJS({
  genres: [],
  seats: [],
  selectedGenre: 'action',
  isRequestPending: false,
  shouldShowNotAvailableMessage: false,
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

    case TOGGLE_SEAT_BOOKING_SUCCEEDED:
      return state.set('seats',
        state.get('seats')
          .update(
            state.get('seats').findIndex((seat) => {
              return seat.get('_id') === action.payload.seat._id;
            }), (selectedSeat) => {
              return selectedSeat.set('bookingStatus', action.payload.seat.bookingStatus);
            }
          ));

    case TOGGLE_SEAT_BOOKING_FAILED:
      return state.set('error', fromJS(action.payload));

    case SEAT_NOT_AVAILABLE:
      return state.set('shouldShowNotAvailableMessage', true);

    default:
      return state;
  }
};
