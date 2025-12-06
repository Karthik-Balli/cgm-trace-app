"use client";

import { Layout, Row, Col, Divider } from "antd";
import { GithubOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons";

const { Footer: AntFooter } = Layout;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter
      style={{
        background: "#ffffff",
        borderTop: "1px solid #d9d9d9",
        marginTop: "auto",
      }}
    >
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={12} md={6}>
          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ margin: "0 0 12px 0", color: "rgba(0, 0, 0, 0.85)" }}>About</h4>
            <p style={{ margin: 0, fontSize: "14px", color: "rgba(0, 0, 0, 0.65)" }}>
              CGM Trace transforms glucose sensor data into actionable insights with AI-powered analysis.
            </p>
          </div>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <h4 style={{ margin: "0 0 12px 0", color: "rgba(0, 0, 0, 0.85)" }}>Product</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "8px" }}>
              <a href="#" style={{ color: "rgba(0, 0, 0, 0.65)", textDecoration: "none" }}>
                Features
              </a>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a href="#" style={{ color: "rgba(0, 0, 0, 0.65)", textDecoration: "none" }}>
                Pricing
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "rgba(0, 0, 0, 0.65)", textDecoration: "none" }}>
                Documentation
              </a>
            </li>
          </ul>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <h4 style={{ margin: "0 0 12px 0", color: "rgba(0, 0, 0, 0.85)" }}>Company</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "8px" }}>
              <a href="#" style={{ color: "rgba(0, 0, 0, 0.65)", textDecoration: "none" }}>
                About Us
              </a>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a href="#" style={{ color: "rgba(0, 0, 0, 0.65)", textDecoration: "none" }}>
                Blog
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "rgba(0, 0, 0, 0.65)", textDecoration: "none" }}>
                Contact
              </a>
            </li>
          </ul>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <h4 style={{ margin: "0 0 12px 0", color: "rgba(0, 0, 0, 0.85)" }}>Follow Us</h4>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href="#" style={{ color: "rgba(0, 0, 0, 0.65)", fontSize: "18px" }}>
              <GithubOutlined />
            </a>
            <a href="#" style={{ color: "rgba(0, 0, 0, 0.65)", fontSize: "18px" }}>
              <LinkedinOutlined />
            </a>
            <a href="#" style={{ color: "rgba(0, 0, 0, 0.65)", fontSize: "18px" }}>
              <TwitterOutlined />
            </a>
          </div>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <p style={{ margin: 0, color: "rgba(0, 0, 0, 0.65)", fontSize: "14px" }}>
            © {currentYear} CGM Trace. All rights reserved. | 
            <a href="#" style={{ marginLeft: "8px", color: "#1890ff", textDecoration: "none" }}>
              Privacy Policy
            </a>
            {" "}| 
            <a href="#" style={{ marginLeft: "8px", color: "#1890ff", textDecoration: "none" }}>
              Terms of Service
            </a>
          </p>
        </Col>
      </Row>
    </AntFooter>
  );
}
