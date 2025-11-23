"use client";

import { useSidebar } from "../../contexts/SidebarContext";
import Button from "../Button";

export default function CollapseButton() {
  const { collapsed, isMobile, isOpen, toggleCollapse } = useSidebar();

  if (isMobile && !isOpen) {
    return (
      <Button
        onClick={toggleCollapse}
        className="fixed top-4 left-4 z-[100] w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded shadow-lg hover:bg-gray-50 transition-all cursor-pointer md:hidden p-0"
        icon={
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        }
      />
    );
  }

  return (
    <Button
      onClick={toggleCollapse}
      className={`absolute -right-4 z-[100] w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded shadow-lg hover:bg-gray-50 transition-all cursor-pointer p-0 ${
        collapsed ? "top-[67px]" : "top-[95px]"
      }`}
      icon={
        <svg
          className="w-4 h-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              collapsed
                ? "M13 5l7 7-7 7M5 5l7 7-7 7"
                : "M11 19l-7-7 7-7m8 14l-7-7 7-7"
            }
          />
        </svg>
      }
    />
  );
}
