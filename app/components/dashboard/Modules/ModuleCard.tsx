"use client";

import Image from "next/image";
import { ReactElement } from "react";

interface ModuleCardProps {
  id: string;
  name: string;
  description: string;
  icon: ReactElement;
  isPro?: boolean;
  isPremium?: boolean;
  isNew?: boolean;
  enabled?: boolean;
  purchasedAt?: string;
  onClick?: () => void;
  actionButton?: ReactElement;
  className?: string;
}

export default function ModuleCard({
  id,
  name,
  description,
  icon,
  isPro,
  isPremium,
  isNew,
  enabled,
  purchasedAt,
  onClick,
  actionButton,
  className = "",
}: ModuleCardProps) {
  return (
    <div
      key={id}
      onClick={onClick}
      className={`group flex flex-col w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)] bg-white hover:bg-gray-50 transition-all duration-200 cursor-pointer p-6 rounded-[10px] border border-gray-200 hover:border-[#0F8096] hover:shadow-lg ${className}`}
    >
      <div className="flex justify-between items-start mb-4 relative">
        <div className="bg-[#CFF6FD] text-[#0F8096] w-12 h-12 flex items-center justify-center rounded-[10px] group-hover:bg-[#0F8096] group-hover:text-white transition-all duration-200">
          <div className="w-6 h-6">{icon}</div>
        </div>
        <div className="flex items-center gap-2">
          {isNew && (
            <div className="px-2 h-6 bg-green-100 text-green-700 flex items-center justify-center gap-1.5 text-xs font-medium rounded-[8px] border border-green-200">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nouveau !
            </div>
          )}
          {isPro && (
            <div className="absolute -top-4 -right-2 flex items-center justify-center z-10">
              <Image
                src="/images/badge_pro.png"
                alt="Pro badge"
                width={100}
                height={100}
                className="h-14 w-auto"
              />
            </div>
          )}
          {isPremium && (
            <div className="px-2 h-6 bg-amber-100 text-amber-700 flex items-center justify-center gap-1.5 text-xs font-medium rounded-[8px] border border-amber-200">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Premium
            </div>
          )}
        </div>
      </div>

      <div className="text-base font-bold text-gray-900 mb-2">{name}</div>
      <div className="text-sm text-gray-600 mb-5 line-clamp-2">
        {description.length > 100
          ? `${description.slice(0, 100)}...`
          : description}
      </div>

      {purchasedAt && (
        <div className="text-xs text-gray-500 mb-4">
          Acheté le{" "}
          {new Date(purchasedAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      )}

      {actionButton ? (
        <div className="mt-auto">{actionButton}</div>
      ) : (
        <div
          className={`mt-auto w-fit rounded-[10px] flex items-center justify-center gap-2 overflow-hidden relative ${
            enabled ? "bg-[#CFF6FD] text-[#0F8096] px-4 py-2" : "text-gray-700"
          }`}
        >
          {enabled ? (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm font-medium">Actif</span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-2 px-4 py-2 relative bottom-0 group-hover:bottom-full bg-gray-100 transition-all duration-200">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-sm font-medium">Activer</span>
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-[#0F8096] text-white absolute top-full group-hover:top-0 transition-all duration-200">
                <span className="text-sm font-medium">Activer</span>
                <svg
                  className="w-4 h-4"
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
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
