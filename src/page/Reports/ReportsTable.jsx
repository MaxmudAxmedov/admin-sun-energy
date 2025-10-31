import { getReportsQuery } from "@/queries";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";

const initialParams = {
    from_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to_date: new Date(),
};
const paramsTrade = {
    client_id: "",
    employee_id: "",
    from_date: "",
    to_date: "",
    page: "1",
    limit: "10",
};

export default function ReportsTable() {
    const [params, setParams] = useState(initialParams);
    const [paramTrade, setParamTrade] = useState(paramsTrade);
    const [range, setRange] = useState({
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        endDate: new Date(),
    });

    const { data } = useQuery(getReportsQuery(params));
    const item = data?.data?.Data;

    const [state, setState] = useState({
        series: [
            {
                name: "TEAM A",
                type: "column",
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
            },
            {
                name: "TEAM B",
                type: "area",
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
            },
            {
                name: "TEAM C",
                type: "line",
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "line",
                stacked: false,
            },
            stroke: {
                width: [0, 2, 5],
                curve: "smooth",
            },
            plotOptions: {
                bar: {
                    columnWidth: "50%",
                },
            },

            fill: {
                opacity: [0.85, 0.25, 1],
                gradient: {
                    inverseColors: false,
                    shade: "light",
                    type: "vertical",
                    opacityFrom: 0.85,
                    opacityTo: 0.55,
                    stops: [0, 100, 100, 100],
                },
            },
            labels: [
                "01/01/2003",
                "02/01/2003",
                "03/01/2003",
                "04/01/2003",
                "05/01/2003",
                "06/01/2003",
                "07/01/2003",
                "08/01/2003",
                "09/01/2003",
                "10/01/2003",
                "11/01/2003",
            ],
            markers: {
                size: 0,
            },
            xaxis: {
                type: "datetime",
            },
            yaxis: {
                title: {
                    text: "Points",
                },
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (y) {
                        if (typeof y !== "undefined") {
                            return y.toFixed(0) + " points";
                        }
                        return y;
                    },
                },
            },
        },
    });
    console.log(item);
    const handleDateChange = (newRange) => {
        setRange(newRange);
        const start = newRange.startDate.toISOString().split("T")[0];
        const end = newRange.endDate.toISOString().split("T")[0];
        setParams((res) => ({ ...res, from_date: start, to_date: end }));
        setParamTrade((res) => ({ ...res, from_date: start, to_date: end }));
    };

    return (
        <>
            <div className="flex justify-between p-3">
                <p className="text-[24px]">Salom xush kelibsiz !</p>
                <DateRangePicker value={range} onChange={handleDateChange} />
            </div>
            <div className="flex justify-between gap-3 mt-4">
                <Card className="w-[22%] text-center pt-4">
                    <CardTitle className="mb-2">Kvt</CardTitle>
                    <CardContent className="text-[22px]">
                        {item?.total_kv || 0}
                    </CardContent>
                </Card>

                <Card className="w-[22%] text-center pt-4">
                    <CardTitle className="mb-2">Accessory</CardTitle>
                    <CardContent className="text-[22px]">
                        {Number(item?.total_accessory)?.toLocaleString() || 0}{" "}
                        <smal className="text-[16px]">sum</smal>
                    </CardContent>
                </Card>

                <Card className="w-[22%] text-center pt-4">
                    <CardTitle className="mb-2">Foyda</CardTitle>
                    <CardContent className="text-[22px]">
                        {Number(item?.profit)?.toLocaleString() || 0}{" "}
                        <smal className="text-[16px]">sum</smal>
                    </CardContent>
                </Card>
                <Card className="w-[22%] text-center pt-4">
                    <CardTitle className="mb-2">
                        Qo'shimcha xarajatlar
                    </CardTitle>
                    <CardContent className="text-[22px]">
                        {Number(item?.total_extra_expenses)?.toLocaleString() ||
                            0}{" "}
                        <smal className="text-[16px]">sum</smal>
                    </CardContent>
                </Card>
                <Card className="w-[22%] text-center pt-4">
                    <CardTitle className="mb-2">Tan narx bo'yicha</CardTitle>
                    <CardContent className="text-[22px]">
                        {Number(item?.total_cost)?.toLocaleString() || 0}{" "}
                        <smal className="text-[16px]">sum</smal>
                    </CardContent>
                </Card>
                <Card className="w-[22%] text-center pt-4">
                    <CardTitle className="mb-2">Umumiy summa</CardTitle>
                    <CardContent className="text-[22px]">
                        {Number(item?.total_selling)?.toLocaleString() || 0}{" "}
                        <smal className="text-[16px]">sum</smal>
                    </CardContent>
                </Card>
            </div>
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="line"
                height={"600px"}
            />
        </>
    );
}
