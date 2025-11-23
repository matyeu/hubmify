"use client";

import { useState } from "react";
import { ModuleConfig } from "../types";
import Button from "../../../Button";

export const themeConfig: ModuleConfig = {
  title: "THEMES",
  icon: (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center"
      style={{ backgroundColor: "#F24A8D" }}
    >
      <svg
        className="w-5 h-5"
        style={{ color: "#FFFFFF" }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    </div>
  ),
};

export const ThemeContent = () => {
  const [selectedTheme, setSelectedTheme] = useState(3); // Le 4ème thème est sélectionné par défaut
  const [currentPage, setCurrentPage] = useState(0);

  const themes = [
    {
      id: 1,
      preview: "dark-purple",
      name: "Dark Purple",
    },
    {
      id: 2,
      preview: "dark-purple-2",
      name: "Dark Purple 2",
    },
    {
      id: 3,
      preview: "light",
      name: "Light",
    },
    {
      id: 4,
      preview: "light-2",
      name: "Light 2",
    },
    {
      id: 5,
      preview: "light",
      name: "Light",
    },
    {
      id: 6,
      preview: "light-2",
      name: "Light 2",
    },
  ];

  const totalPages = Math.ceil(themes.length / 4);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <>
      {/* Titre SELECT A THEME */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        SELECT A THEME
      </h3>

      {/* Conteneur des thèmes en grille 2x2 */}
      <div className="relative mb-6">
        <div className="grid grid-cols-2 gap-3">
          {themes
            .slice(currentPage * 4, currentPage * 4 + 4)
            .map((theme, index) => (
              <div
                key={theme.id}
                className="w-full h-28 rounded-lg border-2 overflow-hidden cursor-pointer transition-all relative"
                style={{
                  borderColor:
                    selectedTheme === theme.id ? "#3B82F6" : "#E5E7EB",
                  backgroundColor:
                    theme.preview === "dark-purple" ||
                    theme.preview === "dark-purple-2"
                      ? "#1a0a2e"
                      : "#F9FAFB",
                }}
                onClick={() => setSelectedTheme(theme.id)}
              >
                {/* Preview du thème */}
                <div
                  className="w-full h-full p-4 flex flex-col"
                  style={{
                    backgroundImage:
                      theme.preview === "light" || theme.preview === "light-2"
                        ? "radial-gradient(circle, #e5e7eb 1px, transparent 1px)"
                        : "none",
                    backgroundSize: "8px 8px",
                  }}
                >
                  {theme.preview === "dark-purple" ||
                  theme.preview === "dark-purple-2" ? (
                    <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                      {/* Formes abstraites violettes qui brillent */}
                      <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 opacity-70 blur-xl animate-pulse"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 opacity-60 blur-2xl"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-purple-300 via-pink-300 to-purple-400 opacity-50 blur-3xl"></div>
                      <div className="absolute top-1/3 right-1/3 w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-80 blur-lg"></div>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-gray-300 mb-4 mx-auto"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-8 bg-gray-200 rounded mt-3"></div>
                        <div className="h-8 bg-gray-200 rounded"></div>
                      </div>
                    </>
                  )}
                </div>

                {/* Checkmark si sélectionné */}
                {selectedTheme === theme.id && (
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-black rounded-full flex items-center justify-center z-10">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Navigation avec points et flèches */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            currentPage === 0
              ? "bg-gray-100 text-gray-400"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Points de navigation */}
        <div className="flex gap-2.5 items-center">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`rounded-full transition-all duration-200 cursor-pointer ${
                currentPage === index ? "w-3.5 h-3.5" : "w-2.5 h-2.5"
              }`}
              style={{
                backgroundColor: currentPage === index ? "#A4A4A3" : "#E5E5E5",
              }}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            currentPage === totalPages - 1
              ? "bg-gray-100 text-gray-400"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Bouton Save */}
      <div className="mt-6">
        <Button variant="primary" size="lg" className="w-full">
          Save
        </Button>
      </div>
    </>
  );
};
