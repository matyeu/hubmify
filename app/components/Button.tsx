"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: (e?: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  "aria-label"?: string;
}

export default function Button({
  children,
  variant,
  size = "md",
  href,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  icon,
  iconPosition = "left",
  fullWidth = false,
  ...props
}: ButtonProps) {
  const hasVariant = variant !== undefined;

  const baseClasses = hasVariant
    ? "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    : "";

  const variantClasses = {
    primary: "bg-black text-white hover:bg-gray-800 active:bg-gray-900",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300",
    outline:
      "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 active:bg-gray-100",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const defaultClasses = hasVariant
    ? `${variantClasses[variant]} ${sizeClasses[size]} ${widthClass}`
    : "";

  const classes = `${baseClasses} ${defaultClasses} ${className}`.trim();

  const content = (
    <>
      {icon && iconPosition === "left" && <span>{icon}</span>}
      {children && <span>{children}</span>}
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={props["aria-label"]}
    >
      {content}
    </button>
  );
}
