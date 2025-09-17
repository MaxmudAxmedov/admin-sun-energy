import { Input } from "@/components/ui/input";
import React from "react";

export default function InputData({
  label,
  type,
  defaultValue,
  className,
  placeholder,
}) {
  return (
    <div>
      {label}
      <Input
        type={type}
        defaultValue={defaultValue}
        className={className ? (className = { className }) : "p-3]"}
        placeholder={placeholder}
      />
    </div>
  );
}
