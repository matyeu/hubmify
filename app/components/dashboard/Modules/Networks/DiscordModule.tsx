"use client";

import { useState } from "react";
import { ModuleConfig } from "../types";
import Button from "../../../Button";

export const discordConfig: ModuleConfig = {
  title: "DISCORD",
  icon: (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center"
      style={{ backgroundColor: "#334EDD" }}
    >
      <svg
        className="w-5 h-5"
        style={{ color: "#FFFFFF" }}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    </div>
  ),
  tabs: [
    {
      label: "USER",
      icon: (
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      label: "SERVER",
      icon: (
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
  ],
  sizeOptions: true,
  themeOptions: true,
  displayModeOptions: true,
  actionButtons: [{ label: "Add module", variant: "primary" }],
};

export const DiscordContent = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      {/* Tabs USER/SERVER */}
      {discordConfig.tabs && (
        <div className="mb-6">
          <div className="flex gap-3">
            {discordConfig.tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setSelectedTab(index)}
                className={`flex-1 px-4 py-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-colors ${
                  selectedTab === index
                    ? "bg-gray-100 border-gray-200"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                <span className="font-medium text-gray-900">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Options SIZE */}
      {discordConfig.sizeOptions && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">SIZE</h3>
          <div className="flex gap-2">
            {[
              { icon: "grid", selected: true },
              { icon: "vertical", selected: false },
              { icon: "horizontal", selected: false },
              { icon: "square", selected: false },
            ].map((size, index) => (
              <button
                key={index}
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  size.selected
                    ? "bg-gray-100 border-2 border-gray-300"
                    : "bg-white border border-gray-200 hover:bg-gray-50"
                } transition-colors`}
              >
                {size.icon === "grid" && (
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Options THEME */}
      {discordConfig.themeOptions && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">THEME</h3>
          <div className="flex gap-3">
            {[
              { color: "blue", selected: true },
              { color: "white", selected: false },
              { color: "black", selected: false },
            ].map((theme, index) => (
              <button
                key={index}
                className={`w-10 h-10 rounded-full border-2 ${
                  theme.selected
                    ? theme.color === "blue"
                      ? "border-blue-600"
                      : theme.color === "white"
                      ? "border-gray-300"
                      : "border-gray-900"
                    : "border-gray-200"
                } ${
                  theme.color === "blue"
                    ? "bg-blue-500"
                    : theme.color === "white"
                    ? "bg-white"
                    : "bg-black"
                } hover:opacity-80 transition-opacity`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Options DISPLAY MODE */}
      {discordConfig.displayModeOptions && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            DISPLAY MODE
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left p-4 rounded-lg bg-blue-50 border-2 border-blue-500">
              <div className="font-semibold text-blue-600 mb-1">Cozy</div>
              <div className="text-xs text-gray-600">
                DEFAULT MODE. MORE INFORMATIONS AND DETAILS.
              </div>
            </button>
            <button className="w-full text-left p-4 rounded-lg bg-white border-2 border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-semibold text-gray-900 mb-1">Compact</div>
              <div className="text-xs text-gray-600">
                SIMPLIFIED MODE. LESS INFORMATIONS AND DETAILS.
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Boutons d'action */}
      {discordConfig.actionButtons && (
        <div className="flex gap-3">
          {discordConfig.actionButtons.map((button, index) => (
            <Button
              key={index}
              onClick={button.onClick}
              variant={button.variant}
              size="lg"
              className="flex-1"
            >
              {button.label}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};
