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
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta, facere? Aut non eligendi quae sunt laudantium numquam vel. Earum est autem nemo ut accusamus tempora, repellat pariatur consequuntur in sunt.
            </div>
        </div>
    );
}
