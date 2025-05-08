import { Outlet } from "react-router";

import AdminSidebar from "@/components/Sidebar";

import BaseLayout from "./BaseLayout";

export default function DashboardLayout() {
  return (
    <BaseLayout className="mt-16 lg:mt-0 lg:ml-16">
      <AdminSidebar />
      <Outlet />
    </BaseLayout>
  );
}
