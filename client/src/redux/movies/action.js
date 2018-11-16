import {
  GET_MOVIE_GENRE_REQUEST,
  GET_MOVIE_GENRE_SUCCEEDED,
  GET_MOVIE_GENRE_FAILED,
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCEEDED,
  GET_MOVIES_FAILED,
} from './action';
import { } from './constants';

export const getMoviesGenres = {
  request: () => ({ type: GET_MOVIE_GENRE_REQUEST }),
  success: data => ({ type: GET_MOVIE_GENRE_SUCCEEDED, payload: data }),
  error: error => ({ type: GET_MOVIE_GENRE_FAILED, payload: error }),
};

export const getMovies = {
  request: data => ({ type: GET_MOVIES_REQUEST, payload: data }),
  success: data => ({ type: GET_MOVIES_SUCCEEDED, payload: data }),
  error: error => ({ type: GET_MOVIES_FAILED, payload: error }),
};
