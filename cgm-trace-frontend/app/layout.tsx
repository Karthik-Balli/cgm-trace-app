import type { Metadata } from "next";
import "antd/dist/reset.css";
import "./globals.css";
import { Layout } from "antd";
import HeaderBar from "@/components/HeaderBar";
import SidebarNav from "@/components/SidebarNav";
import Footer from "@/components/Footer";
import { ReactQueryProvider } from "@/lib/react-query-provider";

export const metadata: Metadata = {
  title: "CGM Trace - Glucose Monitoring Dashboard",
  description: "Transform glucose sensor data into meaningful insights with AI-driven recommendations"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout style={{ minHeight: "100vh" }}>
          <HeaderBar />
          <Layout>
            <SidebarNav />
            <Layout>
              <ReactQueryProvider>
                <Layout>
                  {children}
                </Layout>
              </ReactQueryProvider>
              <Footer />
            </Layout>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}
