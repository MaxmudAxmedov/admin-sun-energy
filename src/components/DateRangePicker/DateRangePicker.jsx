import React, { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import { FiCalendar } from "react-icons/fi";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateRangePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    onChange({ startDate, endDate });

    if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 border rounded-md bg-white dark:bg-zinc-900 text-active hover:bg-gray-100 flex items-center gap-2"
      >
        <FiCalendar className="text-xl" />
        <span className="text-sm">
          {value?.startDate.toLocaleDateString().split("/").join(".")} -{" "}
          {value?.endDate.toLocaleDateString().split("/").join(".")}
        </span>
      </button>

      {open && (
        <div className="absolute z-50 right-0 mt-2 shadow-lg border rounded-md bg-white darq:bg-zinc-900">
          <DateRange
            ranges={[
              {
                startDate: value.startDate,
                endDate: value.endDate,
                key: "selection",
              },
            ]}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            rangeColors={["#3b82f6"]}
            direction="vertical"
            scroll={{ enabled: true }}
          />
        </div>
      )}
    </div>
  );
}
