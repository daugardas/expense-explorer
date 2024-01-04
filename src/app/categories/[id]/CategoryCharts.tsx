import ChartContainer from "@/app/components/Charts/ChartContainer";
import ChartHeader from "@/app/components/Charts/ChartHeader";
import GradientLoadingDiv from "@/app/components/GradientLoadingDiv";
import { Category, CategoryType } from "@prisma/client";

type CategoryChartsProps = {
    category: Category;
};

export default async function CategoryCharts({
    category,
}: CategoryChartsProps) {
    if (!category) {
        return <></>;
    }

    if (category.parentId) {
        // sub category charts
        if (category.type === CategoryType.INCOME) {
            return (
                <div className="w-full grid grid-cols-2 gap-2">
                    {/* 
                    
                    Category Distribution - Pie Chart or Donut Chart:
                    - Illustrate the distribution of expenses or income within the selected category.
                    - Each slice represents a subcategory or a specific expense/income type.
                    This chart gives a quick overview of how the selected category is allocated.
                    
                    */}

                    <ChartContainer>
                        <ChartHeader>Category Distribution</ChartHeader>
                        <GradientLoadingDiv />
                    </ChartContainer>

                    {/* 
                        Income Breakdown - Stacked Bar Chart:
                        - Display a stacked bar chart showing the breakdown of income within the selected category over time.
                        - X-axis: Time (e.g., days, weeks, months).
                        - Y-axis: Income amount.
                        - Different colors represent subcategories or specific income.
                        This chart helps users understand how income within the selected category fluctuate over time. 
                        */}
                    <ChartContainer>
                        <ChartHeader>Income Breakdown</ChartHeader>
                        <GradientLoadingDiv />
                    </ChartContainer>

                    {/* 
                    
                    Top Income - Bar Chart or Horizontal Bar Chart:
                    - Display a bar chart showcasing the top income sources within the selected category.
                    - X-axis: Income amount.
                    - Y-axis: Income type.
                    This chart helps users identify the most significant contributors to income within the selected category
                    
                    */}

                    <ChartContainer>
                        <ChartHeader>Top Income</ChartHeader>
                        <GradientLoadingDiv />
                    </ChartContainer>

                    {/* 
                    
                    Budget vs. Actual - Horizontal Bar Chart:
                    - Compare the budgeted amount to the actual income within the selected category.
                    - X-axis: Budgeted vs. Actual.
                    - Y-axis: Subcategories or specific income.
                    - Different colors or shades represent the budgeted amount and the actual income.
                    This chart helps users evaluate their budgeting performance within the selected category.
                    
                    */}

                    <ChartContainer>
                        <ChartHeader>Budget vs. Actual</ChartHeader>
                        <GradientLoadingDiv />
                    </ChartContainer>
                </div>
            );
        }

        return (
            <div className="w-full grid grid-cols-2 gap-2">
                {/* 
                
                Category Distribution - Pie Chart or Donut Chart:
                - Illustrate the distribution of expenses or income within the selected category.
                - Each slice represents a subcategory or a specific expense/income type.
                This chart gives a quick overview of how the selected category is allocated.
                
                */}

                <ChartContainer>
                    <ChartHeader>Category Distribution</ChartHeader>
                    <GradientLoadingDiv />
                </ChartContainer>

                {/* 
                    Expense Breakdown - Stacked Bar Chart:
                    - Display a stacked bar chart showing the breakdown of expenses within the selected category over time.
                    - X-axis: Time (e.g., days, weeks, months).
                    - Y-axis: Expense amount.
                    - Different colors represent subcategories or specific expenses.
                    This chart helps users understand how expenses within the selected category fluctuate over time. 
                    */}
                <ChartContainer>
                    <ChartHeader>Expense Breakdown</ChartHeader>
                    <GradientLoadingDiv />
                </ChartContainer>

                {/* 
                
                Top Expenses - Bar Chart or Horizontal Bar Chart:
                - Display a bar chart showcasing the top expenses or sources of income within the selected category.
                - X-axis: Expense/income amount.
                - Y-axis: Expense/income type.
                This chart helps users identify the most significant contributors to spending or income within the selected category
                
                */}

                <ChartContainer>
                    <ChartHeader>Top Expenses</ChartHeader>
                    <GradientLoadingDiv />
                </ChartContainer>

                {/* 
                
                Budget vs. Actual - Horizontal Bar Chart:
                - Compare the budgeted amount to the actual spending within the selected category.
                - X-axis: Budgeted vs. Actual.
                - Y-axis: Subcategories or specific expenses.
                - Different colors or shades represent the budgeted amount and the actual spending.
                This chart helps users evaluate their budgeting performance within the selected category.
                
                */}

                <ChartContainer>
                    <ChartHeader>Budget vs. Actual</ChartHeader>
                    <GradientLoadingDiv />
                </ChartContainer>
            </div>
        );
    }

    if (category.type === CategoryType.INCOME) {
        return (
            <div className="w-full grid grid-cols-2 gap-2">
                {/* 
                
                Category Distribution - Pie Chart or Donut Chart:
                - Illustrate the distribution of expenses or income within the selected category.
                - Each slice represents a subcategory or a specific expense/income type.
                This chart gives a quick overview of how the selected category is allocated.
                
                */}

                <ChartContainer>
                    <ChartHeader>Category Distribution</ChartHeader>
                    <GradientLoadingDiv />
                </ChartContainer>

                {/* 
                    Income Breakdown - Stacked Bar Chart:
                    - Display a stacked bar chart showing the breakdown of income within the selected category over time.
                    - X-axis: Time (e.g., days, weeks, months).
                    - Y-axis: Income amount.
                    - Different colors represent subcategories or specific income.
                    This chart helps users understand how income within the selected category fluctuate over time. 
                    */}
                <ChartContainer>
                    <ChartHeader>Income Breakdown</ChartHeader>
                    <GradientLoadingDiv />
                </ChartContainer>

                {/* 
                
                Top Income - Bar Chart or Horizontal Bar Chart:
                - Display a bar chart showcasing the top income sources within the selected category.
                - X-axis: Income amount.
                - Y-axis: Income type.
                This chart helps users identify the most significant contributors to income within the selected category
                
                */}

                <ChartContainer>
                    <ChartHeader>Top Income</ChartHeader>
                    <GradientLoadingDiv />
                </ChartContainer>

                {/* 
                
                Budget vs. Actual - Horizontal Bar Chart:
                - Compare the budgeted amount to the actual income within the selected category.
                - X-axis: Budgeted vs. Actual.
                - Y-axis: Subcategories or specific income.
                - Different colors or shades represent the budgeted amount and the actual income.
                This chart helps users evaluate their budgeting performance within the selected category.
                
                */}

                <ChartContainer>
                    <ChartHeader>Budget vs. Actual</ChartHeader>
                    <GradientLoadingDiv />
                </ChartContainer>
            </div>
        );
    }

    return (
        <div className="w-full grid grid-cols-2 gap-2">
            {/* 
            
            Category Distribution - Pie Chart or Donut Chart:
            - Illustrate the distribution of expenses or income within the selected category.
            - Each slice represents a subcategory or a specific expense/income type.
            This chart gives a quick overview of how the selected category is allocated.

            */}

            <ChartContainer>
                <ChartHeader>Category Distribution</ChartHeader>
                <GradientLoadingDiv />
            </ChartContainer>

            {/* 
                Expense Breakdown - Stacked Bar Chart:
                - Display a stacked bar chart showing the breakdown of expenses within the selected category over time.
                - X-axis: Time (e.g., days, weeks, months).
                - Y-axis: Expense amount.
                - Different colors represent subcategories or specific expenses.
                This chart helps users understand how expenses within the selected category fluctuate over time. 
                */}
            <ChartContainer>
                <ChartHeader>Expense Breakdown</ChartHeader>
                <GradientLoadingDiv />
            </ChartContainer>

            {/* 
            
            Top Expenses - Bar Chart or Horizontal Bar Chart:
            - Display a bar chart showcasing the top expenses or sources of income within the selected category.
            - X-axis: Expense/income amount.
            - Y-axis: Expense/income type.
            This chart helps users identify the most significant contributors to spending or income within the selected category
            
            */}

            <ChartContainer>
                <ChartHeader>Top Expenses</ChartHeader>
                <GradientLoadingDiv />
            </ChartContainer>

            {/* 
            
            Budget vs. Actual - Horizontal Bar Chart:
            - Compare the budgeted amount to the actual spending within the selected category.
            - X-axis: Budgeted vs. Actual.
            - Y-axis: Subcategories or specific expenses.
            - Different colors or shades represent the budgeted amount and the actual spending.
            This chart helps users evaluate their budgeting performance within the selected category.
            
            */}

            <ChartContainer>
                <ChartHeader>Budget vs. Actual</ChartHeader>
                <GradientLoadingDiv />
            </ChartContainer>
        </div>
    );
}
