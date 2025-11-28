"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "../../../components/dashboard/Header";
import Sidebar from "../../../components/dashboard/Sidebar";
import Footer from "../../../components/dashboard/Footer";
import Button from "../../../components/Button";
import Modal from "../../../components/Modals/Modal";
import Badge from "../../../components/Badge";
import Table from "../../../components/dashboard/Table/Table";
import Filter, {
  FilterOption,
} from "../../../components/dashboard/Table/Filter";
import { useSidebar } from "../../../contexts/SidebarContext";

interface Page {
  id: string;
  name: string;
  slug: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  status: "published" | "disabled" | "draft";
}

export default function PagesPage() {
  const { isMobile, isOpen, toggleCollapse } = useSidebar();
  const params = useParams();
  const projectId = params?.projectid as string;

  const [pages, setPages] = useState<Page[]>([
    {
      id: "1",
      name: "Page d'accueil",
      slug: "home",
      author: "Matyeu",
      createdAt: "2025-01-15",
      updatedAt: "2025-01-20",
      status: "published",
    },
    {
      id: "2",
      name: "À propos",
      slug: "about",
      author: "Matyeu",
      createdAt: "2025-01-16",
      updatedAt: "2025-01-18",
      status: "draft",
    },
    {
      id: "3",
      name: "Contact",
      slug: "contact",
      author: "Nawre",
      createdAt: "2025-01-16",
      updatedAt: "2025-01-18",
      status: "disabled",
    },
    {
      id: "4",
      name: "Sexcam",
      slug: "sexcam",
      author: "Shap",
      createdAt: "2025-01-16",
      updatedAt: "2025-01-18",
      status: "published",
    },
    {
      id: "5",
      name: "Services",
      slug: "services",
      author: "Matyeu",
      createdAt: "2025-01-17",
      updatedAt: "2025-01-19",
      status: "published",
    },
    {
      id: "6",
      name: "Portfolio",
      slug: "portfolio",
      author: "Nawre",
      createdAt: "2025-01-18",
      updatedAt: "2025-01-20",
      status: "draft",
    },
    {
      id: "7",
      name: "Blog",
      slug: "blog",
      author: "Shap",
      createdAt: "2025-01-19",
      updatedAt: "2025-01-21",
      status: "published",
    },
    {
      id: "8",
      name: "FAQ",
      slug: "faq",
      author: "Matyeu",
      createdAt: "2025-01-20",
      updatedAt: "2025-01-22",
      status: "published",
    },
    {
      id: "9",
      name: "Tarifs",
      slug: "pricing",
      author: "Nawre",
      createdAt: "2025-01-21",
      updatedAt: "2025-01-23",
      status: "disabled",
    },
    {
      id: "10",
      name: "Témoignages",
      slug: "testimonials",
      author: "Shap",
      createdAt: "2025-01-22",
      updatedAt: "2025-01-24",
      status: "published",
    },
    {
      id: "11",
      name: "Équipe",
      slug: "team",
      author: "Matyeu",
      createdAt: "2025-01-23",
      updatedAt: "2025-01-25",
      status: "draft",
    },
    {
      id: "12",
      name: "Partenaires",
      slug: "partners",
      author: "Nawre",
      createdAt: "2025-01-24",
      updatedAt: "2025-01-26",
      status: "published",
    },
    {
      id: "13",
      name: "Actualités",
      slug: "news",
      author: "Shap",
      createdAt: "2025-01-25",
      updatedAt: "2025-01-27",
      status: "published",
    },
    {
      id: "14",
      name: "Mentions légales",
      slug: "legal",
      author: "Matyeu",
      createdAt: "2025-01-26",
      updatedAt: "2025-01-28",
      status: "disabled",
    },
  ]);

  const [pageToDelete, setPageToDelete] = useState<Page | null>(null);
  const [animatingPageId, setAnimatingPageId] = useState<string | null>(null);
  const [deletedPages, setDeletedPages] = useState<Page[]>([]);
  const [showTrashModal, setShowTrashModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);
  const pageRefs = useRef<{ [key: string]: HTMLTableRowElement | null }>({});
  const trashRef = useRef<HTMLDivElement | null>(null);

  // Liste unique des auteurs
  const authors = Array.from(new Set(pages.map((page) => page.author)));

  // Dates disponibles
  const dates = Array.from(new Set(pages.map((page) => page.createdAt)));

  // Options de type de filtre
  const filterTypeOptions = [
    { label: "Auteur", value: "Auteur" },
    { label: "Date", value: "Date" },
    { label: "Statut", value: "Statut" },
  ];

  // Options de statut
  const statusOptions = [
    { value: "published", label: "Publiée" },
    { value: "disabled", label: "Désactivée" },
    { value: "draft", label: "Brouillon" },
  ];

  // Options de filtre selon le type
  const getFilterValueOptions = (filterType: string) => {
    if (filterType === "author" || filterType === "Auteur") {
      return authors;
    } else if (filterType === "date" || filterType === "Date") {
      return dates;
    }
    return [];
  };

  // Fonction pour ajouter un filtre
  const handleAddFilter = (filter: Omit<FilterOption, "id">) => {
    setActiveFilters((prev) => [
      ...prev,
      {
        ...filter,
        id: `${filter.type}-${Date.now()}`,
      },
    ]);
  };

  // Fonction pour supprimer un filtre
  const handleRemoveFilter = (filterId: string) => {
    setActiveFilters((prev) => prev.filter((f) => f.id !== filterId));
  };

  // Fonction pour obtenir le label d'un filtre
  const getFilterLabel = (filter: FilterOption): string => {
    if (filter.type === "Statut") {
      const statusOption = statusOptions.find(
        (opt) => opt.value === filter.value
      );
      return statusOption ? statusOption.label : filter.value;
    }
    return filter.value;
  };

  // Fonction pour diviser les valeurs par point-virgule et vérifie si au moins une correspond
  const matchesAnyValue = (
    value: string,
    searchTerms: string,
    matchFn: (val: string, term: string) => boolean
  ): boolean => {
    const terms = searchTerms
      .split(";")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    return terms.some((term) => matchFn(value, term));
  };

  const filteredPages = pages.filter((page) => {
    // Filtre par recherche (avec support des valeurs multiples)
    const matchesSearch =
      !searchQuery ||
      matchesAnyValue(
        page.name + " " + page.slug + " " + page.author,
        searchQuery,
        (val, term) => val.toLowerCase().includes(term.toLowerCase())
      );

    // Appliquer tous les filtres actifs
    let matchesFilter = true;
    for (const filter of activeFilters) {
      if (filter.type === "Auteur") {
        const authorMatch = matchesAnyValue(
          page.author,
          filter.value,
          (val, term) => val.toLowerCase().includes(term.toLowerCase())
        );
        matchesFilter = matchesFilter && authorMatch;
      } else if (filter.type === "Date") {
        const dateTerms = filter.value
          .split(";")
          .map((t) => t.trim())
          .filter((t) => t.length > 0);
        const dateMatch = dateTerms.some((term) => {
          return page.createdAt.includes(term);
        });
        matchesFilter = matchesFilter && dateMatch;
      } else if (filter.type === "Statut") {
        matchesFilter = matchesFilter && page.status === filter.value;
      }
    }

    return matchesSearch && matchesFilter;
  });

  // Définition des colonnes du tableau
  const columns = [
    {
      key: "name",
      header: "Nom",
      align: "left" as const,
      render: (page: Page) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#CFF6FD] flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-[#0F8096]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-gray-900">{page.name}</div>
            <Badge variant={page.status}>
              {page.status === "published"
                ? "Publiée"
                : page.status === "disabled"
                ? "Désactivée"
                : "Brouillon"}
            </Badge>
          </div>
        </div>
      ),
    },
    {
      key: "slug",
      header: "Slug",
      align: "left" as const,
      render: (page: Page) => (
        <code className="text-sm text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
          /{page.slug}
        </code>
      ),
    },
    {
      key: "author",
      header: "Auteur",
      align: "left" as const,
      render: (page: Page) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#004AAD] to-[#E385EC] flex items-center justify-center text-white text-xs font-semibold">
            {page.author.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm text-gray-900">{page.author}</span>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Créée le",
      align: "left" as const,
      render: (page: Page) => (
        <span className="text-sm text-gray-600">{page.createdAt}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right" as const,
      render: (page: Page) => (
        <div className="flex items-center justify-end gap-2">
          <a
            href={`/${page.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg border border-gray-200 bg-[#f3f4f6] flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer group"
            title="Visualiser"
          >
            <svg
              className="w-5 h-5 text-gray-700 group-hover:text-[#0F8096] transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </a>
          <Link
            href={`/dashboard/${projectId}/pages/${page.id}/board`}
            className="w-8 h-8 rounded-lg border border-gray-200 bg-[#f3f4f6] flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer group"
            title="Modifier"
          >
            <svg
              className="w-5 h-5 text-gray-700 group-hover:text-[#0F8096] transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Link>
          <button
            onClick={() => handleDeletePage(page.id)}
            className="w-8 h-8 rounded-lg border border-gray-200 bg-[#f3f4f6] flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer group"
            title="Supprimer"
          >
            <svg
              className="w-5 h-5 text-gray-700 group-hover:text-red-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  // Réinitialiser la page actuelle quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilters]);

  const handleDeletePage = (pageId: string) => {
    const page = pages.find((p) => p.id === pageId);
    if (page) {
      setPageToDelete(page);
    }
  };

  const confirmDelete = () => {
    if (pageToDelete) {
      setAnimatingPageId(pageToDelete.id);
      setPageToDelete(null);
    }
  };

  useEffect(() => {
    if (animatingPageId) {
      const pageElement = pageRefs.current[animatingPageId];
      const trashElement = trashRef.current;

      if (pageElement && trashElement) {
        const pageRect = pageElement.getBoundingClientRect();
        const trashRect = trashElement.getBoundingClientRect();

        const deltaX =
          trashRect.left +
          trashRect.width / 2 -
          (pageRect.left + pageRect.width / 2);
        const deltaY =
          trashRect.top +
          trashRect.height / 2 -
          (pageRect.top + pageRect.height / 2);

        pageElement.style.setProperty("--delta-x", `${deltaX}px`);
        pageElement.style.setProperty("--delta-y", `${deltaY}px`);
        pageElement.classList.add("animate-to-trash");

        setTimeout(() => {
          const deletedPage = pages.find((page) => page.id === animatingPageId);
          if (deletedPage) {
            setDeletedPages((prev) => [...prev, deletedPage]);
          }
          setPages((prev) =>
            prev.filter((page) => page.id !== animatingPageId)
          );
          setAnimatingPageId(null);
        }, 600);
      }
    }
  }, [animatingPageId]);

  return (
    <>
      {isMobile && !isOpen && (
        <Button
          onClick={toggleCollapse}
          variant="outline"
          size="sm"
          className="fixed top-4 left-4 z-[100] w-10 h-10 p-0 md:hidden"
          icon={
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          }
        />
      )}
      <div className="flex min-h-screen bg-gray-50">
        {!isMobile && <Sidebar />}

        <main className="flex-1 overflow-y-auto relative font-[var(--font-inter)] flex flex-col min-h-screen">
          <Header
            title="Pages"
            subtitle="Manage your Hubmify project pages."
            url="www.hubmify.com/matyeu"
          />

          <div className="p-6 flex-1">
            {pages.length > 0 && (
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    My pages
                  </h2>
                  <p className="text-sm text-gray-600">
                    {pages.length} {pages.length > 1 ? "pages" : "page"} created
                    {pages.length > 1 ? "s" : ""}
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  icon={
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  }
                  iconPosition="left"
                >
                  Créer une page
                </Button>
              </div>
            )}

            {/* Barre de recherche et filtres */}
            {pages.length > 0 && (
              <div className="mb-6">
                <Filter
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  activeFilters={activeFilters}
                  onAddFilter={handleAddFilter}
                  onRemoveFilter={handleRemoveFilter}
                  filterTypeOptions={filterTypeOptions}
                  getFilterValueOptions={getFilterValueOptions}
                  statusOptions={statusOptions}
                  resultCount={filteredPages.length}
                  showResultCount={true}
                  searchPlaceholder="Rechercher une page..."
                  filterTypePlaceholder="Types de filtre"
                  getFilterLabel={getFilterLabel}
                  renderActiveFilter={(filter) => (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#CFF6FD] text-[#0F8096] rounded-lg text-sm font-medium">
                      <span>{getFilterLabel(filter)}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFilter(filter.id)}
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
                  )}
                  onReset={() => {
                    setSearchQuery("");
                    setActiveFilters([]);
                  }}
                  showResetButton={true}
                />
              </div>
            )}

            {/* Liste des pages */}
            {pages.length === 0 ? (
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucune page créée
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Commencez par créer votre première page pour votre projet.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  icon={
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  }
                  iconPosition="left"
                >
                  Créer une page
                </Button>
              </div>
            ) : filteredPages.length === 0 ? (
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
                  Aucune page trouvée
                </h3>
                <p className="text-sm text-gray-600">
                  Aucune page ne correspond à votre recherche.
                </p>
              </div>
            ) : (
              <Table
                data={filteredPages}
                columns={columns}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                getRowKey={(page) => page.id}
                getRowRef={(page) => (el) => {
                  pageRefs.current[page.id] = el;
                }}
                getRowClassName={(page) =>
                  animatingPageId === page.id ? "animate-to-trash" : ""
                }
                emptyMessage={{
                  title: "Aucune page trouvée",
                  description: "Aucune page ne correspond à votre recherche.",
                }}
              />
            )}

            {/* Corbeille */}
            {pages.length > 0 && (
              <div className="mt-6 flex justify-end">
                <div
                  ref={trashRef}
                  onClick={() => setShowTrashModal(true)}
                  className={`w-12 h-12 rounded-lg border border-gray-200 bg-[#f3f4f6] flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer group ${
                    animatingPageId ? "animate-pulse scale-110" : ""
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-gray-700 group-hover:text-red-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
          <Footer />
        </main>
      </div>
      {isMobile && <Sidebar />}

      {/* Modal de confirmation de suppression */}
      <Modal
        isOpen={!!pageToDelete}
        onClose={() => setPageToDelete(null)}
        title="Supprimer la page"
        footer={
          <>
            <Button
              onClick={() => setPageToDelete(null)}
              variant="secondary"
              size="md"
            >
              Annuler
            </Button>
            <Button onClick={confirmDelete} variant="danger" size="md">
              Supprimer
            </Button>
          </>
        }
      >
        <p>
          Êtes-vous sûr de vouloir supprimer la page{" "}
          <span className="font-semibold text-gray-900">
            {pageToDelete?.name}
          </span>
          ?
        </p>
      </Modal>

      {/* Modal de la corbeille */}
      <Modal
        isOpen={showTrashModal}
        onClose={() => setShowTrashModal(false)}
        title="Pages supprimées"
        footer={
          <Button
            onClick={() => setShowTrashModal(false)}
            variant="secondary"
            size="md"
          >
            Fermer
          </Button>
        }
      >
        {deletedPages.length === 0 ? (
          <div className="text-center py-8">
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <p className="text-gray-600">Aucune page supprimée</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {deletedPages.map((page) => (
              <div
                key={page.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#CFF6FD] flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-[#0F8096]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {page.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Supprimée le {new Date().toLocaleDateString("fr-FR")} par{" "}
                      {page.author}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setPages((prev) => [...prev, page]);
                    setDeletedPages((prev) =>
                      prev.filter((p) => p.id !== page.id)
                    );
                  }}
                  variant="outline"
                  size="sm"
                >
                  Restaurer
                </Button>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
}
