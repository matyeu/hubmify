"use client";

import { useState } from "react";
import Button from "../../Button";
import { releaseNotes, ReleaseNote } from "../../../data/releaseNotes";

interface ReleaseNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReleaseNotesModal({
  isOpen,
  onClose,
}: ReleaseNotesModalProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = releaseNotes.length;

  const currentNote: ReleaseNote = releaseNotes[currentPage];

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const formatDate = (dateString: string) => {
    return dateString;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900/30 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          aria-label="Fermer"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 pr-8">
              [NOUVELLE FONCTIONNALITÉ] {currentNote.title} 🎉🎉🎉
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {formatDate(currentNote.date)}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              {currentNote.description}
            </p>
          </div>

          {currentNote.features && currentNote.features.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                ✨ Nouvelles fonctionnalités
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-2">
                {currentNote.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {currentNote.improvements && currentNote.improvements.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                🚀 Améliorations
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-2">
                {currentNote.improvements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </div>
          )}

          {currentNote.fixes && currentNote.fixes.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                🐛 Corrections
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-2">
                {currentNote.fixes.map((fix, index) => (
                  <li key={index}>{fix}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className="p-1 disabled:opacity-50 disabled hover:text-gray-700 transition-colors rounded hover:bg-gray-100"
              aria-label="Page précédente"
            >
              <svg
                className="w-5 h-5 cursor-pointer"
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
            <span className="text-xs font-medium">
              {currentPage + 1}/{totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="p-1 disabled:opacity-50 disabled hover:text-gray-700 transition-colors rounded hover:bg-gray-100"
              aria-label="Page suivante"
            >
              <svg
                className="w-5 h-5 cursor-pointer"
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
          <Button onClick={onClose} variant="primary" size="sm">
            Compris !
          </Button>
        </div>
      </div>
    </div>
  );
}
