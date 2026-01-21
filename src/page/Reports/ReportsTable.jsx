import { getReportsQuery, getTradesReportsQuery } from "@/queries";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import { TradesReportChart } from "./Charts";
import { t } from "@/utils/i18n";

const initialParams = {
    from_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to_date: new Date(),
};
const initialReports = {
    client_id: "",
    employee_id: "",
    from_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to_date: new Date(),
    page: "1",
    limit: "10",
};
const formatDateForAPI = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return {
        start: new Date(year, month, day, 0, 0, 0, 0).toISOString(),
        end: new Date(year, month, day, 23, 59, 59, 999).toISOString(),
    };
};

export default function ReportsTable() {
    const [params, setParams] = useState(initialParams);
    const [paramsReports, setParamsReports] = useState(initialReports);
    const [range, setRange] = useState({
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        endDate: new Date(),
    });

    useEffect(() => {
        const { start: startISO } = formatDateForAPI(range.startDate);
        const { end: endISOForEndDate } = formatDateForAPI(range.endDate);

        const start = startISO.split("T")[0];
        const end = endISOForEndDate.split("T")[0];

        setParams((prev) => ({ ...prev, from_date: start, to_date: end }));
        setParamsReports((prev) => ({
            ...prev,
            from_date: start,
            to_date: end,
        }));
    }, [range]);

    const { data } = useQuery(getReportsQuery(params));
    const item = data?.data?.Data;

    const { data: reportsData } = useQuery({
        ...getTradesReportsQuery(paramsReports),
        enabled: !!paramsReports.from_date && !!paramsReports.to_date,
    });
    const reports = reportsData?.data?.Data?.client_products;

    const handleDateChange = (newRange) => {
        setRange(newRange);
    };

    return (
        <>
            <div className="flex justify-between p-3">
                <p className="text-[24px]">{t("hello")}!</p>
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
                    <CardTitle className="mb-2">{t("accessories")}</CardTitle>
                    <CardContent className="text-[22px]">
                        {Number(item?.total_accessory)?.toLocaleString() || 0}{" "}
                        <small className="text-[16px]">{t("sum")}</small>
                    </CardContent>
                </Card>

                <Card className="w-[22%] text-center pt-4">
                    <CardTitle className="mb-2">{t("profit")}</CardTitle>
                    <CardContent className="text-[22px]">
                        {Number(item?.profit)?.toLocaleString() || 0}{" "}
                        <small className="text-[16px]">{t("sum")}</small>
                    </CardContent>
                </Card>
                <Card className="w-[22%] text-center pt-4">
                    <CardTitle className="mb-2">
                        {t("additional_expenses")}
                    </CardTitle>
                    <CardContent className="text-[22px]">
                        {Number(item?.total_extra_expenses)?.toLocaleString() ||
                            0}{" "}
                        <small className="text-[16px]">{t("sum")}</small>
                    </CardContent>
                </Card>
                <Card className="w-[22%] text-center pt-4">
                    <CardTitle className="mb-2">{t("at_cost_price")}</CardTitle>
                    <CardContent className="text-[22px]">
                        {Number(item?.total_cost)?.toLocaleString() || 0}{" "}
                        <small className="text-[16px]">{t("sum")}</small>
                    </CardContent>
                </Card>
                <Card className="w-[22%] text-center pt-4">
                    <CardTitle className="mb-2">{t("total_amount")}</CardTitle>
                    <CardContent className="text-[22px]">
                        {Number(item?.total_selling)?.toLocaleString() || 0}{" "}
                        <small className="text-[16px]">{t("sum")}</small>
                    </CardContent>
                </Card>
            </div>
            <TradesReportChart reports={reports} />
        </>
    );
}
