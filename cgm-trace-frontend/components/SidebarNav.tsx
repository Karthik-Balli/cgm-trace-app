"use client";

import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UploadOutlined,
  BarChartOutlined,
  BulbOutlined,
  FileOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useMemo } from "react";
import type { MenuProps } from "antd";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

export default function SidebarNav() {
  const pathname = usePathname();

  const items: MenuProps["items"] = useMemo(
    () => [
      {
        key: "home",
        icon: <HomeOutlined />,
        label: <Link href="/">Home</Link>,
      },
      {
        key: "dashboard",
        icon: <BarChartOutlined />,
        label: <Link href="/dashboard">Dashboard</Link>,
      },
      {
        key: "upload",
        icon: <UploadOutlined />,
        label: <Link href="/upload">Upload Data</Link>,
      },
      {
        key: "insights",
        icon: <BulbOutlined />,
        label: <Link href="/insights">Insights</Link>,
      },
      {
        type: "divider",
      },
      {
        key: "reports",
        icon: <FileOutlined />,
        label: "Reports",
        children: [
          {
            key: "weekly",
            label: <a href="#" onClick={(e) => e.preventDefault()}>Weekly Report</a>,
          },
          {
            key: "monthly",
            label: <a href="#" onClick={(e) => e.preventDefault()}>Monthly Report</a>,
          },
        ],
      },
    ],
    []
  );

  const getSelectedKey = () => {
    if (pathname === "/") return ["home"];
    if (pathname.startsWith("/dashboard")) return ["dashboard"];
    if (pathname.startsWith("/upload")) return ["upload"];
    if (pathname.startsWith("/insights")) return ["insights"];
    return ["home"];
  };

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "calc(100vh - 64px)",
        position: "sticky",
        top: 64,
        left: 0,
      }}
      width={240}
      theme="dark"
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getSelectedKey()}
        items={items}
        style={{
          borderRight: 0,
          paddingTop: "16px",
        }}
      />
    </Sider>
  );
}
