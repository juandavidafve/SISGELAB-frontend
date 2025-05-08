import { Toaster } from "@/components/ui/sonner";

export default function BaseLayout({
  children,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <>
      <Toaster />
      <main {...props}>{children}</main>
    </>
  );
}
