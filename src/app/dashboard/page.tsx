import ChartHeader from "../components/Charts/ChartHeader";
import GridTile from "../components/Grid/GridTile";

export default async function Page() {
    return (
        <>
            {/* 
            
            Display the current balances of all linked accounts, 
            giving users an immediate snapshot of their overall financial health.
            
            */}
            <GridTile className="col-span-2">
                <ChartHeader>Balances</ChartHeader>
            </GridTile>

            {/*

            Highlight the total income and total expenses over a selected time period, 
            providing users with insights into their cash flow.

            */}
            <GridTile className="col-span-2">
                <ChartHeader>Income and expenses</ChartHeader>
            </GridTile>

            {/* 
            
            Present a breakdown of expenses by category,
             either in the form of a pie chart, bar chart, or another visualization. 
             This helps users identify major spending areas.

            */}
            <GridTile className="col-span-2">
                <ChartHeader>Expense Categories Breakdown</ChartHeader>
            </GridTile>

            {/* 
            
            Show a comparison between budgeted and actual expenses, 
            allowing users to assess how well they are sticking to their financial plans.
            
            */}
            <GridTile className="col-span-2">
                <ChartHeader>Budget Performance</ChartHeader>
            </GridTile>

            {/*

            Display a line chart or another visualization showing the user's net worth over time. 
            This can include assets, liabilities, and the net difference

            */}
            <GridTile className="col-span-2">
                <ChartHeader>Net Worth Over Time</ChartHeader>
            </GridTile>

            {/*

            List or graphically represent the top expenses for a selected period, helping users identify where most of their money is going

            */}
            <GridTile className="col-span-2">
                <ChartHeader>Top Expenses</ChartHeader>
            </GridTile>

            {/*

            If users have set financial goals, display the progress towards achieving those goals. 
            This could include savings goals, debt reduction goals, or any other objectives.

            */}
            <GridTile className="col-span-2">
                <ChartHeader>Financial Goals Progress</ChartHeader>
            </GridTile>

            {/*

            Provide a list or visual representation of upcoming bills and transactions, 
            helping users plan for upcoming financial obligations.

            */}
            <GridTile className="col-span-2">
                <ChartHeader>Upcoming Bills and Transactions</ChartHeader>
            </GridTile>

            {/*

            If applicable, include an overview of the user's investment portfolio, 
            showing current values, performance, and any changes over time.

            */}
            <GridTile className="col-span-2">
                <ChartHeader>Investment Portfolio Overview</ChartHeader>
            </GridTile>

            {/*

            Implement alerts or reminders for important financial events, such as approaching due dates for bills, 
            low account balances, or irregular spending patterns.

            */}
            <GridTile className="col-span-2">
                <ChartHeader>Alerts and Reminders</ChartHeader>
            </GridTile>

            {/*

            Offer insights into financial trends, anomalies, or patterns based on historical data. 
            This could include spending habits, income patterns, or other notable trends.
                
            */}
            <GridTile className="col-span-2">
                <ChartHeader>Financial Insights and Trends</ChartHeader>
            </GridTile>
        </>
    );
}
