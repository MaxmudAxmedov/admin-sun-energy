import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/header/header";

export default function MainLayout() {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-[280px] ">
        <Navbar />
      </div>
      <div>
        <Header />
        <div className="text-active mt-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
