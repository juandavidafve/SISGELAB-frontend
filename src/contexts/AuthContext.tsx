import { Auth, getAuth, User } from "firebase/auth";
import { createContext } from "react";

import app from "@/lib/firebase";
import { InfoUsuario } from "@/schemas/info-usuario";

interface AuthContextType {
  user?: User | null;
  token?: string;
  info?: InfoUsuario;
  auth: Auth;
  hasLoggedOut: boolean;
  refreshInfo: () => void;
}

const AuthContext = createContext<AuthContextType>({
  auth: getAuth(app),
  hasLoggedOut: false,
  refreshInfo: () => {},
});

export default AuthContext;
