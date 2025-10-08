import React from "react";
import { Input } from "../ui/input";
import ThemeMode from "../theme/theme-mode";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "../ui/select";
import i18n from "@/utils/i18n";
import ukFlag from "@/assets/img/uk.png";
import ruFlag from "@/assets/img/rus.png";
import uzFlag from "@/assets/img/uzb.png";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Left_icons from "@/assets/icons/left_icons";
import Right_icons from "@/assets/icons/Right_icons";

export const Header = ({ setopen, open }) => {
  const nav = useNavigate();
  const clickItem = () => {
    setopen((prev) => !prev);
  };


  const handlerChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };
  const { t } = useTranslation();
  return (
    <header
      className={`py-7 flex px-3 justify-between shadow-header shadow-bg-[var(--background)]`}
    >
      <div className="flex gap-2 items-center">
        <Button
          onClick={clickItem}
          className={`transition-all duration-300  h-5 ${
            !open ? "ml-auto" : "mr-auto"
          } mb-2 mt-[-4px] border-none bg-transparent text-black shadow-none`}
        >
          {" "}
          {!open ? <Left_icons /> : <Right_icons />}{" "}
        </Button>

        <Input placeholder={t("input")} className="max-w-[350px]" />
      </div>
      <div className="flex gap-8 items-center ">
        <ThemeMode />
        <Select
          defaultValue={localStorage.getItem("lang") || "en"}
          onValueChange={(lang) => handlerChange(lang)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="text-[var(--black)]">
            <SelectItem value="uz">
              <img src={uzFlag} width={30} />
            </SelectItem>
            <SelectItem value="ru">
              <img src={ruFlag} width={30} />
            </SelectItem>
            <SelectItem value="en">
              <img src={ukFlag} width={30} />
            </SelectItem>
          </SelectContent>
        </Select>
      
      </div>
    </header>
  );
};
