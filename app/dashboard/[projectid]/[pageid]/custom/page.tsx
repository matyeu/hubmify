"use client";

import { useState } from "react";
import Sidebar from "../../../../components/dashboard/Sidebar";
import Button from "../../../../components/Button";
import { useSidebar } from "../../../../contexts/SidebarContext";
import ModuleConfigBox from "../../../../components/dashboard/Modules/ModuleContainer";
import ModuleIcon from "../../../../components/dashboard/Modules/ModuleIcon";

export default function CustomPage() {
  const { isMobile, isOpen, toggleCollapse } = useSidebar();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

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
          <div className="flex-1"></div>

          {/* Box en bas de la page */}
          <div className="p-6">
            {/* Bannière de notification mobile */}
            <div className="mb-3 md:hidden">
              <div className="bg-white rounded-2xl border border-gray-200 px-4 py-3 flex items-center justify-between gap-4 w-full">
                <span className="text-sm text-gray-900 font-medium">
                  You have unsaved changes
                </span>
                <button className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer">
                  Save
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-end justify-between">
              <div className="flex flex-col gap-3 w-full md:max-w-[460px] md:w-[460px]">
                {/* Box modules */}
                {selectedModule && (
                  <ModuleConfigBox
                    moduleType={selectedModule}
                    onClose={() => setSelectedModule(null)}
                  />
                )}

                {/* Box gauche - Modules */}
                <div className="bg-white rounded-2xl border border-gray-200 p-3 flex items-center gap-2 flex-nowrap overflow-x-auto w-full">
                  {/* Icône palette rose */}
                  <ModuleIcon
                    moduleId="theme"
                    selectedModule={selectedModule}
                    onSelect={setSelectedModule}
                    activeBackgroundColor="#F24A8D"
                    activeIconColor="#FFFFFF"
                    inactiveIconColor="#F24A8D"
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
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        />
                      </svg>
                    }
                  />

                  {/* Séparateur */}
                  <div className="w-px h-8 flex-shrink-0 bg-gray-300"></div>

                  {/* Icône paysage */}
                  <ModuleIcon
                    moduleId="customContent"
                    selectedModule={selectedModule}
                    onSelect={setSelectedModule}
                    activeBackgroundColor="#000000"
                    activeIconColor="#FFFFFF"
                    inactiveIconColor="#374151"
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
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    }
                  />

                  {/* Icône liens */}
                  <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-white shadow flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
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
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>

                  {/* Icône rectangle avec points */}
                  <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-white shadow flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>

                  {/* Séparateur */}
                  <div className="w-px h-8 flex-shrink-0 bg-gray-300"></div>

                  {/* Logo Discord */}
                  <ModuleIcon
                    moduleId="discord"
                    selectedModule={selectedModule}
                    onSelect={setSelectedModule}
                    activeBackgroundColor="#334EDD"
                    activeIconColor="#FFFFFF"
                    inactiveIconColor="#334EDD"
                    icon={
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                    }
                  />

                  {/* Logo GitHub */}
                  <ModuleIcon
                    moduleId="github"
                    selectedModule={selectedModule}
                    onSelect={setSelectedModule}
                    activeBackgroundColor="#000000"
                    activeIconColor="#FFFFFF"
                    inactiveIconColor="#000000"
                    icon={
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>

              {/* Conteneur pour la bannière et la boîte View page */}
              <div className="hidden md:flex flex-col gap-3 items-end">
                {/* Bannière de notification */}
                <div className="bg-white rounded-2xl border border-gray-200 px-4 py-3 flex items-center justify-between gap-4 w-fit">
                  <span className="text-sm text-gray-900 font-medium">
                    You have unsaved changes
                  </span>
                  <button className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer">
                    Save
                  </button>
                </div>

                {/* Box droite - View profile  */}
                <div className="bg-white rounded-2xl border border-gray-200 p-3 flex items-center gap-2 w-fit">
                  {/* Bouton laptop */}
                  <button className="w-10 h-10 rounded-lg bg-black flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </button>

                  {/* Bouton mobile */}
                  <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
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
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </button>

                  {/* Bouton View profile */}
                  <button className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer">
                    View page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {isMobile && <Sidebar />}
    </>
  );
}
