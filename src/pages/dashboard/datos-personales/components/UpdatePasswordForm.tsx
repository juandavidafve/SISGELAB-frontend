import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { handleFirebaseError } from "@/lib/error";
import {
  UpdatePassword,
  UpdatePasswordFormSchema,
} from "@/schemas/datos-personales";

interface UpdatePasswordFormProps {
  onSubmit: (value: UpdatePassword) => void;
}

export default function UpdatePasswordForm({
  onSubmit,
}: UpdatePasswordFormProps) {
  const form = useForm<UpdatePassword>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      password: "",
      passwordCheck: "",
    },
  });

  async function handleSubmit(values: UpdatePassword) {
    try {
      await onSubmit(values);
    } catch (error) {
      if (error instanceof FirebaseError) {
        handleFirebaseError(toast.error, error);
      }

      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
  );
}
