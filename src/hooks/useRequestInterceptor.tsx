import { useEffect } from "react";

import { api } from "@/lib/axios";

import useAuth from "./useAuth";

function useRequestInterceptor() {
  const { token } = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        config.headers.set("TEST", true);

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  return { axiosInstance: api };
}

export default useRequestInterceptor;
