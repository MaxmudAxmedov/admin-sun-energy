import React, { useState } from "react";

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

        <input
            onChange={handleChange}
          value={search}
          placeholder="Search..."
           className="input shadow-lg  focus:border-2 border-none px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
          name="search"
          type="search"
          />
          </label>
      </div>
    </>
  );
}
