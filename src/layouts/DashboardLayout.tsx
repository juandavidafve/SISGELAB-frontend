import { Outlet } from "react-router";

import Sidebar from "@/components/Sidebar";

export default function DashboardLayout() {
  return (
    <main>
      <Sidebar />
      <div className="mt-16 lg:mt-0 lg:ml-16">
        <Outlet />
      </div>
    </main>
  );
}
