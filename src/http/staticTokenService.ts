import axios, { AxiosResponse } from "axios";
// import { error } from "console";
const config = {
  baseURL: `${process.env.NEXT_PUBLIC_IpConfig}`,
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
export const authregister = async (
  payload: any
): Promise<AxiosResponse<any, any>> => {
  return axios.post("/api/v1/user/register", payload, config);
};
export const verifyotp_api = async (
  payload: any
): Promise<AxiosResponse<any, any>> => {
  return axios.post("/api/v1/user/verify", payload, config);
};
export const forgotpassword_api = async (
  payload: any
): Promise<AxiosResponse<any, any>> => {
  return axios.post("/api/v1/user/forgotPassword", payload, config);
};
export const enterprise_register = async (
  payload: any
): Promise<AxiosResponse<any, any>> => {
  return axios.post("/api/v1/enterprises", payload, config);
};
export const new_password_api = async (
  payload: any,
  token: any
): Promise<AxiosResponse<any, any>> => {
  return axios.post(`/api/v1/user/resetPassword/${token}`, payload, config);
};
export const get_coupon_all = async (): Promise<AxiosResponse<any, any>> => {
  return axios.get("/api/v1/coupons", config);
};
export const get_coupon_indi = async (
  payload: any
): Promise<AxiosResponse<any, any>> => {
  return axios.get(`/api/v1/coupons/${payload}`, config);
};
export const contact_us_api = async (
  payload: any
): Promise<AxiosResponse<any, any>> => {
  return axios.post(`/api/v1/contactUs`, payload, config);
};

export const get_all_blog_api = async (): Promise<AxiosResponse<any, any>> => {
  return axios.get(`/api/v1/blog/post`, config);
};
export const get_indi_blog_api = async (
  id: any
): Promise<AxiosResponse<any, any>> => {
  return axios.get(`/api/v1/blog/post/${id}`, config);
};

export const driver_register = async (
  payload: any
): Promise<AxiosResponse<any, any>> => {
  return axios.post("/api/v1/driver/register", payload, config);
};

export const driver_login = async (
  payload: any
): Promise<AxiosResponse<any, any>> => {
  return axios.post("/api/V1/driver/login", payload, config);
};

export const verify_driver_otp = async (
  payload: any
): Promise<AxiosResponse<any, any>> => {
  return axios.post("/api/V1/driver/verify", payload, config);
};

export const driver_forgotpassword = async (
  payload: any
): Promise<AxiosResponse<any, any>> => {
  return axios.post("api/V1/driver/forgotPassword", payload, config);
};
export const driver_new_password = async (
  payload: any,
  token: any
): Promise<AxiosResponse<any, any>> => {
  return axios.post(`/api/v1/user/resetPassword/${token}`, payload, config);
};
export const search_api = async (
  payload: any
): Promise<AxiosResponse<any, any>> => {
  return axios.post(
    "/api/v1/blog/post/search?limit=3&offset=0",
    payload,
    config
  );
};
export const Trending_post_api = async (): Promise<AxiosResponse<any, any>> => {
  return axios.get(`/api/v1/blog/post/trending-post?limit=4&offset=0`, config);
};
export const comments_api = async (
  id: any
): Promise<AxiosResponse<any, any>> => {
  return axios.get(`/api/v1/blog/post/${id}/count-comment`, config);
};

export const Likes_api = async (id: any): Promise<AxiosResponse<any, any>> => {
  return axios.get(`/api/v1/blog/post/${id}/count-like`, config);
};
export const get_all_comments_data = async (
  id: any
): Promise<AxiosResponse<any, any>> => {
  return axios.get(`/api/v1/blog/post/${id}/get-all-comment`, config);
};
export const get_all_services = async (): Promise<AxiosResponse<any, any>> => {
  return axios.get(`/api/v1/services`, config);
};
export const get_all_services_indi = async (
  id: string
): Promise<AxiosResponse<any, any>> => {
  return axios.get(`/api/v1/services/${id}`, config);
};
