/**
 * Theme configuration for CGM Trace
 * Centralized design system for consistent styling
 */

export const THEME = {
  colors: {
    primary: "#1890ff",
    success: "#52c41a",
    warning: "#faad14",
    danger: "#ff4d4f",
    info: "#1890ff",
    
    // Custom colors for CGM
    safe: "#52c41a",
    warning_glucose: "#faad14",
    high_glucose: "#ff4d4f",
    low_glucose: "#1890ff",
    
    // Grayscale
    text_primary: "rgba(0, 0, 0, 0.85)",
    text_secondary: "rgba(0, 0, 0, 0.65)",
    text_disabled: "rgba(0, 0, 0, 0.45)",
    border: "#d9d9d9",
    background: "#fafafa",
    card_background: "#ffffff",
    shadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
  },
  
  spacing: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  
  radius: {
    sm: "4px",
    md: "6px",
    lg: "8px",
  },
  
  fonts: {
    heading: "'Segoe UI', 'Helvetica Neue', sans-serif",
    body: "'Segoe UI', 'Helvetica Neue', sans-serif",
  },
};

export const LAYOUT_COLORS = {
  header: "#001529",
  sider: "#001529",
  background: "#f0f2f5",
  contentBackground: "#ffffff",
};
