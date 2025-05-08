import { Outlet } from "react-router";

import BackgroundImg from "@/assets/images/background.jpg";
import FablabLogoImg from "@/assets/images/fablab-logo.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

interface CardLayoutOptions {
  allowHorizontal?: boolean;
}

export default function CardLayout({
  allowHorizontal = true,
}: CardLayoutOptions) {
  return (
    <>
      <Toaster />
      <main className="relative flex min-h-screen items-center justify-center p-5">
        <div className="absolute top-0 left-0 -z-10 h-screen w-screen">
          <img
            src={BackgroundImg}
            alt="Background"
            className="fixed h-full w-full object-cover"
          />
          <div className="fixed h-full w-full bg-red-500 opacity-50"></div>
        </div>

        <Card>
          <CardContent
            className={cn(
              "grid items-center justify-center gap-6",
              allowHorizontal && "lg:grid-cols-2 lg:gap-12",
            )}
          >
            <img
              src={FablabLogoImg}
              className={cn(
                "mx-auto w-full max-w-16",
                allowHorizontal && "lg:max-w-64",
              )}
              alt="FABLAB Logo"
              width={1506}
              height={1506}
            />
            <Outlet />
          </CardContent>
        </Card>
      </main>
    </>
  );
}
