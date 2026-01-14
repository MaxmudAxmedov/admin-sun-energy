import React, { useState } from "react";
import { Input } from "../ui/input";

export default function Search({ url, width }) {
  const [search, setsearch] = useState("");
  const handleChange = (data) => {
    const value = data.target.value;
    setsearch(value);
    url(value);
  };
  return (
    <>
      <div className=" bg-white">
        <label htmlFor="">

        <Input
        className={`w-[${width}]`}
            onChange={handleChange}
          value={search}
          placeholder="Search..."
          name="search"
          type="search"
          />
          </label>
      </div>
    </>
  );
}
