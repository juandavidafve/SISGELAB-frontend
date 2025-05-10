import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { confirmPasswordReset } from "firebase/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputPassword } from "@/components/ui/input-password";
import useAuth from "@/hooks/useAuth";
import { handleFirebaseError } from "@/lib/error";

export default function PasswordReset() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [redirectTimer, setRedirectTimer] = useState<NodeJS.Timeout>();

  let passwordValue = "";
  const formSchema = z.object({
    password: z
      .string()
      .nonempty("La contraseña no debe estar vacía")
      .refine((value) => {
        passwordValue = value;
        return true;
      }),
    passwordCheck: z
      .string()
      .nonempty("Debes confirmar la contraseña")
      .refine(
        (value) => value === passwordValue,
        "Las contraseñas no coinciden",
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordCheck: "",
    },
  });

  useEffect(() => {
    return () => {
      clearTimeout(redirectTimer);
    };
  }, [redirectTimer]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await confirmPasswordReset(
        auth,
        searchParams.get("oobCode") || "",
        values.password,
      );
      toast.success("Contraseña actualizada correctamente");
      setRedirectTimer(setTimeout(() => navigate("/"), 3000));
    } catch (error) {
      if (error instanceof FirebaseError) {
        handleFirebaseError(toast.error, error);
      }

      console.error(error);
    }

    console.log(values);
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Restablecer Contraseña</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Introduce la nueva contraseña</FormLabel>
                <FormControl>
                  <InputPassword {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordCheck"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar la nueva contraseña</FormLabel>
                <FormControl>
                  <InputPassword {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Actualizar contraseña
          </Button>
        </form>
      </Form>

      <div className="mb-4 text-center">
        <Button variant="link" className="text-xs">
          <Link to="..">Volver a inicio de sesión</Link>
        </Button>
      </div>
    </div>
  );
}
