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
            

                <Select
                className=""
                    value={localStorage.getItem("lang") || "en"}
                    onValueChange={(value)=> handlerChange(value)}
                >
                    <SelectTrigger className="w-[80px] border-none bg-icons  text-background">
                        <SelectValue placeholder="Laung" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="uz" className="flex items-center justify-center gap-2">
                        <img src={uzFlag} alt="uz" className="w-5 h-5 rounded-full" />
                        <span>UZ</span>
                            </SelectItem>
                            <SelectItem value="ru" className="flex items-center justify-center gap-2" >
                                <img src={ruFlag} alt="ru" className="w-5 h-5 rounded-full" />
                                <span>RU</span>
                            </SelectItem>
                            <SelectItem value="en" className="flex items-center justify-center" >
                                <img src={ukFlag} alt="ru" className="w-5 h-5 rounded-full" />
                                <span>EN</span>
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>

                </Select>

            </div>
        </header>
    );
};
