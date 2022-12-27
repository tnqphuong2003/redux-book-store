import axios from "axios";
import { BASE_URL } from "./config";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  // function (error) {
  //   console.log("REQUEST ERROR", error);
  // }
  (error) => {
    if (!error.response) {
      console.log("Please check your internet connection.");
    }

    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    console.log("REPONSE ERROR", { error });
    const message = error.response?.response?.errors?.message || "Unknow error";
    return Promise.reject({ message });
  }
);

export default api;
