"use client";

import { useState } from "react";
import { ModuleConfig } from "../types";
import Button from "../../../Button";

export const customContentConfig: ModuleConfig = {
  title: "CUSTOM CONTENT",
  icon: (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center"
      style={{ backgroundColor: "#000000" }}
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
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  ),
  actionButtons: [{ label: "Add module", variant: "secondary" }],
};

export const CustomContentContent = () => {
  const [selectedSize, setSelectedSize] = useState(0);

  return (
    <>
      {/* Section IMAGES */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">IMAGES</h3>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="w-full aspect-square rounded-lg border-2 border-gray-200 bg-white flex items-center justify-center cursor-pointer hover:border-gray-300 transition-colors"
            >
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Section DESCRIPTION */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          DESCRIPTION
        </h3>
        <input
          type="text"
          placeholder="Image.s description"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
        />
      </div>

      {/* Section CLICK LINK */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">CLICK LINK</h3>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="https://example.com"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
          />
        </div>
      </div>

      {/* Section SIZE */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">SIZE</h3>
        <div className="flex gap-2">
          {[
            { icon: "grid", label: "1x1" },
            { icon: "vertical", label: "1x2" },
            { icon: "horizontal", label: "2x1" },
            { icon: "square", label: "2x2" },
          ].map((size, index) => (
            <button
              key={index}
              onClick={() => setSelectedSize(index)}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                selectedSize === index
                  ? "bg-gray-100 border-2 border-gray-300"
                  : "bg-white border border-gray-200 hover:bg-gray-50"
              }`}
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
              {size.icon === "vertical" && (
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="6" y="4" width="12" height="16" rx="2" />
                </svg>
              )}
              {size.icon === "horizontal" && (
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="4" y="6" width="16" height="12" rx="2" />
                </svg>
              )}
              {size.icon === "square" && (
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

      {/* Bouton Add module */}
      <div className="mt-6">
        {customContentConfig.actionButtons && (
          <div className="flex gap-3">
            {customContentConfig.actionButtons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant}
                size="lg"
                className="flex-1"
              >
                {button.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
