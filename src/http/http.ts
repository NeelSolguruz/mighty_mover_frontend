// import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
// // import { userToken } from 'utils'

// export interface ApiErrorData {
//   message: string;
// }

// // Create a map to store the AbortController instances
// const abortControllers = new Map<string, AbortController>();

// // Create a function to generate a unique token for each request
// const generateRequestToken = (config: InternalAxiosRequestConfig) => {
//   const { method, url, params, data } = config;
//   return `${String(method)}-${String(url)}-${JSON.stringify(
//     params
//   )}-${JSON.stringify(data)}`;
// };

// // Create instance of axios
// const http = axios.create({
//   baseURL:  "http://192.168.68.84:3000",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// // Create a request interceptor for the instance and get accessToken
// http.interceptors.request.use(
//   async (config) => {
//     // Attach an AbortController to the request
//     const requestToken = generateRequestToken(config);
//     const abortController = new AbortController();
//     abortControllers.set(requestToken, abortController);
//     config.signal = abortController.signal;

//     // Set timeout for the request
//     // config.timeout = 5000

//     // Set Authorization header
//     const data = localStorage.getItem("data") || null;
//     const token = data && JSON.parse(data || "");
//     console.log(token.token)
//     config.headers.Authorization = `Bearer ${token.token} `;
//     return config;
//   },
//   async (error: any) => {
//     console.log("Global Error 2", error);
//     return await Promise.reject(error);
//   }
// );

// http.interceptors.response.use(
//   (response: any) => response,
//   async (error: AxiosError<ApiErrorData>) => {
//     if (axios.isAxiosError(error) && error.response) {
//       if (error?.response.status === 401 || error?.response?.status === 500) {
//         // localStorage.clear()
//         // window.location.reload()
//         return "";
//       }
//       throw error;
//     }
//   }
// );

// // Create a function to cancel a request using the associated AbortController
// export const cancelRequest = (config: InternalAxiosRequestConfig) => {
//   const requestToken = generateRequestToken(config);
//   const abortController = abortControllers.get(requestToken);
//   if (abortController) {
//     abortController.abort();
//     abortControllers.delete(requestToken);
//   }
// };

// export default http;
import { useAppSelector } from "@/redux/hooks";
import axios, { AxiosError } from "axios";
import { RootState, makeStore } from "./../redux/store";

export interface ApiErrorData {
  message: string;
}

// Create a map to store the AbortController instances
const abortControllers = new Map<string, AbortController>();

// Create a function to generate a unique token for each request
const generateRequestToken = (config: any) => {
  const { method, url, params, data } = config;
  return `${String(method)}-${String(url)}-${JSON.stringify(
    params
  )}-${JSON.stringify(data)}`;
};

// Create instance of axios
const http = axios.create({
  baseURL: "http://192.168.68.103:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Create a request interceptor for the instance and get accessToken
http.interceptors.request.use(
  async (config) => {
    // console.log("dfdf");

    // Attach an AbortController to the request
    const requestToken = generateRequestToken(config);
    const abortController = new AbortController();
    abortControllers.set(requestToken, abortController);
    config.signal = abortController.signal;

    // Set Authorization header based on user type (driver or regular user)
    const state = makeStore.getState() as RootState;
    const user = state.user;
    const driver = state.driver;
    console.log(driver.driver.token);

    let token = null;
    if (user?.user?.user) {
      console.log(user.user);
      token = user?.user?.token; 
    } else {
      token = driver?.driver?.token;
    }
    config.headers.Authorization = `Bearer ${token}`;
    console.log(config);

    return config;
  },
  async (error: any) => {
    console.log("Global Error 2", error);
    return await Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: any) => response,
  async (error: AxiosError<ApiErrorData>) => {
    if (axios.isAxiosError(error) && error.response) {
      if (error?.response.status === 401 || error?.response?.status === 500) {
        // Handle unauthorized or server error
      }
      throw error;
    }
  }
);

// Create a function to cancel a request using the associated AbortController
export const cancelRequest = (config: any) => {
  const requestToken = generateRequestToken(config);
  const abortController = abortControllers.get(requestToken);
  if (abortController) {
    abortController.abort();
    abortControllers.delete(requestToken);
  }
};

export default http;
