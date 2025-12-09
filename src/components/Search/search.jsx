import React, { useState } from "react";
import { Input } from "../ui/input";

export default function Search({ url }) {
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
