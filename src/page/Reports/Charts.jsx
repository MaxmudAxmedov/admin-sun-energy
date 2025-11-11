import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { format, parseISO } from "date-fns"; 
import { t } from "@/utils/i18n";

const aggregateReportsByDate = (reports) => {
    const dailyData = {};

    reports.forEach((report) => {
        const date = format(parseISO(report.created_at), "yyyy-MM-dd"); 

        if (!dailyData[date]) {
            dailyData[date] = {
                service_cost: 0,
                accessory_cost: 0,
                total_price: 0,
            };
        }

        dailyData[date].service_cost += parseFloat(report.service_cost) || 0;
        dailyData[date].accessory_cost +=
            parseFloat(report.accessory_cost) || 0;
        dailyData[date].total_price += parseFloat(report.total_price) || 0;
    });

    const sortedDates = Object.keys(dailyData).sort();
    const serviceCosts = sortedDates.map((d) => dailyData[d].service_cost);
    const accessoryCosts = sortedDates.map((d) => dailyData[d].accessory_cost);
    const totalPrices = sortedDates.map((d) => dailyData[d].total_price);

    return { sortedDates, serviceCosts, accessoryCosts, totalPrices };
};

export const TradesReportChart = ({ reports = [] }) => {
    const chartConfig = useMemo(() => {
        if (!reports || reports.length === 0) {
            return {
                series: [],
                options: {
                    chart: { type: "line" },
                    xaxis: { type: "datetime" },
                    noData: { text: "Ma'lumotlar yo'q" },
                },
            };
        }

        const { sortedDates, serviceCosts, accessoryCosts, totalPrices } =
            aggregateReportsByDate(reports);

        const formattedDates = sortedDates.map((date) =>
            new Date(date).getTime()
        );

        return {
            series: [
                { name: "Xizmat narxi", type: "column", data: serviceCosts },
                {
                    name: "Aksessuar narxi",
                    type: "column",
                    data: accessoryCosts,
                },
                { name: "Umumiy sotuv", type: "line", data: totalPrices },
            ],
            options: {
                chart: {
                    height: 600,
                    type: "line",
                    stacked: false,
                    toolbar: { show: true },
                },
                stroke: { width: [4, 4, 5], curve: "smooth" },
                plotOptions: { bar: { columnWidth: "50%" } },
                dataLabels: { enabled: false },
                markers: { size: [0, 0, 6] },
                xaxis: {
                    type: "datetime",
                    categories: formattedDates,
                    labels: { format: "dd MMM", rotate: -45 },
                    title: { text: "Sana" },
                },
                yaxis: {
                    title: { text: "Summa (so'm)" },
                    labels: {
                        formatter: (val) => `${val.toLocaleString()} so'm`,
                    },
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                    x: { format: "dd MMM yyyy" },
                    y: {
                        formatter: (y) =>
                            y !== undefined ? `${y.toLocaleString()} so'm` : y,
                    },
                },
                legend: { position: "top" },
                fill: { opacity: [0.85, 0.85, 1] },
                colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
            },
        };
    }, [reports]);
    return (
        <div>
            {chartConfig.series.length > 0 ? (
                <ReactApexChart
                    options={chartConfig.options}
                    series={chartConfig.series}
                    type="line"
                    height={600}
                />
            ) : (
                <div
                    style={{
                        textAlign: "center",
                        padding: "50px",
                        color: "#888",
                    }}
                >
                    {t("reportsnotfount")}
                </div>
            )}
        </div>
    );
};
