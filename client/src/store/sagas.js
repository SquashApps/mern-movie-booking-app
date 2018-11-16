import { fork } from 'redux-saga/effects';
import { watchSeatSaga } from '../redux/seats/sagas';

export default function* rootSaga() {
  yield [
    fork(watchSeatSaga),
  ];
}

