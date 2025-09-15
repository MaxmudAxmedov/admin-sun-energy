import React from "react";
import { data } from "./data";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Navbar() {
    return (
        <ul className="p-5 bg-emerald-600">
            {data.map((item, index) => {
                return (
                    <li key={index}>
                        <NavLink to={item.path}>{item.title}</NavLink>
                    </li>
                );
            })}
            <Button variant="outline">Button</Button>
            <Button className={'px-10 py-6'} variant="destructive" onClick={(e) => console.log(e.target)}>Button</Button>

            <Input type="text" />
        </ul>
    );
}
