"use client";

import { ReactNode } from "react";
import Button from "./Button";

interface BadgeProps {
  children: ReactNode;
  variant?:
    | "published"
    | "disabled"
    | "draft"
    | "default"
    | "success"
    | "warning"
    | "error"
    | "info";
  onClick?: () => void;
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  onClick,
  className = "",
}: BadgeProps) {
  const getVariantConfig = () => {
    switch (variant) {
      case "published":
      case "success":
        return {
          bgColor: "bg-green-100",
          textColor: "text-green-700",
          hoverBg: "hover:bg-green-200",
        };
      case "disabled":
      case "error":
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-700",
          hoverBg: "hover:bg-red-200",
        };
      case "draft":
      case "info":
        return {
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          hoverBg: "hover:bg-blue-200",
        };
      case "warning":
        return {
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-700",
          hoverBg: "hover:bg-yellow-200",
        };
      case "default":
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          hoverBg: "hover:bg-gray-200",
        };
    }
  };

  const config = getVariantConfig();

  const baseClasses = `px-2 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} ${className}`;
  const interactiveClasses = onClick
    ? `${baseClasses} cursor-pointer transition-all hover:scale-105 ${config.hoverBg}`
    : baseClasses;

  if (onClick) {
    return (
      <Button onClick={onClick} className={interactiveClasses}>
        {children}
      </Button>
    );
  }

  return <div className={interactiveClasses}>{children}</div>;
}
