"use client";

import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
} from "recharts";

type AccountTopCategoriesbyUsageChartProps = {
    data: {
        name: string;
        total: number;
    }[];
};

export default function AccountTopCategoriesbyUsageChart({
    data,
}: AccountTopCategoriesbyUsageChartProps) {
    return (
        <div className="w-full h-full">
            <ResponsiveContainer
                width="100%"
                height="100%"
                minHeight={50}
                minWidth={50}
            >
                <BarChart
                    data={data}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#35c96c" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
