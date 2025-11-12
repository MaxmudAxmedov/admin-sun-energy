import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getStorage, setStorage } from "@/storage/local-store";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeMode() {
    const [theme, setTheme] = React.useState(getStorage("theme") || "light");
    React.useEffect(() => {
        const body = document.body;
        if (theme === "light") {
            body.classList.remove("dark");
            setStorage("theme", "light");
        } else {
            body.classList.add("dark");
            setStorage("theme", "dark");
        }
    }, [theme]);
     const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
    return (
        <div>
            {/* <Select value={theme} onValueChange={(value) => setTheme(value)}>
                <SelectTrigger className="w-[90px] text-background border-none">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
            </Select> */}
          
    <div className="flex items-center">
      <Button
        variant="outline"
        onClick={toggleTheme}
        className={` border-none
          flex items-center gap-2 px-4 py-2 rounded-md 
          bg-[#ff7a00] text-white hover:bg-[#ff9738]
          dark:bg-green-600 dark:hover:bg-green-700 
          dark:text-gray-100 transition-all duration-300
        `}
      >
        {theme === "light" ? (
          <>
            <Sun size={18} />
            <span className="capitalize">Light</span>
          </>
        ) : (
          <>
            <Moon size={18} />
            <span className="capitalize">Dark</span>
          </>
        )}
      </Button>
    </div>
   



        </div>
    );
}
