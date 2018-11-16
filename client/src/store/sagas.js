import { fork } from 'redux-saga/effects';
import { watchMovieSaga } from '../redux/movies/sagas';

export default function* rootSaga() {
  yield [
    fork(watchMovieSaga),
  ];
}

