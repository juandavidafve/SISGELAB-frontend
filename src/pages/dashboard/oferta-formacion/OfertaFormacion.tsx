import { useAsyncWithToken } from "@/hooks/useAsyncWithToken";
import { get as getOfertas } from "@/services/oferta";

export default function OfertaFormacion() {
  const { result } = useAsyncWithToken(getOfertas, []);

  return JSON.stringify(result);
}
