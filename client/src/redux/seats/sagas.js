import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_MOVIE_GENRE_REQUEST, GET_SEATS_REQUEST, TOGGLE_SEAT_BOOKING_REQUEST } from './constants';
import { getMovieGenres, getSeats, toggleSeatBookingStatus } from './action';
import axios from '../../utils/api';

export function* getMovieGenreFlow() {
  try {
    const data = yield call(axios.get, '/genres');
    yield put(getMovieGenres.success(data));
  } catch (error) {
    yield put(getMovieGenres.error(error));
  }
}

export function* getSeatsFlow() {
  try {
    const data = yield call(axios.get, '/seats');
    yield put(getSeats.success(data));
  } catch (error) {
    yield put(getSeats.error(error));
  }
}


export function* toggleSeatStatusFlow(action) {
  const { payload } = action;
  try {
    const data = yield call(axios.put, '/seats/book', payload);
    const { status } = data;
    if (status === 'notAvailable') {
      yield put(toggleSeatBookingStatus.notAvailable());
    }
    if (status === 'success') {
      yield put(toggleSeatBookingStatus.success(data));
    }
  } catch (error) {
    yield put(toggleSeatBookingStatus.error(error));
  }
}


/**
* Watch Seat saga.
*/
export function* watchSeatSaga() {
  yield takeEvery(GET_MOVIE_GENRE_REQUEST, getMovieGenreFlow);
  yield takeEvery(GET_SEATS_REQUEST, getSeatsFlow);
  yield takeEvery(TOGGLE_SEAT_BOOKING_REQUEST, toggleSeatStatusFlow);
}
