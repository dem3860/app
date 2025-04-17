import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const customInstance = async <T = unknown>(
  config: AxiosRequestConfig
): Promise<T> => {
  const accessToken = Cookies.get("accessToken");

  const instance = axios.create({
    baseURL: "http://localhost:8787",
    withCredentials: true,
  });

  const headers = {
    ...config.headers,
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };
  return instance
    .request<T>({
      ...config,
      headers,
    })
    .then((res) => res.data);
};
