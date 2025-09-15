import React from "react";

export default function Input({ label, type }) {
    return (
        <div>
            {label}
            <Input type={type}  />
        </div>
    );
}
