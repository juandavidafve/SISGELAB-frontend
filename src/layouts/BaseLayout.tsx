import { Toaster } from "@/components/ui/sonner";

export default function BaseLayout({
  children,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <>
      <Toaster position="top-center" richColors />
      <main {...props}>{children}</main>
    </>
  );
}
