"use client";

import { useApi } from "@/hooks/useApi";
import { Row, Col, Card, Spin, Statistic, Space, Button, Dropdown, Empty, Tooltip } from "antd";
import {
  DownloadOutlined,
  ReloadOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import Chart from "@/components/Chart";
import { Virtuoso } from "react-virtuoso";
import { useMemo, useState } from "react";
import { GlucosePointsResponse } from "@/types";

export default function Dashboard() {
  const { data, isLoading, refetch } = useApi<GlucosePointsResponse>("/glucose/points");
  const [timeRange, setTimeRange] = useState("7d");

  const points = useMemo(() => data?.points ?? [], [data]);

  const stats = useMemo(() => {
    if (points.length === 0) {
      return { avg: 0, min: 0, max: 0, latest: 0 };
    }
    const values = points.map((p) => p.glucose_value);
    return {
      avg: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
      min: Math.min(...values),
      max: Math.max(...values),
      latest: values[values.length - 1],
    };
  }, [points]);

  const timeRangeItems = [
    { label: "Last 7 days", key: "7d" },
    { label: "Last 14 days", key: "14d" },
    { label: "Last 30 days", key: "30d" },
    { label: "All time", key: "all" },
  ];

  if (isLoading) {
    return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;
  }

  return (
    <div style={{ minHeight: "calc(100vh - 64px - 200px)"}} className="p-4">
      {/* Page Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: "32px" }}>
        <Col style={{ paddingLeft: "8px" }}>
          <h1 className="page-header-title">Dashboard</h1>
          <p className="page-header-description">
            Monitor your glucose levels and trends
          </p>
        </Col>
        <Col>
          <Space>
            <Dropdown
              menu={{
                items: timeRangeItems,
                onClick: (e) => setTimeRange(e.key),
              }}
            >
              <Button>{timeRangeItems.find((item) => item.key === timeRange)?.label}</Button>
            </Dropdown>
            <Tooltip title="Refresh data">
              <Button
                icon={<ReloadOutlined />}
                onClick={() => refetch()}
              />
            </Tooltip>
            <Tooltip title="Download report">
              <Button icon={<DownloadOutlined />} />
            </Tooltip>
          </Space>
        </Col>
      </Row>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "32px" }}>
        <Col xs={24} sm={12} md={6}>
          <Card loading={isLoading}>
            <Statistic
              title="Current Glucose"
              value={stats.latest}
              suffix="mg/dL"
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card loading={isLoading}>
            <Statistic
              title="Average"
              value={stats.avg}
              suffix="mg/dL"
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card loading={isLoading}>
            <Statistic
              title="Minimum"
              value={stats.min}
              suffix="mg/dL"
              prefix={<ArrowDownOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card loading={isLoading}>
            <Statistic
              title="Maximum"
              value={stats.max}
              suffix="mg/dL"
              prefix={<ArrowUpOutlined />}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Chart */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        <Col span={24}>
          <Card
            title="Glucose Trend"
            extra={
              <Space>
                <Button type="text" size="small">
                  Linear
                </Button>
                <Button type="text" size="small">
                  Smooth
                </Button>
              </Space>
            }
          >
            {points.length > 0 ? (
              <Chart points={points} />
            ) : (
              <Empty description="No data available" />
            )}
          </Card>
        </Col>
      </Row>

      {/* Data Table - Virtualized */}
      <Row>
        <Col span={24}>
          <Card title={`Data Points (${points.length} total)`}>
            {points.length > 0 ? (
              <div style={{ height: "400px" }}>
                <Virtuoso
                  style={{ height: "100%" }}
                  totalCount={points.length}
                  itemContent={(index) => (
                    <div
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid #f0f0f0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ color: "rgba(0, 0, 0, 0.65)" }}>
                        {new Date(points[index].timestamp).toLocaleString()}
                      </span>
                      <span
                        style={{
                          fontWeight: "600",
                          color:
                            points[index].glucose_value > 180
                              ? "#ff4d4f"
                              : points[index].glucose_value < 70
                              ? "#faad14"
                              : "#52c41a",
                        }}
                      >
                        {points[index].glucose_value} mg/dL
                      </span>
                    </div>
                  )}
                />
              </div>
            ) : (
              <Empty description="No data points available" />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
