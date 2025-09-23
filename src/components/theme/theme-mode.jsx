import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ThemeMode() {
    return (
        <div>
            <Select>
                <SelectTrigger className="w-[90px]">
                    <SelectValue placeholder="Theme " />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
