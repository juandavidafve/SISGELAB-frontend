import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

function useRequestInterceptor(
  axios: AxiosInstance,
  onFullfilled: (
    value: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
  onRejected: (error: unknown) => unknown,
  check: boolean,
) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (check) {
      const requestInterceptor = axios.interceptors.request.use(
        onFullfilled,
        onRejected,
      );

      setReady(true);

      return () => {
        axios.interceptors.request.eject(requestInterceptor);
      };
    }
  }, [axios, onFullfilled, onRejected, check]);

  return ready;
}

export default useRequestInterceptor;
