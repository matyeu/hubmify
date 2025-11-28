"use client";

import { ReactNode } from "react";
import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  closeOnBackdropClick?: boolean;
  variant?: "default" | "dark";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeOnBackdropClick = true,
  variant = "default",
}: ModalProps) {
  if (!isOpen) return null;

  const isDark = variant === "dark";

  return (
    <div
      className="fixed inset-0 bg-gray-900/30 z-50 flex items-center justify-center p-4"
      onClick={closeOnBackdropClick ? onClose : undefined}
    >
      <div className="relative max-w-md w-full">
        {/* Dégradé en arrière-plan pour le variant dark */}
        {isDark && (
          <div className="absolute -z-1 w-[340px] h-[340px] rounded-full bg-gradient-linear blur-[110px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        )}
        <div
          className={`${
            isDark
              ? "rounded-2xl border border-white/5 bg-[rgba(10,10,10,0.3)]"
              : "bg-white rounded-lg shadow-xl"
          } max-w-md w-full p-8 relative`}
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 p-0 w-8 h-8 min-w-0"
            icon={
              <svg
                className={`w-5 h-5 ${
                  isDark ? "text-white/70" : "text-gray-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            }
            aria-label="Fermer"
          />
          {title && (
            <h3
              className={`text-lg font-bold mb-4 pr-8 ${
                isDark ? "text-white font-title" : "text-gray-900"
              }`}
            >
              {title}
            </h3>
          )}
          <div
            className={`text-sm mb-6 ${
              isDark ? "text-white/90" : "text-gray-600"
            }`}
          >
            {children}
          </div>
          {footer && <div className="flex gap-3 justify-end">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
