"use client";

import { useState } from "react";
import Header from "../../../components/dashboard/Header";
import Sidebar from "../../../components/dashboard/Sidebar";
import Footer from "../../../components/dashboard/Footer";
import ModuleCard from "../../../components/dashboard/ModuleCard";
import Button from "../../../components/Button";
import { useSidebar } from "../../../contexts/SidebarContext";
import {
  Module,
  getModules,
  getModuleSections,
} from "../../../data/dashboard/moduleLinks";

export default function ModulesPage() {
  const { isMobile, isOpen, toggleCollapse } = useSidebar();

  const allModules = getModules();
  const [modules, setModules] = useState<Module[]>(allModules);
  const sections = getModuleSections(modules);

  const toggleModule = (id: string) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === id ? { ...module, enabled: !module.enabled } : module
      )
    );
  };

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
            title="Modules"
            subtitle="Activate and manage the modules in your Hubmify profile."
            url="www.hubmify.com/matyeu"
          />

          <div className="p-6 space-y-8 flex-1">
            {sections.map((section) => (
              <div key={section.id} className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </div>
                <div className="flex flex-wrap gap-5">
                  {section.modules.map((module) => (
                    <ModuleCard
                      key={module.id}
                      id={module.id}
                      name={module.name}
                      description={module.description}
                      icon={module.icon}
                      isPro={module.isPro}
                      isPremium={module.isPremium}
                      isNew={module.isNew}
                      enabled={module.enabled}
                      onClick={() => toggleModule(module.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Footer />
        </main>
      </div>
      {isMobile && <Sidebar />}
    </>
  );
}
