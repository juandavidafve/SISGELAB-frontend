import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
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
import useAuth from "@/hooks/useAuth";

export default function PasswordRecovery() {
  const { auth } = useAuth();

  const formSchema = z.object({
    email: z.string().email("El correo no es válido"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await sendPasswordResetEmail(auth, values.email);

    toast.success(`Enlace de recuperación enviado a ${values.email}`);
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Recuperar Contraseña</h1>

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

          <Button type="submit" className="w-full">
            Enviar enlace
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
