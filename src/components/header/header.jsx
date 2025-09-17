import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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
  
  }
  return (
    <header className="py-7 flex justify-between px-3 ">
        {/* <ThemeMode /> */}
      <div>
        
        <Select onValueChange={handlerChange}>
          <SelectTrigger>
            <SelectValue placeholder=" Tilni tanlang " />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uz">Uz O‘zbekcha</SelectItem>
            <SelectItem value="ru">Ru Русский</SelectItem>
            <SelectItem value="en">En English</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className=" flex gap-2 items-center">
        <Input placeholder={"search..."} className="w-[300px]" />
        <Button>send</Button>
      </div>
    </header>
  );
};
