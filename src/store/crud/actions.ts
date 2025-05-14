import type { InventoryItem } from "../../interfaces/interface.inventory";
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

export const getRequest = (url: string) => ({
  type: GET_REQUEST,
  url
});

export const getSuccess = (data: InventoryItem[]) => ({
  type: GET_SUCCESS,
  data
});

export const getFailure = (error: unknown) => ({
  type: GET_FAILURE,
  error
});

export const postRequest = (url: string, payload: object) => ({
  type: POST_REQUEST,
  url,
  payload
});

export const postSuccess = (data: object) => ({
  type: POST_SUCCESS,
  data
});

export const postFailure = (error: unknown) => ({
  type: POST_FAILURE,
  error
});

export const putRequest = (url: string, payload: object) => ({
  type: PUT_REQUEST,
  url,
  payload
});

export const putSuccess = (data: object) => ({
  type: PUT_SUCCESS,
  data
});

export const putFailure = (error: unknown) => ({
  type: PUT_FAILURE,
  error
});

export const deleteRequest = (url: string) => ({
  type: DELETE_REQUEST,
  url
});

export const deleteSuccess = (data: object) => ({
  type: DELETE_SUCCESS,
  data
});

export const deleteFailure = (error: unknown) => ({
  type: DELETE_FAILURE,
  error
});