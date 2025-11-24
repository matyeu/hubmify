"use client";

import { ReactNode } from "react";
import Button from "../../Button";

interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
  align?: "left" | "right" | "center";
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  getRowKey: (item: T) => string;
  getRowRef?: (item: T) => ((el: HTMLTableRowElement | null) => void) | null;
  getRowClassName?: (item: T) => string;
  emptyMessage?: {
    title: string;
    description: string;
  };
}

export default function Table<T>({
  data,
  columns,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  getRowKey,
  getRowRef,
  getRowClassName,
  emptyMessage,
}: TableProps<T>) {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const getAlignmentClass = (align?: "left" | "right" | "center") => {
    switch (align) {
      case "right":
        return "text-right";
      case "center":
        return "text-center";
      default:
        return "text-left";
    }
  };

  if (data.length === 0 && emptyMessage) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <svg
          className="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {emptyMessage.title}
        </h3>
        <p className="text-sm text-gray-600">{emptyMessage.description}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider ${getAlignmentClass(
                    column.align
                  )}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item) => {
              const rowKey = getRowKey(item);
              const rowRef = getRowRef ? getRowRef(item) : null;
              const rowClassName = getRowClassName ? getRowClassName(item) : "";

              return (
                <tr
                  key={rowKey}
                  ref={rowRef || undefined}
                  className={`hover:bg-gray-50 transition-colors ${rowClassName}`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-6 py-4 whitespace-nowrap ${getAlignmentClass(
                        column.align
                      )}`}
                    >
                      {column.render(item)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && onPageChange && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Affichage de {startIndex + 1} à {Math.min(endIndex, data.length)}{" "}
            sur {data.length} page
            {data.length > 1 ? "s" : ""}
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
              className="px-3"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          currentPage === page
                            ? "bg-[#0F8096] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-2 text-gray-500">
                        ...
                      </span>
                    );
                  }
                  return null;
                }
              )}
            </div>
            <Button
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
              className="px-3"
            >
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
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
