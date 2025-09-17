import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { ProdectTable } from "@/components/Product/prodect-table";

export default function MainLayout() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <ProdectTable />
      <div className="text-active">
        {/* HEADER dynamic */}
        <Outlet />
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta, facere?
        Aut non eligendi quae sunt laudantium numquam vel. Earum est autem nemo
        ut accusamus tempora, repellat pariatur consequuntur in sunt.
      </div>
    </div>
  );
}
