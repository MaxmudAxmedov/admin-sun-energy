import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex">
            <Navbar />

            <div>
                {/* HEADER dynamic */}
                <Outlet />
            </div>
        </div>
    );
}
