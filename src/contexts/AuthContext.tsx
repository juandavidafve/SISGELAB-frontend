import { Auth, getAuth, User } from "firebase/auth";
import { createContext } from "react";

import app from "@/lib/firebase";
import { InfoUsuario } from "@/schemas/info-usuario";

interface AuthContextType {
  user?: User | null;
  token?: string;
  info?: InfoUsuario;
  auth: Auth;
  refreshInfo: () => void;
}

const AuthContext = createContext<AuthContextType>({
  auth: getAuth(app),
  refreshInfo: () => {},
});

export default AuthContext;
