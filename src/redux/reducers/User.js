import {
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER,
  SET_LOADING,
  USER_FETCH_FAILURED,
  USER_FETCH_SUCCEEDED,
} from "../constants/User"

const initState = {
  loading: false,
  users: [],
  error: null,
}

const user = (state = initState, action) => {
  switch (action.type) {
    case USER_FETCH_SUCCEEDED:
      return {
        ...state,
        users: action.users,
        loading: false,
        error: null,
      }
    case USER_FETCH_FAILURED:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case DELETE_USER:
      return {
        ...state,
        users: [...state.users.filter((item) => item.id !== action.payload)],
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}

export default user
