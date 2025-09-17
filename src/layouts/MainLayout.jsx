import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-[280px] ">
        <Navbar />
      <ProdectTable />      </div>
        <div>
          <Header/>
          <div className="text-active mt-2">
        <Outlet />
      </div>
        </div>
    </div>
  );
}
