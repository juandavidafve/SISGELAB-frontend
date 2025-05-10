import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

import app from "@/lib/firebase";

export default function useAuth() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [auth] = useState(getAuth(app));
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setToken(await currentUser?.getIdToken());
    });

    return () => unsubscribe();
  }, []);

  return { user, auth, token };
}
