import {
    getTop5CategoriesByTimesUsedForAccount,
    getTransactionsDataForAccountChart,
} from "@/lib/db_queries";
import AccountIncomeExpenseByMonthChart from "./AccountIncomeExpenseByMonthChart";
import { convertDataFromDBForUseInChart } from "@/lib/utils";
import ChartContainer from "@/app/components/Charts/ChartContainer";
import ChartHeader from "@/app/components/Charts/ChartHeader";
import GradientLoadingDiv from "@/app/components/GradientLoadingDiv";

type AccountChartsProps = {
    id: string;
};

export default async function AccountCharts({ id }: AccountChartsProps) {
    const dataByMonth = await getTransactionsDataForAccountChart(id);
    const convertedData = convertDataFromDBForUseInChart(dataByMonth);
    const topCategoriesByUsage = await getTop5CategoriesByTimesUsedForAccount(
        id
    );

    // console.log(topCategoriesByUsage);

    return (
        <div className="w-full grid grid-cols-2 gap-2">
            <ChartContainer>
                <ChartHeader>Income and expenses</ChartHeader>
                <AccountIncomeExpenseByMonthChart dataByMonth={convertedData} />
            </ChartContainer>

            <ChartContainer>
                <ChartHeader>Categories by usage</ChartHeader>
                <GradientLoadingDiv />
            </ChartContainer>
            <ChartContainer>
                <ChartHeader>Categories by amount</ChartHeader>
                <GradientLoadingDiv />
            </ChartContainer>
            <ChartContainer>
                <ChartHeader>Balance over time</ChartHeader>
                <GradientLoadingDiv />
            </ChartContainer>
            <ChartContainer>
                <ChartHeader>Budget vs. Actual</ChartHeader>
                <GradientLoadingDiv />
            </ChartContainer>
        </div>
    );
}
