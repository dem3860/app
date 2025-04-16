import axios, { AxiosRequestConfig } from "axios";

// axiosを使用してHTTPリクエストを送る関数。ジェネリクスを使用してレスポンスの型を指定できるようにした。
export const customInstance = <T = unknown>(
  config: AxiosRequestConfig
): Promise<T> => {
  const instance = axios.create({
    baseURL: "http://localhost:8787", // バックエンドのURL。本来は環境変数から取得するべき。
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
    },
  });

  return instance.request<T>(config).then((res) => res.data);
};
