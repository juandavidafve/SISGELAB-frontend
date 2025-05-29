import { AxiosError } from "axios";
import { differenceInSeconds } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { handleAxiosError } from "@/lib/error";
import { Sesion, SesionOtp } from "@/schemas/sesion";
import { getTokenAsistencia } from "@/services/sesion";

type Props = {
  sesion: Sesion;
  className?: string;
};

export default function TokenViewer({ sesion, className }: Props) {
  const [otp, setOtp] = useState<SesionOtp>();

  const [secondsLeft, setSecondsLeft] = useState(60);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!sesion) return;

    refreshOtp();
  }, [sesion]);

  useEffect(() => {
    if (!otp) return;

    const timeout = differenceInSeconds(otp.expiracion, new Date());
    setSecondsLeft(timeout);

    timeoutRef.current = setTimeout(() => {
      refreshOtp();
    }, timeout * 1000);

    const countdownInterval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [otp]);

  async function refreshOtp() {
    try {
      const data = await getTokenAsistencia(sesion.id);

      setOtp(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        handleAxiosError(toast.error, error);
      }

      console.error(error);
    }
  }

  return (
    <Card className={className}>
      <CardContent>
        <h3 className="mb-3 text-lg font-semibold">Token de Asistencia</h3>
        <div className="flex items-center justify-center gap-6">
          <CircularProgressbar
            value={(secondsLeft / 60) * 100}
            text={`${secondsLeft}s`}
            className="size-40 max-w-fit md:size-20"
            styles={buildStyles({
              textSize: "1.5rem",
              pathColor: "#ef4444",
              textColor: "#171717",
              trailColor: "#e5e5e5",
            })}
          />

          <strong className="font-mono text-4xl">{otp?.token}</strong>
        </div>
      </CardContent>
    </Card>
  );
}
