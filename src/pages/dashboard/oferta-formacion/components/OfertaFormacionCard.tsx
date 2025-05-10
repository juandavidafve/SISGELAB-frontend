import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OfertaFormacionMinimal } from "@/schemas/oferta-formacion";

interface OfertaFormacionCardProps {
  oferta: OfertaFormacionMinimal;
}

export default function OfertaFormacionCard({
  oferta,
}: OfertaFormacionCardProps) {
  return (
    <Card className="mb-4 w-full max-w-4xl">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4 rounded-md bg-red-500 p-2">
              <Icon
                icon="material-symbols:book-2-outline-rounded"
                className="h-6 w-6 text-white"
              />
            </div>
            <div>
              <h3 className="font-medium">{oferta.nombre}</h3>
            </div>
          </div>
          <Link to="">
            <Button className="bg-red-500 text-white hover:bg-red-600">
              Ver
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
