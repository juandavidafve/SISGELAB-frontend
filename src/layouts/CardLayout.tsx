import { Outlet } from "react-router";

import BackgroundImg from "@/assets/images/background.jpg";
import FablabLogoImg from "@/assets/images/fablab-logo.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CardLayoutOptions {
  allowHorizontal?: boolean;
}

export default function CardLayout({
  allowHorizontal = true,
}: CardLayoutOptions) {
  return (
    <main className="flex items-center justify-center min-h-screen relative p-5">
      <div className="absolute top-0 left-0 h-screen w-screen -z-10">
        <img
          src={BackgroundImg}
          alt="Background"
          className="fixed object-cover w-full h-full"
        />
        <div className="fixed w-full h-full bg-red-500 opacity-50"></div>
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
              "w-full max-w-16 mx-auto",
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
  );
}
