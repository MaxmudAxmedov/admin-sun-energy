import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/header/header";

export default function MainLayout() {
    const [open, setopen] = useState(false);

    return (
        <div className="flex justify-between w-full">
            <div
                className={`transition-all ${
                    open ? "w-2/12 max-w-[50px]" : "w-1/12"
                }`}
            >
                <Navbar open={open} setopen={setopen} />
            </div>

            <div
                className={`w-[100%] ${
                    open ? "w-10/12 pl-6" : "w-10/12 pl-20"
                }`}
            >
                <Header />
                <div className="text-active h-[100vh ] mt-2 overflow-y-scroll ">
                    <div className="text-active mt-2 pl-5">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
