"use client";

import { Row, Col, Card, Button, Space, Statistic } from "antd";
import {
  UploadOutlined,
  BarChartOutlined,
  BulbOutlined,
  ArrowRightOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const features = [
  {
    icon: <UploadOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
    title: "Upload Data",
    description: "Import glucose data from your CGM device in seconds",
    link: "/upload",
  },
  {
    icon: <BarChartOutlined style={{ fontSize: "32px", color: "#52c41a" }} />,
    title: "View Analytics",
    description: "Visualize your glucose trends with interactive charts",
    link: "/dashboard",
  },
  {
    icon: <BulbOutlined style={{ fontSize: "32px", color: "#faad14" }} />,
    title: "Get Insights",
    description: "Receive AI-powered recommendations and predictions",
    link: "/insights",
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: "calc(100vh - 64px - 200px)"}} className="p-4">
      {/* Hero Section */}
      <Row justify="center" style={{ marginBottom: "48px", paddingTop: "32px" }}>
        <Col xs={24} sm={24} md={20} lg={18}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{
              fontSize: "48px",
              fontWeight: "700",
              margin: "0 0 16px 0",
              background: "linear-gradient(135deg, #1890ff 0%, #52c41a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              CGM Trace
            </h1>
            <h2 style={{
              fontSize: "28px",
              fontWeight: "600",
              margin: "0 0 24px 0",
              color: "rgba(0, 0, 0, 0.85)",
            }}>
              Transform Your Glucose Data into Actionable Insights
            </h2>
            <p style={{
              fontSize: "16px",
              color: "rgba(0, 0, 0, 0.65)",
              marginBottom: "32px",
              lineHeight: "1.6",
            }}>
              Upload → Analyze → Predict → Take Action
            </p>

            <Space size="large" wrap style={{ justifyContent: "center", display: "flex" }}>
              <Link href="/upload">
                <Button
                  type="primary"
                  size="large"
                  icon={<UploadOutlined />}
                  style={{ borderRadius: "8px", minWidth: "200px" }}
                >
                  Upload Data
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="large"
                  icon={<BarChartOutlined />}
                  style={{ borderRadius: "6px", minWidth: "160px" }}
                >
                  View Dashboard
                </Button>
              </Link>
            </Space>
          </div>
        </Col>
      </Row>

      {/* Features Section */}
      <Row gutter={[24, 24]} style={{ marginBottom: "64px" }}>
        <Col span={24}>
          <h2 style={{
            fontSize: "28px",
            fontWeight: "600",
            textAlign: "center",
          }}>
            Features
          </h2>
        </Col>

        {features.map((feature, index) => (
          <Col xs={24} sm={24} md={8} key={index}>
            <Link href={feature.link} style={{ textDecoration: "none" }}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  border: "1px solid #f0f0f0",
                  transition: "all 0.3s ease",
                  borderRadius: "8px",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ marginBottom: "16px" }}>
                    {feature.icon}
                  </div>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "0 0 12px 0",
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    margin: "0 0 16px 0",
                    color: "rgba(0, 0, 0, 0.65)",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    minHeight: "48px"
                  }}>
                    {feature.description}
                  </p>
                  <Button
                    type="primary"
                    block
                    size="large"
                    icon={<ArrowRightOutlined />}
                    style={{ borderRadius: "6px", width: "60%" }}
                  >
                    Learn More
                  </Button>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* Stats Section */}
      <Row gutter={[24, 24]} style={{ marginBottom: "64px" }}>
        <Col span={24}>
          <h2 style={{
            fontSize: "28px",
            fontWeight: "600",
            textAlign: "center",
            marginBottom: "32px",
          }}>
            Why CGM Trace?
          </h2>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card style={{ textAlign: "center" }}>
            <Statistic
              title="Data Points"
              value={10000}
              suffix="+"
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card style={{ textAlign: "center" }}>
            <Statistic
              title="Accuracy"
              value={98}
              suffix="%"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card style={{ textAlign: "center" }}>
            <Statistic
              title="Insights Generated"
              value={1200}
              suffix="+"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card style={{ textAlign: "center" }}>
            <Statistic
              title="User Satisfaction"
              value={4.9}
              suffix="/5"
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
