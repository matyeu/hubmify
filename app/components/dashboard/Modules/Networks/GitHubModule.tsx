"use client";

import { useState } from "react";
import { ModuleConfig } from "../types";
import Button from "../../../Button";

export const githubConfig: ModuleConfig = {
  title: "GITHUB",
  icon: (
    <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
      <svg
        className="w-5 h-5 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
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
      label: "REPOSITORY",
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
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
  ],
  warningMessage:
    "This module needs to be authenticated with your GitHub account to work.",
  actionButtons: [
    {
      label: "Authenticate",
      variant: "primary",
      onClick: () => {
        // Logique d'authentification
      },
    },
  ],
};

export const GithubContent = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      {/* Tabs USER/REPOSITORY */}
      {githubConfig.tabs && (
        <div className="mb-6">
          <div className="flex gap-3">
            {githubConfig.tabs.map((tab, index) => (
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

      {/* Message d'avertissement */}
      {githubConfig.warningMessage && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-orange-600">
            {githubConfig.warningMessage}
          </p>
        </div>
      )}

      {/* Boutons d'action */}
      {githubConfig.actionButtons && (
        <div className="flex gap-3">
          {githubConfig.actionButtons.map((button, index) => (
            <Button
              key={index}
              onClick={button.onClick}
              variant={button.variant}
              className="flex-1"
              size="lg"
              icon={
                button.variant === "primary" ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : undefined
              }
            >
              {button.label}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};
