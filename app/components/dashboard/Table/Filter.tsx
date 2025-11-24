"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import Button from "../../Button";

export interface FilterOption {
  type: string;
  value: string;
  id: string;
}

interface FilterTypeOption {
  label: string;
  value: string;
}

interface StatusOption {
  value: string;
  label: string;
}

interface FilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilters: FilterOption[];
  onAddFilter: (filter: Omit<FilterOption, "id">) => void;
  onRemoveFilter: (filterId: string) => void;
  filterTypeOptions: FilterTypeOption[];
  getFilterValueOptions: (filterType: string) => string[];
  statusOptions?: StatusOption[];
  resultCount: number;
  showResultCount?: boolean;
  searchPlaceholder?: string;
  filterTypePlaceholder?: string;
  filterValuePlaceholder?: (type: string) => string;
  getFilterLabel?: (filter: FilterOption) => string;
  renderActiveFilter?: (filter: FilterOption) => ReactNode;
  onReset?: () => void;
  showResetButton?: boolean;
}

export default function Filter({
  searchQuery,
  onSearchChange,
  activeFilters,
  onAddFilter,
  onRemoveFilter,
  filterTypeOptions,
  getFilterValueOptions,
  statusOptions = [],
  resultCount,
  showResultCount = true,
  searchPlaceholder = "Rechercher...",
  filterTypePlaceholder = "Types de filtre",
  filterValuePlaceholder,
  getFilterLabel,
  renderActiveFilter,
  onReset,
  showResetButton = true,
}: FilterProps) {
  const [currentFilterType, setCurrentFilterType] = useState<string>("");
  const [currentFilterValue, setCurrentFilterValue] = useState<string>("");
  const [currentStatusFilter, setCurrentStatusFilter] = useState<string>("");
  const [showFilterTypeMenu, setShowFilterTypeMenu] = useState<boolean>(false);
  const [showFilterValueMenu, setShowFilterValueMenu] =
    useState<boolean>(false);
  const [showStatusMenu, setShowStatusMenu] = useState<boolean>(false);

  const filterTypeInputRef = useRef<HTMLDivElement | null>(null);
  const filterValueInputRef = useRef<HTMLDivElement | null>(null);
  const statusInputRef = useRef<HTMLDivElement | null>(null);

  // Obtenir les types de filtres déjà actifs
  const activeFilterTypes = activeFilters.map((f) => f.type);

  // Vérifier si le type de filtre est valide
  const isValidFilterType = filterTypeOptions
    .map((opt) => opt.value)
    .includes(currentFilterType);

  // Options de filtre selon le type
  const filterValueOptions = getFilterValueOptions(currentFilterType);

  // Fonction pour ajouter un filtre
  const handleAddFilter = () => {
    if (currentFilterType === "Statut" && currentStatusFilter) {
      onAddFilter({
        type: "Statut",
        value: currentStatusFilter,
      });
      setCurrentFilterType("");
      setCurrentStatusFilter("");
    } else if (currentFilterType && currentFilterValue) {
      onAddFilter({
        type: currentFilterType,
        value: currentFilterValue,
      });
      setCurrentFilterType("");
      setCurrentFilterValue("");
    }
  };

  // Gestion du clic en dehors des menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterTypeInputRef.current &&
        !filterTypeInputRef.current.contains(event.target as Node)
      ) {
        setShowFilterTypeMenu(false);
      }
      if (
        filterValueInputRef.current &&
        !filterValueInputRef.current.contains(event.target as Node)
      ) {
        setShowFilterValueMenu(false);
      }
      if (
        statusInputRef.current &&
        !statusInputRef.current.contains(event.target as Node)
      ) {
        setShowStatusMenu(false);
      }
    };

    if (showFilterTypeMenu || showFilterValueMenu || showStatusMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilterTypeMenu, showFilterValueMenu, showStatusMenu]);

  // Fonction pour obtenir le label d'un filtre
  const getFilterDisplayLabel = (filter: FilterOption): string => {
    if (getFilterLabel) {
      return getFilterLabel(filter);
    }
    if (filter.type === "Statut") {
      const statusOption = statusOptions.find(
        (opt) => opt.value === filter.value
      );
      return statusOption ? statusOption.label : filter.value;
    }
    return `${filter.type}: ${filter.value}`;
  };

  // Fonction pour obtenir le placeholder de la valeur du filtre
  const getFilterValuePlaceholder = (): string => {
    if (filterValuePlaceholder) {
      return filterValuePlaceholder(currentFilterType);
    }
    if (currentFilterType === "Auteur" || currentFilterType === "author") {
      return "Entrer un auteur...";
    }
    if (currentFilterType === "Date" || currentFilterType === "date") {
      return "Entrer une date...";
    }
    return "Entrer une valeur...";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex flex-col gap-4">
        {/* Première ligne : Recherche et compteur */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F8096] focus:border-transparent text-gray-900 placeholder:text-gray-400 ${
                  searchQuery ? "pr-10" : "pr-4"
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
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
              )}
            </div>
          </div>
          {showResultCount && (
            <div className="text-sm text-gray-600 hidden md:block">
              {resultCount} {resultCount > 1 ? "pages" : "page"}
              {(searchQuery || activeFilters.length > 0) &&
                ` trouvée${resultCount > 1 ? "s" : ""}`}
            </div>
          )}
        </div>

        {/* Deuxième ligne : Filtre avancé */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
            {/* Input type de filtre */}
            <div ref={filterTypeInputRef} className="relative sm:w-44">
              <div className="relative">
                <input
                  type="text"
                  placeholder={filterTypePlaceholder}
                  value={currentFilterType}
                  readOnly
                  onFocus={() => setShowFilterTypeMenu(true)}
                  onClick={() => setShowFilterTypeMenu(true)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F8096] focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400 cursor-pointer bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowFilterTypeMenu(!showFilterTypeMenu)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      showFilterTypeMenu ? "rotate-180" : ""
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
                </button>
              </div>

              {/* Menu déroulant type de filtre */}
              {showFilterTypeMenu && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {filterTypeOptions
                    .filter(
                      (option) => !activeFilterTypes.includes(option.value)
                    )
                    .map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setCurrentFilterType(option.value);
                          setCurrentFilterValue("");
                          setCurrentStatusFilter("");
                          setShowFilterTypeMenu(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                          currentFilterType === option.value
                            ? "bg-[#CFF6FD] text-[#0F8096] font-semibold"
                            : "text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Input valeur du filtre ou Select statut */}
            {isValidFilterType && currentFilterType !== "Statut" && (
              <div className="flex items-center gap-2">
                <div
                  ref={filterValueInputRef}
                  className="relative"
                  style={{ minWidth: "160px" }}
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={getFilterValuePlaceholder()}
                      value={currentFilterValue}
                      onChange={(e) => setCurrentFilterValue(e.target.value)}
                      onFocus={() => setShowFilterValueMenu(true)}
                      onClick={() => setShowFilterValueMenu(true)}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F8096] focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400 ${
                        currentFilterValue ? "pr-20" : "pr-10"
                      }`}
                    />
                    {currentFilterValue && (
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentFilterValue("");
                          setShowFilterValueMenu(false);
                        }}
                        className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setShowFilterValueMenu(!showFilterValueMenu)
                      }
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        className={`w-5 h-5 transition-transform ${
                          showFilterValueMenu ? "rotate-180" : ""
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
                    </button>
                  </div>

                  {/* Menu déroulant valeur */}
                  {showFilterValueMenu && filterValueOptions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {(() => {
                        const filterTerms = currentFilterValue
                          .split(";")
                          .map((t) => t.trim().toLowerCase())
                          .filter((t) => t.length > 0);

                        const filteredOptions = filterValueOptions.filter(
                          (option) => {
                            if (filterTerms.length === 0) return true;
                            return filterTerms.some((term) =>
                              option.toLowerCase().includes(term)
                            );
                          }
                        );

                        return (
                          <>
                            {filteredOptions.map((option, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => {
                                  setCurrentFilterValue(option);
                                  setShowFilterValueMenu(false);
                                }}
                                className="w-full px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                              >
                                {option}
                              </button>
                            ))}
                            {filteredOptions.length === 0 && (
                              <div className="px-3 py-2 text-sm text-gray-500">
                                Aucune valeur trouvée
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>
                {/* Icône d'information */}
                <div className="relative group">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg
                      className="w-3.5 h-3.5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <p className="mb-1 font-semibold">Recherche multiple</p>
                    <p>
                      Utilisez le point-virgule (;) pour séparer plusieurs
                      valeurs. Exemple :{" "}
                      <span className="font-mono bg-gray-800 px-1 rounded">
                        {currentFilterType === "Auteur" ||
                        currentFilterType === "author"
                          ? "Matyeu;Nawre"
                          : "2025-01-15;2025-01-16"}
                      </span>
                    </p>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
                {/* Bouton pour ajouter le filtre */}
                {currentFilterValue && (
                  <Button
                    onClick={handleAddFilter}
                    variant="outline"
                    size="sm"
                    className="whitespace-nowrap"
                  >
                    Ajouter le filtre
                  </Button>
                )}
              </div>
            )}

            {/* Select statut */}
            {currentFilterType === "Statut" && (
              <div className="flex items-center gap-2">
                <div ref={statusInputRef} className="relative sm:w-44">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Statut"
                      value={
                        currentStatusFilter
                          ? statusOptions.find(
                              (opt) => opt.value === currentStatusFilter
                            )?.label || ""
                          : ""
                      }
                      readOnly
                      onFocus={() => setShowStatusMenu(true)}
                      onClick={() => setShowStatusMenu(true)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F8096] focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400 cursor-pointer bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowStatusMenu(!showStatusMenu)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        className={`w-5 h-5 transition-transform ${
                          showStatusMenu ? "rotate-180" : ""
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
                    </button>
                  </div>

                  {/* Menu déroulant statut */}
                  {showStatusMenu && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentStatusFilter("");
                          setShowStatusMenu(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                          !currentStatusFilter
                            ? "bg-[#CFF6FD] text-[#0F8096] font-semibold"
                            : "text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        Tous les statuts
                      </button>
                      {statusOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setCurrentStatusFilter(option.value);
                            setShowStatusMenu(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                            currentStatusFilter === option.value
                              ? "bg-[#CFF6FD] text-[#0F8096] font-semibold"
                              : "text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Bouton pour ajouter le filtre */}
                {currentStatusFilter && (
                  <Button
                    onClick={handleAddFilter}
                    variant="outline"
                    size="sm"
                    className="whitespace-nowrap"
                  >
                    Ajouter le filtre
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Filtres actifs */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              {activeFilters.map((filter) => {
                if (renderActiveFilter) {
                  return renderActiveFilter(filter);
                }
                return (
                  <div
                    key={filter.id}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#CFF6FD] text-[#0F8096] rounded-lg text-sm font-medium"
                  >
                    <span>{getFilterDisplayLabel(filter)}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveFilter(filter.id)}
                      className="text-[#0F8096] hover:text-[#0a5d6b] transition-colors cursor-pointer"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bouton réinitialiser les filtres */}
          {showResetButton &&
            onReset &&
            (searchQuery || activeFilters.length > 0) && (
              <div className="flex justify-end">
                <button
                  onClick={onReset}
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Réinitialiser
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
