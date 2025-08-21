import React from "react";
import { trackBreadcrumbNavigation } from "../telemetry/ga4";

export const Breadcrumb: React.FC = () => {
  const portalUrl = "https://luna-darkside.web.app";
  
  const handleClick = () => {
    trackBreadcrumbNavigation(
      window.location.pathname,
      portalUrl,
      "breadcrumb_component"
    );
  };

  return (
    <a
      href={portalUrl}
      onClick={handleClick}
      className="fixed top-3 left-3 text-xs underline opacity-80 hover:opacity-100 z-50 transition-opacity"
      style={{ 
        color: "#FFD700",
        textDecoration: "underline"
      }}
    >
      ← Back to Portal
    </a>
  );
};