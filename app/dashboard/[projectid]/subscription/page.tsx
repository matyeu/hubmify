"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../../../components/dashboard/Header";
import Sidebar from "../../../components/dashboard/Sidebar";
import Footer from "../../../components/dashboard/Footer";
import Modal from "../../../components/dashboard/Modal";
import ModuleCard from "../../../components/dashboard/ModuleCard";
import Button from "../../../components/Button";
import { useSidebar } from "../../../contexts/SidebarContext";
import { useParams } from "next/navigation";
import { Module, getModules } from "../../../data/dashboard/moduleLinks";
import projectLinks from "../../../data/dashboard/projectLinks";

interface PaidModule extends Module {
  purchasedAt: string;
  projectId: string;
}

export default function SubscriptionPage() {
  const { isMobile, isOpen, toggleCollapse } = useSidebar();
  const params = useParams();
  const projectId = (params?.projectid as string) || "1";

  const allModules = getModules();
  const [paidModules, setPaidModules] = useState<PaidModule[]>(
    allModules
      .filter((m) => m.isPremium)
      .map((module) => ({
        ...module,
        purchasedAt: new Date().toISOString(),
        projectId: projectId,
      }))
  );

  const [transferringModuleId, setTransferringModuleId] = useState<
    string | null
  >(null);
  const [confirmationModal, setConfirmationModal] = useState<{
    moduleId: string;
    targetProjectId: string;
    moduleName: string;
    projectName: string;
  } | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isTransferButton = target.closest("[data-transfer-button]");
      const isTransferMenu = target.closest("[data-transfer-menu]");

      if (!isTransferButton && !isTransferMenu) {
        setTransferringModuleId(null);
      }
    };

    if (transferringModuleId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [transferringModuleId]);

  const toggleModule = (id: string) => {
    setPaidModules((prev) =>
      prev.map((module) =>
        module.id === id ? { ...module, enabled: !module.enabled } : module
      )
    );
  };

  const handleTransferClick = (moduleId: string, targetProjectId: string) => {
    const module = paidModules.find((m) => m.id === moduleId);
    const project = projectLinks.find((p) => p.href === targetProjectId);
    if (module && project) {
      setConfirmationModal({
        moduleId,
        targetProjectId,
        moduleName: module.name,
        projectName: project.label,
      });
      setTransferringModuleId(null);
    }
  };

  const confirmTransfer = () => {
    if (confirmationModal) {
      setPaidModules((prev) =>
        prev.map((module) =>
          module.id === confirmationModal.moduleId
            ? { ...module, projectId: confirmationModal.targetProjectId }
            : module
        )
      );
      setConfirmationModal(null);
    }
  };

  const availableProjects = projectLinks.filter(
    (project) => project.href !== projectId
  );

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
            title="Subscription"
            subtitle="Manage your paid modules for this project."
            url="www.hubmify.com/matyeu"
          />

          <div className="p-6 space-y-6 flex-1">
            {paidModules.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No paid modules
                </h3>
                <p className="text-sm text-gray-600">
                  You don't have any paid modules for this project.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Paid modules
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {paidModules.length} module
                      {paidModules.length > 1 ? "s" : ""} paid
                      {paidModules.length > 1 ? "s" : ""} for this project
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-5">
                  {paidModules.map((module) => (
                    <ModuleCard
                      key={module.id}
                      id={module.id}
                      name={module.name}
                      description={module.description}
                      icon={module.icon}
                      isPro={module.isPro}
                      isPremium={module.isPremium}
                      purchasedAt={module.purchasedAt}
                      onClick={() =>
                        setTransferringModuleId(
                          transferringModuleId === module.id ? null : module.id
                        )
                      }
                      actionButton={
                        <div className="relative">
                          <div
                            data-transfer-button
                            onClick={(e) => {
                              e.stopPropagation();
                              setTransferringModuleId(
                                transferringModuleId === module.id
                                  ? null
                                  : module.id
                              );
                            }}
                            className="mt-auto w-fit rounded-[10px] flex items-center justify-center gap-2 overflow-hidden relative cursor-pointer text-gray-700"
                          >
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
                                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                />
                              </svg>
                              <span className="text-sm font-medium">
                                Transférer
                              </span>
                            </span>
                            <span className="flex items-center gap-2 px-4 py-2 bg-[#0F8096] text-white absolute top-full group-hover:top-0 transition-all duration-200">
                              <span className="text-sm font-medium">
                                Transférer
                              </span>
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
                          </div>

                          {transferringModuleId === module.id && (
                            <div
                              data-transfer-menu
                              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
                            >
                              <div className="p-2 max-h-48 overflow-y-auto">
                                {availableProjects.length === 0 ? (
                                  <div className="px-3 py-2 text-sm text-gray-500 text-center">
                                    Aucun autre projet disponible
                                  </div>
                                ) : (
                                  availableProjects.map((project) => (
                                    <Button
                                      key={project.href}
                                      onClick={(e) => {
                                        if (e) {
                                          e.stopPropagation();
                                        }
                                        handleTransferClick(
                                          module.id,
                                          project.href
                                        );
                                      }}
                                      variant="ghost"
                                      size="sm"
                                      className="w-full justify-start text-left"
                                      icon={
                                        project.logo ? (
                                          <Image
                                            src={project.logo}
                                            alt={project.label}
                                            width={24}
                                            height={24}
                                            className="w-6 h-6 rounded-full object-cover"
                                          />
                                        ) : undefined
                                      }
                                      iconPosition="left"
                                    >
                                      {project.label}
                                    </Button>
                                  ))
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <Footer />
        </main>
      </div>
      {isMobile && <Sidebar />}

      {/* Modal de confirmation */}
      <Modal
        isOpen={!!confirmationModal}
        onClose={() => setConfirmationModal(null)}
        title="Confirmer le transfert"
        footer={
          <>
            <Button
              onClick={() => setConfirmationModal(null)}
              variant="secondary"
              size="md"
            >
              Annuler
            </Button>
            <Button
              onClick={confirmTransfer}
              variant="primary"
              size="md"
              className="!bg-[#0F8096] hover:!bg-[#0d6d7d] text-white"
            >
              Confirmer
            </Button>
          </>
        }
      >
        <p>
          Êtes-vous sûr de vouloir transférer le module{" "}
          <span className="font-semibold text-gray-900">
            {confirmationModal?.moduleName}
          </span>{" "}
          vers le projet{" "}
          <span className="font-semibold text-gray-900">
            {confirmationModal?.projectName}
          </span>
          ?
        </p>
      </Modal>
    </>
  );
}
