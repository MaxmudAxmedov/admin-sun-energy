import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/header/header";
import { useMediaQuery } from "react-responsive";

export default function MainLayout() {
  const [open, setopen] = React.useState(false)
  
  return (
    <div className="flex  justify-between w-full">
      
      <div className={` transition-all  duration-300  ${open? "w-1/12 max-w-[50px]" : "w-2/12" }`}>
        <Navbar  open={open} />
      </div>

      <div className={` transition-all duration-300  ${open ? "w-11/12" : "w-10/12" }`}>
        <Header setopen={setopen} open={open} />
        <div className="text-active h-[100vh ] mt-2 overflow-y-scroll ">
      <div className="w-10/12">
        <Header />
        <div className="text-active mt-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
