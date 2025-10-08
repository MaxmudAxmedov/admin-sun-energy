import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/header/header";

export default function MainLayout() {
  return (
    <div className="flex justify-between">
      <div className="w-2/12">
        <Navbar />
      </div>

      <div className="w-10/12">
        <Header />
        <div className="text-active mt-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
