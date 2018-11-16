import {
  GET_MOVIE_GENRE_REQUEST,
  GET_MOVIE_GENRE_SUCCEEDED,
  GET_MOVIE_GENRE_FAILED,
  GET_SEATS_REQUEST,
  GET_SEATS_SUCCEEDED,
  GET_SEATS_FAILED,
} from './constants';

export const getMovieGenres = {
  request: () => ({ type: GET_MOVIE_GENRE_REQUEST }),
  success: data => ({ type: GET_MOVIE_GENRE_SUCCEEDED, payload: data }),
  error: error => ({ type: GET_MOVIE_GENRE_FAILED, payload: error }),
};

export const getSeats = {
  request: data => ({ type: GET_SEATS_REQUEST, payload: data }),
  success: data => ({ type: GET_SEATS_SUCCEEDED, payload: data }),
  error: error => ({ type: GET_SEATS_FAILED, payload: error }),
};
