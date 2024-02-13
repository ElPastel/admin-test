import {
  USER_FETCH_REQUESTED,
  SET_LOADING,
  USER_FETCH_SUCCEEDED,
  USER_FETCH_FAILURED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER,
} from "../constants/User"

export const fetchUsers = () => {
  return {
    type: USER_FETCH_REQUESTED,
  }
}
export const fetchUsersSucceeded = (users) => {
  return {
    type: USER_FETCH_SUCCEEDED,
    users,
  }
}

export const fetchUsersFailured = (error) => {
  return {
    type: USER_FETCH_FAILURED,
    error: error.message,
  }
}

export const setLoading = () => {
  return {
    type: SET_LOADING,
  }
}

export const deleteUser = (userId) => ({
  type: DELETE_USER_REQUEST,
  payload: userId,
})

export const deleteUserSucceeded = (userId) => ({
  type: DELETE_USER_SUCCESS,
})

export const deleteUserFailured = (userId) => ({
  type: DELETE_USER_FAILURE,
})

export const deleteUserByFilter = (userId) => ({
  type: DELETE_USER,
  payload: userId,
})
