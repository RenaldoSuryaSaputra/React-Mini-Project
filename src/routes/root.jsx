import React from "react";
import { Outlet } from "react-router";
import HeaderNav from "../components/navigation/header";

const Root = () => {
  return (
    <div>
      <HeaderNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
