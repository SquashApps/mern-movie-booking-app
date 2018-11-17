import {
  GET_MOVIE_GENRE_REQUEST,
  GET_MOVIE_GENRE_SUCCEEDED,
  GET_MOVIE_GENRE_FAILED,
  GET_SEATS_REQUEST,
  GET_SEATS_SUCCEEDED,
  GET_SEATS_FAILED,
  TOGGLE_SEAT_BOOKING_REQUEST,
  TOGGLE_SEAT_BOOKING_SUCCEEDED,
  TOGGLE_SEAT_BOOKING_FAILED,
  SEAT_NOT_AVAILABLE,
} from './constants';

export const getMovieGenres = {
  request: () => ({ type: GET_MOVIE_GENRE_REQUEST }),
  success: data => ({ type: GET_MOVIE_GENRE_SUCCEEDED, payload: data }),
  error: error => ({ type: GET_MOVIE_GENRE_FAILED, payload: error }),
};

export const getSeats = {
  request: () => ({ type: GET_SEATS_REQUEST }),
  success: data => ({ type: GET_SEATS_SUCCEEDED, payload: data }),
  error: error => ({ type: GET_SEATS_FAILED, payload: error }),
};

export const toggleSeatBookingStatus = {
  request: data => ({ type: TOGGLE_SEAT_BOOKING_REQUEST, payload: data }),
  notAvailable: data => ({ type: SEAT_NOT_AVAILABLE, payload: data }),
  success: data => ({ type: TOGGLE_SEAT_BOOKING_SUCCEEDED, payload: data }),
  error: error => ({ type: TOGGLE_SEAT_BOOKING_FAILED, payload: error }),
};
