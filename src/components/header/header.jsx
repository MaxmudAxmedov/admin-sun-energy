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
export const Header = () => {
    return (
        <header className="py-7 flex justify-between px-3">
            <div className=" flex gap-2 items-center">
                <Input placeholder={"search..."} className="w-[300px]" />
            </div>
            <div className="flex gap-8 items-center ">
                <ThemeMode />
                <Select>
                    <SelectTrigger>
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
