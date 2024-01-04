"use client";

import { Legend, Line, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { LineChart, XAxis } from "recharts";

type AccountIncomeExpenseByMonthChartProps = {
    dataByMonth: {
        name: string;
        income: number;
        expenses: number;
    }[];
};

export default function AccountIncomeExpenseByMonthChart({
    dataByMonth,
}: AccountIncomeExpenseByMonthChartProps) {
    return (
        <div className="w-full h-full">
            <ResponsiveContainer
                width="100%"
                height="100%"
                minHeight={50}
                minWidth={50}
            >
                <LineChart
                    data={dataByMonth}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="#B91C1C"
                        strokeWidth={2}
                    />
                    <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#35c96c"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
