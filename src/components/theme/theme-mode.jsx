import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getStorage, setStorage } from "@/storage/local-store";

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

            <select
                onChange={(e) => setTheme(e.target.value)}
                value={theme}
                className="border-none rounded-md p-2 w-[90px] normal-case bg-icons text-background"
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </div>
    );
}
