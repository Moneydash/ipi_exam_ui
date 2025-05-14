import { put, takeEvery } from "redux-saga/effects";
import { publicDelete, publicGet, publicPost, publicPut } from "../../api/request";
import { deleteFailure, deleteSuccess, getFailure, getSuccess, postFailure, postSuccess, putFailure, putSuccess } from "./actions";
import { AxiosError } from "axios";
import { DELETE_REQUEST, GET_REQUEST, POST_REQUEST, PUT_REQUEST } from "./actionTypes";
import { toast } from "react-toastify";

function* getSaga(action: { type: string; url: string }): Generator<any, void> {
  try {
    const response = yield publicGet(action.url);
    if (response.status === 200) {
      const data = response.data;
      console.log('Data: ', data);
      yield put(getSuccess(data?.data));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(getFailure(error));
    } else {
      yield put(getFailure(error));
    }
    toast.error('Something went wrong.');
  }
};

function* postSaga(action: { type: string; url: string, payload: object }): Generator<any, void, any> {
  try {
    const response = yield publicPost(action.url, action.payload);
    if (response.status === 200 || response.status === 201) {
      const data = response.data;
      yield put(postSuccess(data));
    }
    toast.success('Success');
  }catch (error) {
    if (error instanceof AxiosError) {
      yield put(postFailure(error));
    } else {
      yield put(postFailure(error));
    }
    toast.error('Something went wrong.');
  }
}

function* putSaga(action: { type: string; url: string, payload: object }): Generator<any, void, any> {
  try {
    const response = yield publicPut(action.url, action.payload);
    if (response.status === 200 || response.status === 201) {
      const data = response.data;
      yield put(putSuccess(data));
    }
    toast.success('Success');
  }catch (error) {
    if (error instanceof AxiosError) {
      yield put(putFailure(error));
    } else {
      yield put(putFailure(error));
    }
    toast.error('Something went wrong.');
  }
}

function* deleteSaga(action: { type: string; url: string }): Generator<any, void> {
  try {
    const response = yield publicDelete(action.url);
    if (response.status === 200) {
      const data = response.data;
      console.log('Data: ', data);
      yield put(deleteSuccess(data?.data));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(deleteFailure(error));
    } else {
      yield put(deleteFailure(error));
    }
    toast.error('Something went wrong.');
  }
};

function* crudSaga() {
  yield takeEvery(GET_REQUEST, getSaga);
  yield takeEvery(POST_REQUEST, postSaga);
  yield takeEvery(PUT_REQUEST, putSaga);
  yield takeEvery(DELETE_REQUEST, deleteSaga);
};

export default crudSaga;