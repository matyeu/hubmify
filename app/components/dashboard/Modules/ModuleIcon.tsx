"use client";

import { ReactNode } from "react";

interface ModuleIconProps {
  moduleId: string;
  selectedModule: string | null;
  onSelect: (moduleId: string | null) => void;
  icon: ReactNode;
  activeBackgroundColor: string;
  activeIconColor?: string;
  inactiveIconColor?: string;
  onClick?: () => void;
}

export default function ModuleIcon({
  moduleId,
  selectedModule,
  onSelect,
  icon,
  activeBackgroundColor,
  activeIconColor = "#FFFFFF",
  inactiveIconColor,
  onClick,
}: ModuleIconProps) {
  const isSelected = selectedModule === moduleId;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      onSelect(isSelected ? null : moduleId);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center cursor-pointer transition-colors shadow ${
        isSelected ? "" : "bg-white hover:bg-gray-50"
      }`}
      style={isSelected ? { backgroundColor: activeBackgroundColor } : {}}
    >
      <div
        style={{
          color: isSelected ? activeIconColor : inactiveIconColor || "#374151",
        }}
      >
        {icon}
      </div>
    </div>
  );
}
