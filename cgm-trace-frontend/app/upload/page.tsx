"use client";

import { Row, Col, Card, Space, Divider, Alert, Steps } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import UploadCard from "@/components/UploadCard";

export default function UploadPage() {
  return (
    <div>
      {/* Page Header */}
      <Row style={{ marginBottom: "32px" }}>
        <Col span={24}>
          <h1 className="page-header-title">Upload Glucose Data</h1>
          <p className="page-header-description">
            Import your CGM sensor data to get started with analysis
          </p>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Upload Section */}
        <Col xs={24} md={14}>
          <Card>
            <UploadCard />
          </Card>

          {/* Instructions */}
          <Card style={{ marginTop: "24px" }}>
            <h3 style={{ marginTop: 0 }}>How to Upload</h3>
            <Steps
              orientation="vertical"
              items={[
                {
                  title: "Prepare Your File",
                  content: "Export your CGM data as a CSV file from your device's app or software",
                },
                {
                  title: "Select File",
                  content: "Click the upload button and choose your CSV file from your computer",
                },
                {
                  title: "Upload",
                  content: "Our system will process your data automatically",
                },
                {
                  title: "View Results",
                  content: "Access your analytics and insights in the Dashboard",
                },
              ]}
            />
          </Card>
        </Col>

        {/* Sidebar */}
        <Col xs={24} md={10}>
          {/* Supported Formats */}
          <Card title="Supported Formats" style={{ marginBottom: "24px" }}>
            <Space orientation="vertical" style={{ width: "100%" }}>
              <div>
                <strong>File Types:</strong>
                <p style={{ margin: "8px 0", color: "rgba(0, 0, 0, 0.65)" }}>
                  • CSV (Comma-Separated Values)
                </p>
              </div>
              <Divider style={{ margin: "12px 0" }} />
              <div>
                <strong>Required Columns:</strong>
                <p style={{ margin: "8px 0", color: "rgba(0, 0, 0, 0.65)" }}>
                  • Timestamp (Date & Time)
                  <br />• Glucose Value (mg/dL or mmol/L)
                </p>
              </div>
              <Divider style={{ margin: "12px 0" }} />
              <div>
                <strong>File Size:</strong>
                <p style={{ margin: "8px 0", color: "rgba(0, 0, 0, 0.65)" }}>
                  Maximum 50MB per file
                </p>
              </div>
            </Space>
          </Card>

          {/* Tips */}
          <Card title="Tips for Best Results" style={{ marginBottom: "24px" }}>
            <Space orientation="vertical" style={{ width: "100%" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <CheckCircleOutlined style={{ color: "#52c41a", marginTop: "2px" }} />
                <span>Ensure data is continuous for accurate trends</span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <CheckCircleOutlined style={{ color: "#52c41a", marginTop: "2px" }} />
                <span>Include at least 7 days of data for insights</span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <CheckCircleOutlined style={{ color: "#52c41a", marginTop: "2px" }} />
                <span>Upload during low-traffic hours for faster processing</span>
              </div>
            </Space>
          </Card>

          {/* Info Alert */}
          <Alert
            message="Privacy First"
            description="Your data is encrypted and stored securely. We never share your information with third parties."
            type="info"
            showIcon
          />
        </Col>
      </Row>
    </div>
  );
}
