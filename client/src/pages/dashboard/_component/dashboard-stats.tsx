import { useSummaryAnalyticsQuery } from "@/features/analytics/analyticsAPI";
import SummaryCard from "./summary-card";
import { DateRangeType } from "@/components/date-range-select";

const DashboardStats = ({ dateRange }: { dateRange?: DateRangeType }) => {

  const { data, isFetching } = useSummaryAnalyticsQuery(
    { preset: dateRange?.value || "30days" },
    { skip: false }
  );
  const summaryData = data?.data;
  
  return (
    <div className="flex flex-row items-center">
      <div className="flex-1 lg:flex-[1] grid grid-cols-1 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Available Balance"
          value={summaryData?.availableBalance || 0}
          dateRange={dateRange}
          percentageChange={summaryData?.percentageChange?.balance || 0}
          isLoading={isFetching}
          cardType="balance"
        />
        <SummaryCard
          title="Total Income"
          value={summaryData?.totalIncome || 0}
          percentageChange={summaryData?.percentageChange?.income || 0}
          dateRange={dateRange}
          isLoading={isFetching}
          cardType="income"
        />
        <SummaryCard
          title="Total Expenses"
          value={summaryData?.totalExpenses || 0}
          dateRange={dateRange}
          percentageChange={summaryData?.percentageChange?.expenses || 0}
          isLoading={isFetching}
          cardType="expenses"
        />
        <SummaryCard
          title="Savings Rate"
          value={summaryData?.savingRate?.percentage || 0}
          expenseRatio={summaryData?.savingRate?.expenseRatio || 0}
          isPercentageValue
          dateRange={dateRange}
          isLoading={isFetching}
          cardType="savings"
        />
      </div>
    </div>
  );
};

export default DashboardStats;
