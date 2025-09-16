import React from "react";
import { data } from "./data";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  return (
    <ul className="p-5 w-[400px]  h-[100vh] bg-[var(--background)] list-none">
      {data.map((item, index) => {
        const Icons = item.icon;
        return (
          <li className="mb-1" key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-1  no-underline rounded-xl  pt-2  transition-all duration-500 ease-in-out
                ${
                  isActive
                    ? "text-[var(--active-text)] shadow-md"
                    : "text-[var(--black)]"
                }`
              }
            >
              {" "}
              <div
                className={`w-12 h-10  p-3  rounded-md  pt-2 m-2 transition-all duration-500 ease-in-out
                ${
                  location.pathname === item.path
                    ? "bg-[var(--icons-colors)] text-[var(--background)]"
                    : "bg-[var( --icons-colors)] text-[var(--black)]"
                }`}
              >
                {Icons && <Icons />}
              </div>{" "}
              {item.title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
