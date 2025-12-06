import { Card } from "antd";
import { Insights } from "@/types";

interface InsightCardProps {
  insights: Insights;
}

export default function InsightCard({ insights }: InsightCardProps) {
  return (
    <Card className="shadow-lg">
      <h2 className="text-xl font-bold mb-4">Insights Summary</h2>
      <ul className="space-y-2">
        <li>Avg Glucose: {insights.avg_glucose}</li>
        <li>Min Glucose: {insights.min_glucose}</li>
        <li>Max Glucose: {insights.max_glucose}</li>
        <li>Time in Range: {insights.time_in_range_pct}%</li>
        <li>Total Points: {insights.total_points}</li>
      </ul>
    </Card>
  );
}
