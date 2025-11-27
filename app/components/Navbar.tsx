"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Button from "./Button";

// Logo Component
function LogoIcon({
  className,
  scrolled,
}: {
  className?: string;
  scrolled?: boolean;
}) {
  return (
    <Image
      src={
        scrolled
          ? "/images/logos/logo_dark-h.png"
          : "/images/logos/logo_white-h.png"
      }
      alt="Logo"
      width={50}
      height={42}
      className={className}
    />
  );
}

// User Menu Component
function UserMenu({
  className,
  isMini,
  user,
  onLogout,
}: {
  className?: string;
  isMini?: boolean;
  user?: { username?: string; avatar?: string; isPro?: boolean; role?: string };
  onLogout?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!user?.username) return null;

  return (
    <div ref={menuRef} className={clsx(className, "relative")}>
      <div
        className="flex items-center justify-end gap-3 relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p
          className={clsx(
            "text-white font-sans font-semibold text-base flex items-center justify-end gap-2 transition-all duration-200",
            isMini && "opacity-0 pointer-events-none"
          )}
        >
          {user.isPro && (
            <Image
              src="/images/badge_pro.png"
              alt="Pro"
              width={20}
              height={20}
              className="w-5"
            />
          )}
          {user.username}
        </p>
        {user.avatar && (
          <Image
            src={user.avatar}
            alt="User profile picture"
            width={44}
            height={44}
            className="rounded-full border-2 border-white w-12 h-12 min-w-12 min-h-12"
          />
        )}
      </div>
      <div
        className={clsx(
          "absolute max-w-xs w-[200px] right-0 top-12 transition-all duration-200",
          !isOpen && "pointer-events-none opacity-0 -translate-y-1/2"
        )}
      >
        <div className="rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 pt-5 pb-3 px-2">
          <p className="text-dark-100/70 text-[10px] font-sans font-semibold uppercase tracking-widest px-3">
            Navigation
          </p>
          <ul className="mt-1 grid grid-cols-1">
            {user.role === "ADMIN" && (
              <li>
                <Link
                  href="/dashboard"
                  className="font-sans tracking-wider text-sm text-dark-100 font-semibold px-3 hover:bg-white/20 py-2 rounded-lg cursor-pointer block"
                >
                  Admin dashboard
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/profile"
                className="font-sans tracking-wider text-sm text-dark-100 font-semibold px-3 hover:bg-white/20 py-2 rounded-lg cursor-pointer block"
              >
                My profile
              </Link>
            </li>
            <li>
              <Link
                href="/profile/analytics"
                className="font-sans tracking-wider text-sm text-dark-100 font-semibold px-3 hover:bg-white/20 py-2 rounded-lg cursor-pointer block"
              >
                Analytics
              </Link>
            </li>
            <li>
              <Link
                href="/profile/settings"
                className="font-sans tracking-wider text-sm text-dark-100 font-semibold px-3 hover:bg-white/20 py-2 rounded-lg cursor-pointer block"
              >
                Settings
              </Link>
            </li>
            <li
              className="font-sans tracking-wider text-sm text-dark-100 font-semibold px-3 hover:bg-white/20 py-2 rounded-lg cursor-pointer"
              onClick={onLogout}
            >
              Log Out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Mobile Menu Component
function MobileMenu({
  isOpen,
  onClose,
  user,
  onLogout,
  scrolled,
}: {
  isOpen: boolean;
  onClose: () => void;
  user?: { _id?: string; username?: string; avatar?: string };
  onLogout?: () => void;
  scrolled: boolean;
}) {
  return (
    <>
      {/* Overlay avec animation */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/70 backdrop-blur-md z-20 transition-all duration-300 ease-out",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Menu latéral avec slide animation */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-b from-dark-700/95 to-black/95 backdrop-blur-xl z-30 shadow-2xl transition-transform duration-300 ease-out flex flex-col p-6 sm:p-8",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header avec bouton fermer */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
          <h2 className="text-white font-bold text-xl font-title">Hubmify</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 active:scale-95"
            aria-label="Fermer le menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Navigation principale */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <Link
                href="/pricing"
                onClick={onClose}
                className="group relative block px-4 py-4 rounded-xl text-white font-semibold text-2xl transition-all duration-200 hover:bg-white/10 hover:translate-x-2 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors"></span>
                  Pro Subscription
                </span>
              </Link>
            </li>

            {user?._id ? (
              <>
                <li className="pt-2">
                  <div className="px-4 py-2">
                    <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                      Mon compte
                    </span>
                  </div>
                </li>
                <li>
                  <Link
                    href="/profile"
                    onClick={onClose}
                    className="group relative block px-4 py-4 rounded-xl text-white font-semibold text-2xl transition-all duration-200 hover:bg-white/10 hover:translate-x-2 active:scale-[0.98]"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors"></span>
                      Mon profil
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile/analytics"
                    onClick={onClose}
                    className="group relative block px-4 py-4 rounded-xl text-white font-semibold text-2xl transition-all duration-200 hover:bg-white/10 hover:translate-x-2 active:scale-[0.98]"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors"></span>
                      Analytics
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile/settings"
                    onClick={onClose}
                    className="group relative block px-4 py-4 rounded-xl text-white font-semibold text-2xl transition-all duration-200 hover:bg-white/10 hover:translate-x-2 active:scale-[0.98]"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors"></span>
                      Paramètres
                    </span>
                  </Link>
                </li>
                <li className="pt-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onLogout?.();
                      onClose();
                    }}
                    className="group relative w-full text-left px-4 py-4 rounded-xl text-red-400 font-semibold text-2xl transition-all duration-200 hover:bg-red-500/10 hover:translate-x-2 active:scale-[0.98]"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 group-hover:bg-red-400 transition-colors"></span>
                      Déconnexion
                    </span>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  onClick={onClose}
                  className="group relative block px-4 py-4 rounded-xl text-white font-semibold text-2xl transition-all duration-200 hover:bg-white/10 hover:translate-x-2 active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors"></span>
                    Connexion
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Footer avec info utilisateur */}
        {user?._id && (
          <div className="pt-6 mt-6 border-t border-white/10">
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5">
              {user.avatar && (
                <Image
                  src={user.avatar}
                  alt="Avatar utilisateur"
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-white/20 flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-lg truncate">
                  {user.username}
                </p>
                <p className="text-white/50 text-sm">Connecté</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Main Navbar Component
export default function Navbar({
  className,
  user,
  onLogout,
}: {
  className?: string;
  user?: {
    _id?: string;
    username?: string;
    avatar?: string;
    isPro?: boolean;
    role?: string;
  };
  onLogout?: () => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();

  const scrolled = useMemo(() => scrollY > 100, [scrollY]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Community", href: "#community" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <>
      <nav
        className={clsx(
          className,
          "px-14 font-sans max-w-container mx-auto max-lg:flex max-lg:items-center max-lg:justify-between lg:grid lg:grid-cols-5 w-full z-[11] left-1/2 -translate-x-1/2 top-14 fixed transition-all duration-300",
          scrolled &&
            "bg-white rounded-full shadow-lg !max-w-[80dvw] lg:!max-w-4xl !py-4 !pr-6 lg:!py-2 !pl-7 lg:!pr-2 !top-8"
        )}
      >
        <Link
          href="/"
          className={clsx(
            "font-bold font-title text-xl flex items-center justify-center gap-1",
            scrolled ? "text-gray-900" : "text-white fill-white"
          )}
        >
          <LogoIcon className="w-[40px] scale-125" scrolled={scrolled} />
          Hubmify
        </Link>
        <ul className="flex items-center justify-center gap-8 max-lg:hidden lg:col-span-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href.startsWith("#") ? `/${link.href}` : link.href}
              className={clsx(
                "font-sans text-base opacity-60 hover:opacity-100 font-medium flex",
                scrolled ? "text-gray-900" : "text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </ul>
        {user?._id ? (
          <UserMenu
            isMini={scrolled}
            className="hidden lg:block"
            user={user}
            onLogout={onLogout}
          />
        ) : (
          <div className="hidden lg:flex justify-end">
            <Link
              href="/login"
              className={clsx(
                "inline-block min-w-min text-sm rounded-full whitespace-nowrap relative z-1 overflow-hidden transition-all duration-200 cursor-pointer",
                scrolled
                  ? "px-5 py-3 bg-black text-white hover:bg-gray-800"
                  : "p-[4px] bg-white/20 border border-white/20 hover:brightness-125"
              )}
            >
              {scrolled ? (
                <span className="font-sans font-semibold">Sign In</span>
              ) : (
                <p className="font-sans font-semibold relative inline-block rounded-full z-1 transition-all duration-200 w-full px-5 py-3 bg-white text-black">
                  Sign In
                  <span className="absolute right-0 top-0 h-full w-[40px] blur-xl -z-1 bg-[#b3d9f7]" />
                </p>
              )}
            </Link>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className={clsx(
            "lg:hidden p-0",
            scrolled ? "text-gray-900" : "text-white"
          )}
          onClick={() => setIsMobileMenuOpen(true)}
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          }
        />
      </nav>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        onLogout={onLogout}
        scrolled={scrolled}
      />
    </>
  );
}
