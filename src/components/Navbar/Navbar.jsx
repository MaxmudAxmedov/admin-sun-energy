import React, { useState } from "react";
import { data } from "./data";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo_img from "../../assets/img/logo_img.png";
import { useTranslation } from "react-i18next";
import Login_out_icons from "@/assets/icons/login_out_icons";
import { Button } from "../ui/button";
import Left_icons from "@/assets/icons/left_icons";
import Right_icons from "@/assets/icons/Right_icons";

export default function Navbar({ open, setopen }) {
    
    const location = useLocation();
    const [ot, setot] = useState(false)
    const { t } = useTranslation();
    const nav = useNavigate();
    const LoginItem = () => {
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("token");
        nav("/login");
    };
    const clickItem = () => {
        setopen((prev) => !prev);
        setot((p)=>!p);
    };
    return (
        <div
            className={`h-[100vh] flex flex-col justify-center transition-all duration-300  ${
                open ? "w-[110px]" : "w-[220px]"
            }  `}
        >
            <div
                className={`"flex justify-between items-center bg-icons " ${
                    open ? "py-[8px]" : "py-[14px]"
                }`}
            >
                <NavLink
                    to={location.pathname}
                    className={"w-[100%] flex no-underline items-center gap-3"}
                >
                    <img
                        className={`w-[43px] ml-2   rounded-md ${
                            open ? "hidden" : "block"
                        } `}
                        ///    nav img bu yerda 
                        src={logo_img}
                        alt="img"
                    />
                    <h3
                        className={`text-white mt-2 ${
                            open ? "hidden" : "block"
                        } `}
                    >
                        BRAVO
                    </h3>

                    <div className="flex gap-2 items-center z-10">
                        <div
                            onClick={clickItem}
                            className={`transition-all ml-2 mt-3 duration-300  border-none shadow-none   bg-icons text-white`}
                        >
                            {ot == false ?  <>
                                <Left_icons />
                            </> 
                            : <div className="pl-3">
                                <Right_icons/>
                            </div>
                            
                        }
                        </div>
                    </div>
                </NavLink>
            </div>
            <ul
                className={`py-5 px-3 w-[400px]  h-[100vh] text-background list-none`}
            >
                {data.map((item, index) => {
                    const Icons = item.icon;
                    return (
                        <li className="mb-1" key={index}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-1  no-underline rounded-xl ${
                                        open ? "w-[55px]" : "w-[200px]"
                                    } transition-all duration-500 ease-in-out
                ${isActive ? "text-active shadow-md" : "text-black"}`
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
                                <span
                                    className={`transition-all duration-300
                  ${open ? "hidden" : "block"}`}
                                >
                                    {t(item.title.toLowerCase())}
                                </span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
            <button
                onClick={LoginItem}
                className={`w-[50px] hover:rounded-[20px] ml-2 translate duration-300 h-[50px] bg-background shadow-none border border-[red] rounded-[3px] text-[red]`}
            >
                <Login_out_icons />
            </button>
        </div>
    );
}
