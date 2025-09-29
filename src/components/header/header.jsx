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
export const Header = () => {
 const handlerChange = (lang)=>{
    i18n.changeLanguage(lang)
  localStorage.setItem("lang", lang)
  }
    return (
        <header className=" py-7 flex items-center justify-between px-3">
            <div className=" flex gap-2 items-center">
                <Input placeholder={"search..."} className="w-[300px] border-none shadow-md " />
            </div>
            <div className="flex gap-8 items-center ">
                <ThemeMode/>
                <Select defaultValue={localStorage.getItem("lang") || ("en")}   onValueChange={(lang) => handlerChange(lang)}>
                    <SelectTrigger className="border-none" >
                        <SelectValue placeholder=" Tilni tanlang " />
                    </SelectTrigger>
                    <SelectContent className="text-[var(--black)]">
                        <SelectItem value="uz">Uz O‘zbekcha</SelectItem>
                        <SelectItem value="ru">Ru Русский</SelectItem>
                        <SelectItem value="en">En English</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </header>
    );
};
