import axios, { AxiosResponse } from "axios";
import { error } from "console";
const config = {
  baseURL: "http://192.168.68.91:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJVc2VybmFtZSI6IktldGFuIiwiUGFzc3dvcmQiOiJLZXRhbkAxMjIzIn0.2ypcOji0gmoYcFfGaa16cD5SNtYW8is8bx779KcMOM8",
  },
};

export const authLogin = async (
  payload: any
): Promise<AxiosResponse<any, any>> => {
  return axios.post("/api/v1/user/login", payload, config);
};
export const authregister = async (payload: any)
: Promise<AxiosResponse<any, any>> => {
  return axios.post("/api/v1/user/register", payload, config);
};
export const verifyotp_api = async (payload: any)
: Promise<AxiosResponse<any, any>> => {
  return axios.post("/api/v1/user/verify", payload, config);
};
export const forgotpassword_api = async (payload: any)
: Promise<AxiosResponse<any, any>> => {
  return axios.post("/api/v1/user/forgotPassword", payload, config);
};

