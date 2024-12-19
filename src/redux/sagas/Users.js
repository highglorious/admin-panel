// sagas.js
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchUsersSuccess, fetchUsersFailure } from "../actions/Users";
import { FETCH_USERS_REQUEST } from "../constants/Users";
import exampleService from "services/ExampleService";

function* fetchDataSaga() {
  try {
    const users = yield call(exampleService.getUsers);
    yield put(fetchUsersSuccess(users));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

export default function* watchFetchDataSaga() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchDataSaga);
}
