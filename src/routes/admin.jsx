import React from "react";
import { Outlet } from "react-router";
import AdminNav from "../components/navigation/admin-nav";
import AdminDashboard from "../components/dashboard/admin";

const AdminRoot = () => {
  return (
    <div>
      <div className="flex">
        <AdminNav />
        <div className="h-screen flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminRoot;
