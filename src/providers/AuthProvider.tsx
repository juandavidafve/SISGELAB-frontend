import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState, ReactNode, useCallback, useRef } from "react";
import { useAsync } from "react-async-hook";

import AuthContext from "@/contexts/AuthContext";
import useRequestInterceptor from "@/hooks/useRequestInterceptor";
import { api } from "@/lib/axios";
import { get as getInfoUsuario } from "@/services/info-usuario";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [auth] = useState(() => getAuth());
  const [hasLoggedOut, setHasLoggedOut] = useState(false);
  const hasLoggedIn = useRef(false);

  const interceptorReady = useRequestInterceptor(
    api,
    useCallback(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      [token],
    ),
    useCallback((error) => Promise.reject(error), []),
    token !== undefined,
  );

  const { result: info, execute: refreshInfo } = useAsync(async () => {
    if (!interceptorReady) return undefined;
    return getInfoUsuario();
  }, [interceptorReady, user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const fetchedToken = await currentUser.getIdToken();
        setToken(fetchedToken);
        setHasLoggedOut(false);
        hasLoggedIn.current = true;
      } else {
        setToken(undefined);

        if (hasLoggedIn.current) {
          setHasLoggedOut(true);
        } else {
          setHasLoggedOut(false);
        }
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        auth,
        token: token && interceptorReady ? token : undefined,
        info,
        hasLoggedOut,
        refreshInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
