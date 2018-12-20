import { delay, fork, put, take } from 'redux-saga/effects';
import actions from './actions';

function* watchPretendToFetch() {
  while (true) {
    yield take(actions.pretendToFetch);
    yield delay(3000);
    yield put(actions.showLoading('Now Loading...'));
    yield delay(3000);
    yield put(actions.updateProgress(50));
    yield delay(3000);
    yield put(actions.updateProgress(100));
    yield put(
      actions.showResult({
        text: 'Hello',
        time: new Date(),
      }),
    );
  }
}

const combinedSagas = [
  watchPretendToFetch,
  // add new sagas here
];

function* rootSaga() {
  for (const saga of combinedSagas) {
    // Use fork to run sagas in parallel
    yield fork(saga);
  }
}

export default rootSaga;
