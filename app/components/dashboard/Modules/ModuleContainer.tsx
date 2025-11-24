"use client";

import { ReactNode } from "react";
import { discordConfig, DiscordContent } from "./Networks/DiscordModule";
import { githubConfig, GithubContent } from "./Networks/GitHubModule";
import {
  customContentConfig,
  CustomContentContent,
} from "./Web/CustomContentModule";
import { themeConfig, ThemeContent } from "./Web/ThemeModule";
import { ModuleConfig } from "./types";

interface ModuleHeaderProps {
  icon: ReactNode;
  title: string;
  badge?: string;
}

export function ModuleHeader({ icon, title, badge }: ModuleHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        {badge && (
          <button className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
            {badge}
          </button>
        )}
      </div>
      <div className="h-px bg-gray-200"></div>
    </div>
  );
}

interface ModuleConfigBoxProps {
  moduleType: string;
  onClose: () => void;
}

export default function ModuleConfigBox({
  moduleType,
  onClose,
}: ModuleConfigBoxProps) {
  const getModuleConfig = (type: string): ModuleConfig => {
    switch (type) {
      case "discord":
        return discordConfig;
      case "github":
        return githubConfig;
      case "customContent":
        return customContentConfig;
      case "theme":
        return themeConfig;
      default:
        return {
          title: "MODULE",
          icon: <div className="w-8 h-8 rounded-lg bg-gray-100"></div>,
        };
    }
  };

  const config = getModuleConfig(moduleType);

  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
      {/* Header */}
      <ModuleHeader
        icon={config.icon}
        title={config.title}
        badge={config.badge}
      />

      {/* Contenu spécifique au module */}
      {moduleType === "theme" && <ThemeContent />}
      {moduleType === "customContent" && <CustomContentContent />}
      {moduleType === "discord" && <DiscordContent />}
      {moduleType === "github" && <GithubContent />}
    </div>
  );
}
