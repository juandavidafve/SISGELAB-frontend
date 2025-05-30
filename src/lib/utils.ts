import { clsx, type ClassValue } from "clsx";
import { formatISO } from "date-fns";
import { format, fromZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import { api } from "./axios";

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

export function zodDateFromString() {
  return z
    .string()
    .date()
    .transform((date) => fromZonedTime(date, "America/Bogota"));
}

export function zodDateTimeFromString() {
  return z
    .string()
    .datetime({ local: true })
    .transform((date) => fromZonedTime(date, "America/Bogota"));
}

export function zodStringFromDate() {
  return z
    .date()
    .transform((date) => formatISO(date, { representation: "date" }));
}

export function zodStringFromDateTime() {
  return z.date().transform((date) => format(date, "yyyy-MM-dd'T'HH:mm:ss"));
}

export function formatDate(date: string | Date, formatStr = "PPP") {
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

export function makeAllFieldsNullable<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
) {
  const shape = schema.shape;
  const nullableShape: { [K in keyof T]: z.ZodNullable<T[K]> } = {} as any;

  for (const key in shape) {
    nullableShape[key] = shape[key].nullable();
  }

  return z.object(nullableShape);
}

export async function downloadFile(url: string, filename: string) {
  const { data } = await api.get(url, {
    responseType: "blob",
  });

  const blob = new Blob([data]);
  const objUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = objUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(objUrl);
}
