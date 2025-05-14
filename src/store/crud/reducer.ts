import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_FAILURE,
  POST_REQUEST,
  POST_SUCCESS,
  POST_FAILURE,
  PUT_REQUEST,
  PUT_SUCCESS,
  PUT_FAILURE,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE
} from "./actionTypes";

const initialState = {
  loading: false,
  error: null,
  data: null
};

export default function crudReducer(state = initialState, action: { type: string, payload?: any }): typeof initialState {
  switch (action.type) {
    case GET_REQUEST:
    case POST_REQUEST:
    case PUT_REQUEST:
    case DELETE_REQUEST:
      return { ...state, loading: true, error: null, data: null };
    case GET_SUCCESS:
    case POST_SUCCESS:
    case PUT_SUCCESS:
    case DELETE_SUCCESS:
      return { ...state, loading: false, error: null, data: action.payload };
    case GET_FAILURE:
    case POST_FAILURE:
    case PUT_FAILURE:
    case DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};