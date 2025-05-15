import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { FirebaseError } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
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
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import useAuth from "@/hooks/useAuth";
import { handleFirebaseError } from "@/lib/error";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { auth } = useAuth();

  const formSchema = z.object({
    email: z.string().email("El correo no es válido"),
    password: z.string().nonempty("La contraseña no puede estar vacía"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      handleRedirect();
    } catch (error) {
      if (error instanceof FirebaseError) {
        handleFirebaseError(toast.error, error);
      }

      console.error(error);
    }
  }

  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      handleRedirect();
    } catch (error) {
      if (error instanceof FirebaseError) {
        handleFirebaseError(toast.error, error, [
          "auth/popup-closed-by-user",
          "auth/cancelled-popup-request",
        ]);
      }

      console.error(error);
    }
  }

  function handleRedirect() {
    const redirectTo = searchParams.get("redirectTo");
    if (!redirectTo) return;
    navigate(redirectTo);
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Iniciar Sesión</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input placeholder="correo@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <InputPassword {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Iniciar sesión
          </Button>
        </form>
      </Form>

      <div className="mb-4 text-right">
        <Button variant="link" className="text-xs">
          <Link to="../password-recovery">Olvidé mi contraseña</Link>
        </Button>
      </div>

      <div className="relative h-4">
        <div className="h-px w-full bg-gray-500"></div>
        <span className="absolute top-0 left-1/2 -translate-1/2 bg-white px-2 text-xs text-nowrap">
          o inicia sesión con
        </span>
      </div>

      <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
        <Icon icon="devicon:google" />
        Google
      </Button>
    </div>
  );
}
