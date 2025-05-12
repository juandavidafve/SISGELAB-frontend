import { clsx, type ClassValue } from "clsx";
import { format, fromZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function urlMerge(...inputs: unknown[]) {
  const inputsStr = inputs.map((i) => String(i));

  let base = "";
  const prefix = inputsStr[0].startsWith("/") ? "/" : "";

  try {
    const url = new URL(inputsStr[0]);
    base = url.origin + url.pathname;
    inputsStr.shift();
  } catch {
    base = "";
  }

  return (
    base +
    prefix +
    inputsStr
      .flatMap((inputs) => inputs.split("/").filter((item) => item.length > 0))
      .join("/") +
    "/"
  );
}

export function formatDate(date: string, formatStr = "PPP") {
  return format(fromZonedTime(date, "America/Bogota"), formatStr, {
    locale: es,
  });
}

export function formatMoney(quantity: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(quantity);
}
