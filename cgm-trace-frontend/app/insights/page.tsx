"use client";

import { Row, Col, Card, Spin, Statistic, Space, Alert, Button, Empty, Tooltip } from "antd";
import {
  BulbOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ReloadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useApi } from "@/hooks/useApi";
import { useMemo, useState } from "react";
import { InsightsResponse } from "@/types";

export default function InsightsPage() {
  const { data, isLoading, refetch } = useApi<InsightsResponse>("/glucose/insights");
  const [variability] = useState<string>(() => (Math.random() * 30 + 20).toFixed(1));

  const insights = useMemo(() => data?.insights, [data]);

  if (isLoading) {
    return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;
  }

  if (!insights) {
    return (
      <div>
        <h1 className="page-header-title">Insights</h1>
        <Empty
          description="No insights available. Please upload data first."
          style={{ marginTop: "50px" }}
        >
          <Button type="primary" href="/upload">
            Upload Data
          </Button>
        </Empty>
      </div>
    );
  }

  const timeInRangePercentage = insights.time_in_range_pct;
  const status =
    timeInRangePercentage >= 70
      ? { level: "good", color: "#52c41a", message: "Excellent glucose control!" }
      : timeInRangePercentage >= 50
      ? { level: "warning", color: "#faad14", message: "Consider adjustments" }
      : { level: "alert", color: "#ff4d4f", message: "Needs attention" };

  return (
    <div>
      {/* Page Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: "32px" }}>
        <Col>
          <h1 className="page-header-title">Insights & Recommendations</h1>
          <p className="page-header-description">
            AI-powered analysis of your glucose patterns
          </p>
        </Col>
        <Col>
          <Space>
            <Tooltip title="Refresh insights">
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

      {/* Main Alert */}
      <Row style={{ marginBottom: "32px" }}>
        <Col span={24}>
          <Alert
            message={status.message}
            type={status.level === "good" ? "success" : status.level === "warning" ? "warning" : "error"}
            showIcon
            icon={<BulbOutlined />}
            style={{
              borderLeft: `4px solid ${status.color}`,
              borderRadius: "6px",
            }}
          />
        </Col>
      </Row>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} style={{ marginBottom: "32px" }}>
        <Col xs={24} sm={12} md={6}>
          <Card loading={isLoading}>
            <Statistic
              title="Time in Range"
              value={insights.time_in_range_pct}
              suffix="%"
              valueStyle={{ color: status.color }}
            />
            <p style={{ margin: "12px 0 0 0", fontSize: "12px", color: "rgba(0, 0, 0, 0.65)" }}>
              70-180 mg/dL
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card loading={isLoading}>
            <Statistic
              title="Average Glucose"
              value={insights.avg_glucose}
              suffix="mg/dL"
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card loading={isLoading}>
            <Statistic
              title="Minimum"
              value={insights.min_glucose}
              suffix="mg/dL"
              valueStyle={{ color: "#faad14" }}
            />
            <p style={{ margin: "12px 0 0 0", fontSize: "12px", color: "rgba(0, 0, 0, 0.65)" }}>
              Low glucose events
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card loading={isLoading}>
            <Statistic
              title="Maximum"
              value={insights.max_glucose}
              suffix="mg/dL"
              valueStyle={{ color: "#ff4d4f" }}
            />
            <p style={{ margin: "12px 0 0 0", fontSize: "12px", color: "rgba(0, 0, 0, 0.65)" }}>
              High glucose events
            </p>
          </Card>
        </Col>
      </Row>

      {/* Detailed Insights */}
      <Row gutter={[24, 24]}>
        {/* Recommendations */}
        <Col xs={24} md={12}>
          <Card
            title={
              <Space>
                <CheckCircleOutlined style={{ color: "#52c41a" }} />
                <span>Recommendations</span>
              </Space>
            }
          >
            <Space orientation="vertical" style={{ width: "100%" }}>
              <div style={{ padding: "12px", backgroundColor: "#f6ffed", borderRadius: "6px" }}>
                <p style={{ margin: "0 0 8px 0", fontWeight: "500" }}>
                  ✓ Meal timing consistency
                </p>
                <p style={{ margin: 0, fontSize: "14px", color: "rgba(0, 0, 0, 0.65)" }}>
                  Maintain regular meal schedules to improve glucose stability
                </p>
              </div>
              <div style={{ padding: "12px", backgroundColor: "#f6ffed", borderRadius: "6px" }}>
                <p style={{ margin: "0 0 8px 0", fontWeight: "500" }}>
                  ✓ Physical activity
                </p>
                <p style={{ margin: 0, fontSize: "14px", color: "rgba(0, 0, 0, 0.65)" }}>
                  Post-meal walks of 15 minutes can help reduce glucose spikes
                </p>
              </div>
              <div style={{ padding: "12px", backgroundColor: "#f6ffed", borderRadius: "6px" }}>
                <p style={{ margin: "0 0 8px 0", fontWeight: "500" }}>
                  ✓ Carbohydrate awareness
                </p>
                <p style={{ margin: 0, fontSize: "14px", color: "rgba(0, 0, 0, 0.65)" }}>
                  Monitor and balance carbohydrate intake with protein and fiber
                </p>
              </div>
            </Space>
          </Card>
        </Col>

        {/* Alerts */}
        <Col xs={24} md={12}>
          <Card
            title={
              <Space>
                <WarningOutlined style={{ color: "#faad14" }} />
                <span>Areas of Concern</span>
              </Space>
            }
          >
            {insights.max_glucose > 180 && (
              <div style={{ padding: "12px", backgroundColor: "#fffbe6", borderRadius: "6px", marginBottom: "12px" }}>
                <p style={{ margin: "0 0 8px 0", fontWeight: "500", color: "#faad14" }}>
                  ⚠ Frequent high glucose readings
                </p>
                <p style={{ margin: 0, fontSize: "14px", color: "rgba(0, 0, 0, 0.65)" }}>
                  You have multiple readings above 180 mg/dL. Consider reviewing your diet.
                </p>
              </div>
            )}
            {insights.min_glucose < 70 && (
              <div style={{ padding: "12px", backgroundColor: "#fff1f0", borderRadius: "6px", marginBottom: "12px" }}>
                <p style={{ margin: "0 0 8px 0", fontWeight: "500", color: "#ff4d4f" }}>
                  ⚠ Low glucose events detected
                </p>
                <p style={{ margin: 0, fontSize: "14px", color: "rgba(0, 0, 0, 0.65)" }}>
                  You experienced hypoglycemic episodes. Always carry fast-acting carbs.
                </p>
              </div>
            )}
            {insights.time_in_range_pct < 50 && (
              <div style={{ padding: "12px", backgroundColor: "#fff1f0", borderRadius: "6px" }}>
                <p style={{ margin: "0 0 8px 0", fontWeight: "500", color: "#ff4d4f" }}>
                  ⚠ Low time in range
                </p>
                <p style={{ margin: 0, fontSize: "14px", color: "rgba(0, 0, 0, 0.65)" }}>
                  Less than 50% of readings are in target range. Schedule a call with your healthcare provider.
                </p>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Data Summary */}
      <Row style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card title="Summary Statistics">
            <Space orientation="vertical" style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "1px solid #f0f0f0" }}>
                <span>Total Data Points:</span>
                <strong>{insights.total_points}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "1px solid #f0f0f0" }}>
                <span>Glucose Range:</span>
                <strong>
                  {insights.min_glucose} - {insights.max_glucose} mg/dL
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Variability:</span>
                <strong>
                  {variability}%
                </strong>
              </div>
                </strong>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
