import React from "react";
import { Input } from "../ui/input";
import ThemeMode from "../theme/theme-mode";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectItem,
    SelectValue,
    SelectGroup,
} from "../ui/select";
import i18n from "@/utils/i18n";
import ukFlag from "@/assets/img/uk.png";
import ruFlag from "@/assets/img/rus.png";
import uzFlag from "@/assets/img/uzb.png";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import Left_icons from "@/assets/icons/left_icons";
import Right_icons from "@/assets/icons/Right_icons";

export const Header = ({ setopen, open }) => {


    const handlerChange = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    };
    const { t } = useTranslation();
    return (
        <header className={`py-[13px] flex px-3 justify-end bg-icons`}>
            <div className="flex gap-8 items-center ">
                <ThemeMode />
                <select
                    onChange={(e) => handlerChange(e.target.value)}
                    value={localStorage.getItem("lang") || "en"}
                    className="border-none outline-none appearance-none rounded-md p-2 w-[70px] normal-case text-[20px] bg-icons text-background"
                >
                    <option value="uz">🇺🇿 </option>
                    <option value="ru">🇷🇺</option>
                    <option value="en">🇬🇧 </option>
                </select>
            </div>
        </header>
    );
};
