"use client";

import Link from "next/link";
import { Layout, Menu, Dropdown, Avatar, Space, Button } from "antd";
import { UserOutlined, LogoutOutlined, SettingOutlined, BellOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useMemo } from "react";

const { Header } = Layout;

export default function HeaderBar() {
  // Navigation menu items
  // const navItems: MenuProps["items"] = useMemo(
  //   () => [
  //     {
  //       key: "home",
  //       label: <Link href="/" className="no-underline">Home</Link>,
  //     },
  //     {
  //       key: "dashboard",
  //       label: <Link href="/dashboard" className="no-underline">Dashboard</Link>,
  //     },
  //     {
  //       key: "upload",
  //       label: <Link href="/upload" className="no-underline">Upload</Link>,
  //     },
  //     {
  //       key: "insights",
  //       label: <Link href="/insights" className="no-underline">Insights</Link>,
  //     },
  //   ],
  //   []
  // );

  // User menu items
  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
    },
  ];

  return (
    <Header
      style={{
        background: "#aeaeae",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.15)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Logo/Brand */}
      <Link href="/" className="no-underline">
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "20px",
          fontWeight: "600",
          color: "#ffffff",
          cursor: "pointer",
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #1890ff, #52c41a)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "700",
            color: "#ffffff",
          }}>
            CGM
          </div>
          <span>CGM Trace</span>
        </div>
      </Link>

      {/* Center Navigation */}
      {/* <Menu
        mode="horizontal"
        items={navItems}
        defaultSelectedKeys={["home"]}
        style={{
          background: "transparent",
          border: "none",
          flex: 1,
          marginLeft: "48px",
        }}
      /> */}

      {/* Right Section - Notifications & User Menu */}
      <Space size={16} style={{ marginLeft: "auto" }}>
        {/* Notifications */}
        <Button
          type="text"
          icon={<BellOutlined style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.85)" }} />}
          style={{
            border: "none",
            backgroundColor: "transparent",
            color: "rgba(255, 255, 255, 0.85)",
          }}
        />

        {/* User Menu */}
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={["click"]}>
          <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{
                backgroundColor: "#1890ff",
                cursor: "pointer",
              }}
            />
          </div>
        </Dropdown>
      </Space>
    </Header>
  );
}
