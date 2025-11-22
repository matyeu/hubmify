"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import { useSidebar } from "../../contexts/SidebarContext";
import CollapseButton from "./CollapseButton";
import UserProfileMenu from "./UserProfileMenu";
import { useState, useEffect, useRef } from "react";
import projectLinks from "../../data/dashboard/projectLinks";

export default function Sidebar() {
  const pathname = usePathname();
  const params = useParams();
  const { collapsed, isMobile, isOpen, toggleCollapse } = useSidebar();
  const [selectedProject, setSelectedProject] = useState<string>("1");
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const projectMenuRef = useRef<HTMLDivElement>(null);
  const projectButtonRef = useRef<HTMLDivElement>(null);

  const projectId = (params?.projectid as string) || selectedProject;

  const userProjects = projectLinks.map((project) => ({
    id: project.href,
    name: project.label,
    logo: project.logo,
  }));

  const currentProject =
    userProjects.find((p) => p.id === selectedProject) || userProjects[0];

  const showText = !collapsed || (isMobile && isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        projectMenuRef.current &&
        !projectMenuRef.current.contains(event.target as Node)
      ) {
        setIsProjectMenuOpen(false);
      }
    };

    if (isProjectMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProjectMenuOpen]);

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === `/dashboard/${projectId}`)
      return true;
    if (path !== "/dashboard") {
      // Construire le chemin complet avec le projectId
      let fullPath: string;
      if (path.startsWith("/dashboard")) {
        // Si le path commence par /dashboard, remplacer par /dashboard/${projectId}
        fullPath = path.replace("/dashboard", `/dashboard/${projectId}`);
      } else {
        // Si le path ne commence pas par /dashboard, ajouter le préfixe
        fullPath = `/dashboard/${projectId}${path}`;
      }
      return pathname === fullPath;
    }
    return false;
  };

  const handleLinkClick = () => {
    if (isMobile && isOpen) {
      toggleCollapse();
    }
  };

  return (
    <>
      {/* Overlay pour mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleCollapse}
        />
      )}
      <aside
        className={`bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-700 ease-out z-50 ${
          isMobile
            ? `fixed top-0 left-0 transition-[width] duration-700 ease-out ${
                isOpen ? "w-full" : "w-0"
              } overflow-hidden`
            : `relative ${collapsed ? "w-20" : "w-64"} ${
                collapsed ? "overflow-visible" : ""
              }`
        } ${isMobile && !isOpen ? "pointer-events-none" : ""}`}
      >
        {!isMobile && <CollapseButton />}
        {/* Logo */}
        <div
          className={`border-b border-gray-200 bg-[#f3f4f6] transition-all duration-700 ease-out ${
            showText ? "p-6" : "p-4"
          } relative`}
        >
          <div
            className={`flex items-center gap-2 transition-all duration-700 ease-out ${
              showText ? "justify-start" : "justify-center"
            }`}
          >
            <Image
              src="/images/logos/logo_dark.png"
              alt="Hubmify logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            {showText && (
              <>
                <span className="text-xl font-semibold text-gray-700 transition-opacity duration-700 ease-out">
                  Hubmify
                </span>
                <Image
                  src="/images/badge_pro.png"
                  alt="Pro badge"
                  width={64}
                  height={64}
                  className="h-16 w-auto -ml-2"
                />
              </>
            )}
          </div>
          {/* Bouton de fermeture sur mobile dans le header */}
          {isMobile && isOpen && (
            <button
              onClick={toggleCollapse}
              className="absolute top-1/2 right-6 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded transition-all cursor-pointer"
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

        {/* Navigation */}
        <nav
          className={`flex-1 p-4 flex flex-col ${
            !isMobile && collapsed && isProjectMenuOpen
              ? "overflow-visible"
              : "overflow-y-auto"
          }`}
        >
          <div className="mb-6">
            {/* Select menu pour les projets */}
            {showText ? (
              <div className="mb-4 px-3 relative" ref={projectMenuRef}>
                {/* Projet sélectionné */}
                <div
                  className="w-full bg-white py-3 px-4 flex gap-3 items-center rounded-lg font-bold border border-gray-200 hover:border-[#0F8096] transition-all duration-200 cursor-pointer shadow-sm"
                  onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
                >
                  {currentProject.logo && (
                    <Image
                      src={currentProject.logo}
                      alt={`${currentProject.name} logo`}
                      width={30}
                      height={30}
                      className="h-7 w-7 object-cover rounded-full border border-gray-200"
                    />
                  )}
                  <span className="text-sm text-gray-700 flex-1 truncate">
                    {currentProject.name}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      isProjectMenuOpen ? "rotate-180" : ""
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

                {/* Menu déroulant */}
                <div
                  className={`absolute top-full left-3 right-3 mt-2 flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 ${
                    isProjectMenuOpen
                      ? "opacity-100 pointer-events-auto translate-y-0"
                      : "opacity-0 pointer-events-none -translate-y-2"
                  }`}
                >
                  <div className="p-2 gap-1 flex flex-col max-h-64 overflow-y-auto">
                    {userProjects.map((project) => (
                      <div
                        key={project.id}
                        onClick={() => {
                          setSelectedProject(project.id);
                          setIsProjectMenuOpen(false);
                        }}
                        className={`w-full p-2 flex gap-3 items-center rounded-lg font-bold transition-all duration-200 cursor-pointer ${
                          selectedProject === project.id
                            ? "bg-[#CFF6FD] text-[#0F8096]"
                            : "bg-white hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        {project.logo && (
                          <Image
                            src={project.logo}
                            alt={`${project.name} logo`}
                            width={30}
                            height={30}
                            className="h-7 w-7 object-cover rounded-full border border-gray-200"
                          />
                        )}
                        <span className="text-sm flex-1 truncate">
                          {project.name}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setIsProjectMenuOpen(false);
                        }}
                        className="w-full p-2 flex gap-3 items-center rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
                      >
                        <div className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 group-hover:border-[#0F8096] transition-colors">
                          <svg
                            className="w-4 h-4 text-gray-500 group-hover:text-[#0F8096] transition-colors"
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
                        </div>
                        <span>Ajouter un projet</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="mb-4 px-3 flex justify-center relative"
                ref={projectMenuRef}
              >
                <div
                  ref={projectButtonRef}
                  className="w-8 h-8 flex-shrink-0 rounded-lg border border-gray-200 flex items-center justify-center bg-[#f3f4f6] cursor-pointer hover:bg-gray-100 transition-colors relative"
                  title={currentProject.name}
                  onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
                >
                  {currentProject.logo && (
                    <Image
                      src={currentProject.logo}
                      alt={`${currentProject.name} logo`}
                      width={20}
                      height={20}
                      className="w-5 h-5 object-cover rounded-full"
                    />
                  )}
                  {/* Menu déroulant pour mode collapsed */}
                  {isProjectMenuOpen && (
                    <div className="absolute left-full top-0 ml-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-[100] min-w-[200px]">
                      <div className="p-2 gap-1 flex flex-col max-h-64 overflow-y-auto">
                        {userProjects.map((project) => (
                          <div
                            key={project.id}
                            onClick={() => {
                              setSelectedProject(project.id);
                              setIsProjectMenuOpen(false);
                            }}
                            className={`w-full p-2 flex gap-3 items-center rounded-lg font-bold transition-all duration-200 cursor-pointer ${
                              selectedProject === project.id
                                ? "bg-[#CFF6FD] text-[#0F8096]"
                                : "bg-white hover:bg-gray-50 text-gray-700"
                            }`}
                          >
                            {project.logo && (
                              <Image
                                src={project.logo}
                                alt={`${project.name} logo`}
                                width={24}
                                height={24}
                                className="h-6 w-6 object-cover rounded-full border border-gray-200"
                              />
                            )}
                            <span className="text-sm flex-1 truncate">
                              {project.name}
                            </span>
                          </div>
                        ))}
                        <div className="border-t border-gray-200 mt-1 pt-1">
                          <button
                            onClick={() => {
                              setIsProjectMenuOpen(false);
                            }}
                            className="w-full p-2 flex gap-3 items-center rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
                          >
                            <div className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 group-hover:border-[#0F8096] transition-colors">
                              <svg
                                className="w-3 h-3 text-gray-500 group-hover:text-[#0F8096] transition-colors"
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
                            </div>
                            <span>Ajouter un projet</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {showText && (
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3 transition-opacity duration-700 ease-out">
                Project
              </p>
            )}
            <ul className="space-y-1">
              <li>
                <Link
                  href={`/dashboard/${projectId}`}
                  onClick={handleLinkClick}
                  className={`flex items-center rounded-lg transition-all duration-700 ease-out ${
                    showText ? "gap-3 px-3 py-2" : "justify-center px-3 py-2"
                  } text-gray-700 hover:bg-gray-100`}
                  title={showText ? undefined : "Dashboard"}
                >
                  <div
                    className={`w-8 h-8 flex-shrink-0 rounded-lg border border-gray-200 flex items-center justify-center ${
                      isActive("/dashboard") ? "bg-[#CFF6FD]" : "bg-[#f3f4f6]"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        isActive("/dashboard")
                          ? "text-[#0F8096]"
                          : "text-gray-700"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  {showText && (
                    <span className="text-sm font-bold transition-opacity duration-700 ease-out">
                      Dashboard
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href={`/dashboard/${projectId}/subscription`}
                  onClick={handleLinkClick}
                  className={`flex items-center rounded-lg transition-all duration-700 ease-out ${
                    showText ? "gap-3 px-3 py-2" : "justify-center px-3 py-2"
                  } text-gray-700 hover:bg-gray-100`}
                  title={showText ? undefined : "Subscription"}
                >
                  <div
                    className={`w-8 h-8 flex-shrink-0 rounded-lg border border-gray-200 flex items-center justify-center ${
                      isActive("/dashboard/subscription")
                        ? "bg-[#CFF6FD]"
                        : "bg-[#f3f4f6]"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        isActive("/dashboard/subscription")
                          ? "text-[#0F8096]"
                          : "text-gray-700"
                      }`}
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
                  {showText && (
                    <span className="text-sm font-bold transition-opacity duration-700 ease-out">
                      Subscription
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href={`/dashboard/${projectId}/analytics`}
                  onClick={handleLinkClick}
                  className={`flex items-center rounded-lg transition-all duration-700 ease-out ${
                    showText ? "gap-3 px-3 py-2" : "justify-center px-3 py-2"
                  } text-gray-700 hover:bg-gray-100`}
                  title={showText ? undefined : "Analytics"}
                >
                  <div
                    className={`w-8 h-8 flex-shrink-0 rounded-lg border border-gray-200 flex items-center justify-center ${
                      isActive("/dashboard/analytics")
                        ? "bg-[#CFF6FD]"
                        : "bg-[#f3f4f6]"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        isActive("/dashboard/analytics")
                          ? "text-[#0F8096]"
                          : "text-gray-700"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  {showText && (
                    <span className="text-sm font-bold transition-opacity duration-700 ease-out">
                      Analytics
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href={`/dashboard/${projectId}/settings`}
                  onClick={handleLinkClick}
                  className={`flex items-center rounded-lg transition-all duration-700 ease-out ${
                    showText ? "gap-3 px-3 py-2" : "justify-center px-3 py-2"
                  } text-gray-700 hover:bg-gray-100`}
                  title={showText ? undefined : "Settings"}
                >
                  <div
                    className={`w-8 h-8 flex-shrink-0 rounded-lg border border-gray-200 flex items-center justify-center ${
                      isActive("/settings") || isActive("/dashboard/settings")
                        ? "bg-[#CFF6FD]"
                        : "bg-[#f3f4f6]"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        isActive("/settings") || isActive("/dashboard/settings")
                          ? "text-[#0F8096]"
                          : "text-gray-700"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  {showText && (
                    <span className="text-sm font-bold transition-opacity duration-700 ease-out">
                      Settings
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
          {/* Personalisation section */}
          <div className="mb-6">
            {showText && (
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                Personalisation
              </p>
            )}
            <ul className="space-y-1">
              <li>
                <Link
                  href={`/dashboard/${projectId}/pages`}
                  onClick={handleLinkClick}
                  className={`flex items-center rounded-lg transition-all duration-700 ease-out ${
                    showText ? "gap-3 px-3 py-2" : "justify-center px-3 py-2"
                  } text-gray-700 hover:bg-gray-100`}
                  title={showText ? undefined : "Pages"}
                >
                  <div
                    className={`w-8 h-8 flex-shrink-0 rounded-lg border border-gray-200 flex items-center justify-center ${
                      isActive("/dashboard/pages")
                        ? "bg-[#CFF6FD]"
                        : "bg-[#f3f4f6]"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        isActive("/pages") || isActive("/dashboard/pages")
                          ? "text-[#0F8096]"
                          : "text-gray-700"
                      }`}
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
                  {showText && (
                    <span className="text-sm font-bold transition-opacity duration-700 ease-out">
                      Pages
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href={`/dashboard/${projectId}/modules`}
                  onClick={handleLinkClick}
                  className={`flex items-center rounded-lg transition-all duration-700 ease-out ${
                    showText ? "gap-3 px-3 py-2" : "justify-center px-3 py-2"
                  } text-gray-700 hover:bg-gray-100`}
                  title={showText ? undefined : "Modules"}
                >
                  <div
                    className={`w-8 h-8 flex-shrink-0 rounded-lg border border-gray-200 flex items-center justify-center ${
                      isActive("/dashboard/modules")
                        ? "bg-[#CFF6FD]"
                        : "bg-[#f3f4f6]"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        isActive("/dashboard/modules")
                          ? "text-[#0F8096]"
                          : "text-gray-700"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                      />
                    </svg>
                  </div>
                  {showText && (
                    <span className="text-sm font-bold transition-opacity duration-700 ease-out">
                      Modules
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>

          {/* Beta message and Account section */}
          <div className="mt-auto">
            {/* Bouton Upgrade to Pro sur mobile */}
            {isMobile && isOpen && (
              <Link
                href={`/dashboard/${projectId}/subscription`}
                onClick={handleLinkClick}
                className="mb-12 mx-3 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                Upgrade to Pro
                <Image
                  src="/images/icon_pro.svg"
                  alt="Pro badge"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </Link>
            )}
            {showText && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 pt-3 pb-2 mb-4">
                <p className="text-xs text-blue-900 leading-relaxed mb-0">
                  This is a beta version, some features may not work as
                  expected.{" "}
                  <a href="#" className="underline font-medium">
                    Get help.
                  </a>
                </p>
              </div>
            )}

            {/* Account section */}
            {showText && (
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0 px-3">
                Account
              </p>
            )}
            <ul className="space-y-0.5">
              <li>
                <Link
                  href={`/dashboard/${projectId}/privacy`}
                  onClick={handleLinkClick}
                  className={`flex items-center rounded-lg transition-all duration-700 ease-out ${
                    showText ? "gap-3 px-3 py-2" : "justify-center px-3 py-2"
                  } text-gray-700 hover:bg-gray-100`}
                  title={showText ? undefined : "Privacy & Security"}
                >
                  <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-[#f3f4f6] border border-gray-200 flex items-center justify-center">
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  {showText && (
                    <span className="text-sm font-bold transition-opacity duration-700 ease-out">
                      Privacy & Security
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href={`/dashboard/${projectId}/settings`}
                  onClick={handleLinkClick}
                  className={`flex items-center rounded-lg transition-all duration-700 ease-out ${
                    showText ? "gap-3 px-3 py-2" : "justify-center px-3 py-2"
                  } text-gray-700 hover:bg-gray-100`}
                  title={showText ? undefined : "Settings"}
                >
                  <div
                    className={`w-8 h-8 flex-shrink-0 rounded-lg border border-gray-200 flex items-center justify-center ${
                      isActive("/settings") || isActive("/dashboard/settings")
                        ? "bg-[#CFF6FD]"
                        : "bg-[#f3f4f6]"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        isActive("/settings") || isActive("/dashboard/settings")
                          ? "text-[#0F8096]"
                          : "text-gray-700"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  {showText && (
                    <span className="text-sm font-bold transition-opacity duration-700 ease-out">
                      Settings
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleLinkClick}
                  className={`flex items-center rounded-lg transition-all duration-700 ease-out ${
                    showText ? "gap-3 px-3 py-2" : "justify-center px-3 py-2"
                  } text-gray-700 hover:bg-gray-100`}
                  title={showText ? undefined : "Logout"}
                >
                  <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-[#f3f4f6] border border-gray-200 flex items-center justify-center">
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </div>
                  {showText && (
                    <span className="text-sm font-bold transition-opacity duration-700 ease-out">
                      Logout
                    </span>
                  )}
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Profile */}
        <div className="border-t border-gray-200 bg-[#f3f4f6] p-4">
          <UserProfileMenu
            userName="Matyeu"
            variant="sidebar"
            showText={isMobile && isOpen ? true : showText}
          />
        </div>
      </aside>
    </>
  );
}
