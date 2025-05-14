import axios from "axios"

export const publicGet = async (url: string) => {
  return axios.get(url);
};

export const publicPost = async(url: string, payload: object) => {
  return axios.post(url, payload);
}

export const publicPut = async(url: string, payload: object) => {
  return axios.put(url, payload);
}

export const publicDelete = async(url: string) => {
  return axios.delete(url);
}