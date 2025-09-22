import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/header/header";

export default function MainLayout() {
  return (
<<<<<<< HEAD
    <div className="flex gap-2">
      <div className="w-[280px]">
        <Navbar />
      </div>
      <div className="text-active mt-2 w-[100%]">
        <Header />
        <Outlet />
=======
    <div className="flex flex-row gap-2">
      <div className="w-[280px] ">
        <Navbar />
      </div>
      <div>
        <Header />
        <div className="text-active mt-2">
          <Outlet />
        </div>
>>>>>>> f41ee9ff46934b87444fc85ca20d742cb3ed787b
      </div>
    </div>
  );
}
