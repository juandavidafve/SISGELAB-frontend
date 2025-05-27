import useAuth from "@/hooks/useAuth";

import CertificadosList from "./components/CertificadosList";
import Plantillas from "./components/Plantillas";

export default function Certificados() {
  const { info } = useAuth();

  return (
    <>
      <h1 className="my-10 text-2xl font-bold">Certificados</h1>

      {info?.roles.includes("ROLE_INSTRUCTOR") && <CertificadosList />}
      {info?.roles.includes("ROLE_ADMINISTRADOR") && <Plantillas />}
    </>
  );
}
