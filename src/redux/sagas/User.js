import { put, call, takeLatest } from "redux-saga/effects"
import { DELETE_USER_REQUEST, USER_FETCH_REQUESTED } from "../constants/User"
import {
  deleteUserFailured,
  deleteUserSucceeded,
  fetchUsersFailured,
  fetchUsersSucceeded,
  setLoading,
} from "../actions/User"

import UserService from "services/UserService"

function* getUsers() {
  try {
    yield put(setLoading())
    const users = yield call(UserService.getUsers)
    yield put(fetchUsersSucceeded(users))
  } catch (err) {
    yield put(fetchUsersFailured(err))
  }
}

function* deleteUser(action) {
  try {
    yield put(setLoading())
    const userId = action.payload
    yield call(UserService.deleteUser, userId)
    const users = yield call(UserService.getUsers)
    yield put(fetchUsersSucceeded(users))
    yield put(deleteUserSucceeded)
  } catch (error) {
    yield put(deleteUserFailured)
  }
}

export default function* rootSaga() {
  yield takeLatest(USER_FETCH_REQUESTED, getUsers)
  yield takeLatest(DELETE_USER_REQUEST, deleteUser)
}
