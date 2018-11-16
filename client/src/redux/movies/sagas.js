import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_MOVIE_GENRE_REQUEST } from './constants';
import { getMovieGenres } from './action';

export function* getMovieGenreFlow() {
  try {
    const data = yield call();
    yield put(getMovieGenres.success(data));
  } catch (error) {
    yield put(getMovieGenres.error(error));
  }
}

/**
* Watch Movie saga.
*/
export function* watchMovieSaga() {
  yield takeEvery(GET_MOVIE_GENRE_REQUEST, getMovieGenreFlow);
}
