import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState, ReactNode } from "react";
import { useAsync } from "react-async-hook";

import AuthContext from "@/contexts/AuthContext";
import { get as getInfoUsuario } from "@/services/info-usuario";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [auth] = useState(() => getAuth());

  const { result: info } = useAsync(async () => {
    return token ? await getInfoUsuario() : undefined;
  }, [token]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const fetchedToken = await currentUser.getIdToken();
        setToken(fetchedToken);
      } else {
        setToken(undefined);
      }
    });

    return () => unsubscribe();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, auth, token, info }}>
      {children}
    </AuthContext.Provider>
  );
};
