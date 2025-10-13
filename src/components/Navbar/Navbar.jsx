import React from "react";
import { data } from "./data";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo_img from "../../assets/img/logo_img.png";
import { useTranslation } from "react-i18next";
import Login_out_icons from "@/assets/icons/login_out_icons";

export default function Navbar({ open }) {
  const location = useLocation();
  const { t } = useTranslation();
  const nav = useNavigate();
  const LoginItem = () => {
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token");
    nav("/login");
  };
  return (
    <div
      className={` h-[100vh] flex flex-col justify-center  transition-all duration-300  ${open ? "w-[70px]" : "w-[220px]"
      }  `}
    >
      <div className="flex justify-between">
        <NavLink
          to={"/"}
          className={"w-[100%] flex no-underline items-center  gap-3"}
        >
          <img
            className="w-[60px]  ml-2 mt-[10px] rounded-md"
            src={logo_img}
            alt="img"
          />
          <h3 className={`text-active mt-3 ${open ? "hidden" : "block"} `}>
            {t("SUN")}
          </h3>
        </NavLink>
      </div>
      <ul className={`py-5 px-3 w-[400px]  h-[100vh] text-background list-none`}>
        {data.map((item, index) => {
          const Icons = item.icon;
          return (
            <li className="mb-1" key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-1  no-underline rounded-xl ${open ? "w-[55px]": "w-[200px]"} transition-all duration-500 ease-in-out
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
        className={`w-[50px] hover:rounded-[20px] ml-2 translate duration-300   h-[50px] bg-background  shadow-none border border-[red] rounded-[3px]  text-[red]`}
      >
        <Login_out_icons />
      </button>
    </div>
  );
}
