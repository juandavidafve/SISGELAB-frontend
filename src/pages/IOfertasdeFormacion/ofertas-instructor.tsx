import { Icon } from "@iconify/react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CourseCardProps {
  title: string;
  icon: string;
  onView: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, icon, onView }) => {
  return (
    <Card className="mb-4 w-full max-w-4xl">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4 rounded-md bg-red-500 p-2">
              <Icon icon={icon} className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
            </div>
          </div>
          <Button
            onClick={onView}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Ver
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function OfertasFormacion() {
  const handleViewCourse = (courseTitle: string) => {
    console.log(`Viendo curso: ${courseTitle}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Main content */}
      <main className="flex-grow p-6">
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold">Ofertas de Formación</h2>
          {/* Course card */}
          <CourseCard
            title="Corte y Grabado CNC"
            icon="mdi:book-open-page-variant"
            onView={() => handleViewCourse("Corte y Grabado CNC")}
          />
        </div>
      </main>
    </div>
  );
}
