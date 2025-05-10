import { useEffect, useState } from "react";
import { useAsync, UseAsyncOptions, UseAsyncReturn } from "react-async-hook";

import useAuth from "./useAuth";
import useRequestInterceptor from "./useRequestInterceptor";

export function useAsyncWithToken<T, U>(
  asyncFunction: () => Promise<T>,
  params: U[],
  options?: UseAsyncOptions<T>,
): UseAsyncReturn<T> {
  useRequestInterceptor();
  const { token } = useAuth();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (token) setEnabled(true);
  }, [token]);

  const wrappedAsyncFn = enabled
    ? asyncFunction
    : async () => new Promise<never>(() => {});

  return useAsync(wrappedAsyncFn, [...params, wrappedAsyncFn], options);
}
