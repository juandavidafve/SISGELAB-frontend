import { FirebaseError } from "firebase/app";

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
