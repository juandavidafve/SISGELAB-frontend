import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

import app from "@/lib/firebase";

export default function useAuth() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return { user };
}
