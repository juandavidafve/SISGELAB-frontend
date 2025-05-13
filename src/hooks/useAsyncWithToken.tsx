import { useMemo } from "react";
import { useAsync, UseAsyncOptions, UseAsyncReturn } from "react-async-hook";

import useAuth from "./useAuth";

export function useAsyncWithToken<T, U>(
  asyncFunction: (...params: U[]) => Promise<T>,
  params: U[],
  options?: UseAsyncOptions<T>,
): UseAsyncReturn<T> {
  const { token } = useAuth();

  const asyncFn = useMemo(() => {
    if (!token) {
      return async () => new Promise<never>(() => {});
    }
    return asyncFunction;
  }, [token, asyncFunction]);

  return useAsync(asyncFn, [...params, token] as U[], options);
}
