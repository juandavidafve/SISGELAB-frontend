import { AxiosError } from "axios";
import { FirebaseError } from "firebase/app";

import { ErrorSchema } from "@/schemas/error";

export function handleFirebaseError(
  callback: (msg: string) => void,
  error: FirebaseError,
  ignoredCodes: string[] = [],
) {
  if (!ignoredCodes.includes(error.code)) {
    callback(getFirebaseErrorMsg(error));
  }
}

function getFirebaseErrorMsg(error: FirebaseError) {
  const errorMapping = new Map();

  errorMapping.set(
    "auth/invalid-credential",
    "Las credenciales no son válidas",
  );
  errorMapping.set(
    "auth/too-many-requests",
    "Demasiadas peticiones. Inténtalo más tarde.",
  );
  errorMapping.set(
    "auth/invalid-action-code",
    "El código de acción no es válido",
  );
  errorMapping.set("auth/weak-password", "La contraseña es muy débil");

  return errorMapping.get(error.code) || error.code;
}

export function handleAxiosError(
  callback: (msg: string) => void,
  error: AxiosError,
) {
  if (error.response) {
    const { data } = ErrorSchema.safeParse(error.response.data);

    if (data) {
      for (const msg of data.messages) {
        callback(msg);
      }
    }
  }
}
