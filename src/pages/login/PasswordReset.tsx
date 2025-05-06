import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
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

export default function PasswordReset() {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Restablecer Contraseña</h1>

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
