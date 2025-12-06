"use client";

import { Upload, message, Space, Typography, Progress, Spin } from "antd";
import { UploadOutlined, FileOutlined, CheckCircleOutlined } from "@ant-design/icons";
import axiosInstance from "@/lib/axios";
import { UploadResponse, UploadRequestOption } from "@/types";
import { useState } from "react";

const { Dragger } = Upload;
const { Text } = Typography;

export default function UploadCard() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = (options: UploadRequestOption) => {
    setUploading(true);
    setProgress(0);
    setUploaded(false);

    const formData = new FormData();
    formData.append("file", options.file);

    axiosInstance.post<UploadResponse>("/glucose/upload", formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        setProgress(percentCompleted);
      },
    })
      .then(() => {
        setUploading(false);
        setProgress(100);
        setUploaded(true);
        message.success("Upload successful!");
        options.onSuccess?.({}, options.file);

        // Reset after 2 seconds
        setTimeout(() => {
          setUploaded(false);
          setProgress(0);
        }, 2000);
      })
      .catch((e) => {
        setUploading(false);
        setProgress(0);
        message.error("Upload failed");
        options.onError?.(e instanceof Error ? e : new Error(String(e)));
      });
  };

  return (
    <div>
      <Dragger
        customRequest={handleUpload}
        showUploadList={false}
        multiple={false}
        accept=".csv,.txt"
        disabled={uploading}
        style={{
          borderRadius: "8px",
          cursor: uploading ? "not-allowed" : "pointer",
        }}
      >
        <div style={{ padding: "40px 20px" }}>
          {uploading ? (
            <Spin size="large" style={{ marginBottom: "16px" }} />
          ) : uploaded ? (
            <CheckCircleOutlined style={{ fontSize: "48px", color: "#52c41a", marginBottom: "16px" }} />
          ) : (
            <UploadOutlined style={{ fontSize: "48px", color: "#1890ff", marginBottom: "16px" }} />
          )}
          <p style={{
            fontSize: "16px",
            fontWeight: "600",
            margin: "16px 0 8px 0",
            color: "rgba(0, 0, 0, 0.85)",
          }}>
            {uploading ? "Uploading..." : uploaded ? "Upload Successful!" : "Drag CSV file here"}
          </p>
          <p style={{
            fontSize: "14px",
            color: "rgba(0, 0, 0, 0.65)",
            margin: 0,
          }}>
            or click to select file from your computer
          </p>
        </div>
      </Dragger>

      {/* Progress Bar */}
      {uploading && (
        <div style={{ marginTop: "16px" }}>
          <Progress percent={progress} status={uploading ? "active" : "success"} />
          <Text style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.65)" }}>
            {progress}% uploaded
          </Text>
        </div>
      )}

      {/* File Information */}
      <div style={{
        marginTop: "32px",
        padding: "16px",
        backgroundColor: "#fafafa",
        borderRadius: "6px",
        border: "1px solid #f0f0f0",
      }}>
        <h4 style={{ margin: "0 0 12px 0", color: "rgba(0, 0, 0, 0.85)" }}>
          <FileOutlined style={{ marginRight: "8px" }} />
          File Requirements
        </h4>
        <Space orientation="vertical" size="small" style={{ width: "100%" }}>
          <Text style={{ fontSize: "13px" }}>
            • <strong>Format:</strong> CSV (Comma-Separated Values)
          </Text>
          <Text style={{ fontSize: "13px" }}>
            • <strong>Required columns:</strong> timestamp, glucose_value
          </Text>
          <Text style={{ fontSize: "13px" }}>
            • <strong>Max file size:</strong> 50MB
          </Text>
          <Text style={{ fontSize: "13px" }}>
            • <strong>Recommended:</strong> At least 7 days of continuous data
          </Text>
        </Space>
      </div>

      {/* Example CSV Format */}
      <div style={{
        marginTop: "16px",
        padding: "16px",
        backgroundColor: "#f6f8fa",
        borderRadius: "6px",
        border: "1px solid #e1e4e8",
      }}>
        <h4 style={{ margin: "0 0 12px 0", color: "rgba(0, 0, 0, 0.85)" }}>
          Example Format
        </h4>
        <pre style={{
          margin: 0,
          fontSize: "12px",
          color: "#24292e",
          overflow: "auto",
          padding: "12px",
          backgroundColor: "#fff",
          borderRadius: "4px",
        }}>
{`timestamp,glucose_value
2024-01-01 08:00:00,120
2024-01-01 08:05:00,125
2024-01-01 08:10:00,118`}
        </pre>
      </div>
    </div>
  );
}
