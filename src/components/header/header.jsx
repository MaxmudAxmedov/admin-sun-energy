import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ThemeMode from "../theme/theme-mode";
<<<<<<< HEAD
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
    <header className="py-7 flex justify-between px-3">
     
      <div className=" flex gap-2 items-center">
        <Input placeholder={"search..."} className="w-[300px]" />
      </div>
       <div className="flex gap-8 items-center ">
       <ThemeMode/>
         <Select onValueChange={handlerChange} defaultValue={localStorage.getItem("lang") || ("uz")} >
          <SelectTrigger>
            <SelectValue placeholder=" Tilni tanlang " />
          </SelectTrigger>
          <SelectContent className="text-[var(--black)]">
            <SelectItem value="uz" >Uz O‘zbekcha</SelectItem>
            <SelectItem value="ru" >Ru Русский</SelectItem>
            <SelectItem value="en" >En English</SelectItem>
          </SelectContent>
        </Select> 
      </div>
=======
export const Header = () => {
  return (
    <header className="py-7">
      <div>
        lorem
        <Button>D</Button>
        <Button>L</Button>
      </div>
      <div className=" flex gap-2 items-center">
        <Input placeholder={"search..."} />
        <Button>send</Button>
      </div>
      <ThemeMode />
>>>>>>> f41ee9ff46934b87444fc85ca20d742cb3ed787b
    </header>
  );
};
