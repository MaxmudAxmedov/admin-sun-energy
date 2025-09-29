import React from "react";
import { data } from "./data";
import { NavLink, useLocation } from "react-router-dom";
import logo_img from "../../assets/img/logo_img.png";
import { useTranslation } from "react-i18next";
export default function Navbar() {
    const location = useLocation();
     const { t } = useTranslation();
    return (
        <div className="w-[270px] h-[100vh] overflow-hidden ">
            <NavLink
                to={"/"}
                className={"w-[100%] flex no-underline items-center  gap-3"}
            >
                <img
                    className="w-[60px]  ml-2 mt-[10px] rounded-md"
                    src={logo_img}
                    alt="img"
                />
                <h3 className="flex items-center text-aside gap-1 mt-[10px] no-underline rounded-xl w-[200px]   transition-all duration-500 ease-in-out text-[17px] ">
                    {t("SUN")}
                </h3>
            </NavLink>
            <ul className="p-5 w-[340px]  h-[100vh] text-background list-none">
                {data.map((item, index) => {
                    const Icons = item.icon;
                    return (
                        <li className="mb-1" key={index}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-1  no-underline rounded-xl w-[200px]   transition-all duration-500 ease-in-out
                ${
                    isActive
                        ? "text-active shadow-md"
                        : "text-black"
                }`
                                }
                            >
                                <div
                                    className={`w-10 h-10  p-2  rounded-md  pt-2 m-2 transition-all duration-500 ease-in-out
                ${
                    location.pathname === item.path
                        ? "bg-icons text-background shadow-md"
                        : "bg-white text-icons"
                }`}
                                >
                                    {Icons && <Icons />}
                                </div>{" "}
                                 {t(item.title.toLowerCase())}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
