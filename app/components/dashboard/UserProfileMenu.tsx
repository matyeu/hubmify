"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface UserProfileMenuProps {
  userName?: string;
  userInitial?: string;
  gradientFrom?: string;
  gradientTo?: string;
  variant?: "header" | "sidebar";
  showText?: boolean;
}

export default function UserProfileMenu({
  userName,
  userInitial = "M",
  gradientFrom = "#004AAD",
  gradientTo = "#E385EC",
  variant = "header",
  showText = true,
}: UserProfileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  if (!userName) return null;

  const isHeader = variant === "header";
  const avatarSize = isHeader ? "w-8 h-8" : "w-10 h-10";
  const textSize = isHeader ? "text-sm font-medium" : "text-sm font-bold";
  const containerClass = isHeader
    ? "hidden md:flex items-center gap-2 pl-3 border-l border-gray-200 relative"
    : "relative";

  const menuPositionClass = isHeader
    ? "absolute right-0 top-full mt-2 w-64"
    : showText
    ? "absolute bottom-full left-0 right-0 mb-2 w-full"
    : "absolute bottom-full left-full ml-2 mb-2 w-64";

  return (
    <div ref={menuRef} className={containerClass}>
      <div
        className={`flex items-center ${
          isHeader ? "gap-2" : showText ? "gap-3" : "justify-center"
        } cursor-pointer`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div
          className={`${avatarSize} rounded-full flex items-center justify-center text-white font-semibold ${
            isHeader ? "text-sm" : ""
          }`}
          style={{
            background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
          }}
        >
          {userInitial}
        </div>
        {showText && (
          <div
            className={`flex items-center ${
              isHeader ? "gap-1" : "gap-1 flex-1"
            }`}
          >
            <span
              className={`${textSize} ${
                isHeader
                  ? "text-gray-900"
                  : "text-gray-700 transition-opacity duration-700 ease-out"
              }`}
            >
              {userName}
            </span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Menu déroulant */}
      {isMenuOpen && (
        <div
          className={`${menuPositionClass} bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-[600px] overflow-y-auto`}
        >
          <div className="p-2">
            {/* Section Hubmify */}
            <div className="mb-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-2">
                HUBMIFY
              </p>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/subscription"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pro Subscription
                  </Link>
                </li>
              </ul>
            </div>

            {/* Section PROJECTS */}
            <div className="mb-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-2">
                PROJECTS
              </p>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard/"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Transfer Modules
                  </Link>
                </li>
              </ul>
            </div>

            {/* Section PAYMENT */}
            <div className="mb-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-2">
                PAYMENT
              </p>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Billing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* General options */}
            <div className="space-y-1">
              <Link
                href="#"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Language
              </Link>
              <Link
                href="#"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Release Notes
              </Link>
              <Link
                href="#"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Support Server
              </Link>
              <Link
                href="#"
                className="block px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
