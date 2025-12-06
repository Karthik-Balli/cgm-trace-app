"use client";

import { memo, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { GlucosePoint } from "@/types";

interface ChartProps {
  points: GlucosePoint[];
}

interface ChartDataPoint {
  timestamp: string;
  value: number;
}

function ChartComponent({ points }: ChartProps) {
  const data: ChartDataPoint[] = useMemo(
    () => points.map(p => ({
      timestamp: new Date(p.timestamp).toLocaleString(),
      value: p.glucose_value
    })),
    [points]
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke="#1677ff"
          strokeWidth={2}
          dot={false}
        />
        <XAxis dataKey="timestamp" hide />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default memo(ChartComponent);
