"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

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

// Button Component
function Button({
  children,
  className,
  theme = "white",
  href,
  onClick,
  bordered = true,
}: {
  children: React.ReactNode;
  className?: string;
  theme?: "white" | "dark";
  href?: string;
  onClick?: () => void;
  bordered?: boolean;
}) {
  const baseClasses =
    "inline-block min-w-min text-sm rounded-full whitespace-nowrap relative z-1 overflow-hidden transition-all duration-200 cursor-pointer hover:brightness-125";
  const themeClasses = {
    white: bordered ? "p-[4px] bg-white/20 border border-white/20" : "",
    dark: bordered ? "p-[4px] bg-black/20 border border-black/5" : "",
  };
  const innerClasses = {
    white: "bg-white text-body",
    dark: "bg-black text-dark-100",
  };

  const content = (
    <p
      className={clsx(
        "font-sans font-semibold relative inline-block rounded-full z-1 transition-all duration-200 w-full px-5 py-3",
        innerClasses[theme]
      )}
    >
      {children}
      <span
        className={clsx(
          "absolute right-0 top-0 h-full w-[40px] blur-xl -z-1",
          theme === "dark" ? "bg-[#2A6494]" : "bg-[#b3d9f7]"
        )}
      />
    </p>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={clsx(className, baseClasses, themeClasses[theme])}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={clsx(className, baseClasses, themeClasses[theme])}
    >
      {content}
    </button>
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
    <div
      className={clsx(
        "fixed top-0 left-0 w-screen h-screen bg-body/50 backdrop-blur-2xl z-20 transition-all duration-200 flex items-center justify-between flex-col p-10",
        !isOpen && "pointer-events-none opacity-0"
      )}
    >
      <div className="flex items-center justify-end w-full" onClick={onClose}>
        <button
          className={clsx("z-[30]", scrolled ? "text-gray-900" : "text-white")}
        >
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
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div className="w-full">
        <p className="text-dark-100/70 text-sm font-bold uppercase mb-5">
          Where to go?
        </p>
        <ul className="grid grid-cols-1 gap-5 w-full">
          <li className="relative w-full max-w-max">
            <Link
              href="/pricing"
              className="text-4xl font-bold text-white relative flex items-center justify-start gap-3"
            >
              Pro Subscription
            </Link>
          </li>
          {user?._id ? (
            <>
              <li>
                <Link
                  href="/profile"
                  className="relative w-full max-w-max text-4xl font-bold text-white"
                >
                  My profile
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/analytics"
                  className="relative w-full max-w-max text-4xl font-bold text-white"
                >
                  Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/settings"
                  className="relative w-full max-w-max text-4xl font-bold text-white"
                >
                  Settings
                </Link>
              </li>
              <li
                className="relative w-full max-w-max text-4xl font-bold text-white cursor-pointer"
                onClick={onLogout}
              >
                Log out
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/login"
                className="relative w-full max-w-max text-4xl font-bold text-white"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
      {user?._id && (
        <div className="relative w-full flex items-center justify-end gap-6 mt-6">
          <p className="text-white font-sans font-semibold text-3xl">
            {user.username}
          </p>
          {user.avatar && (
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={56}
              height={56}
              className="rounded-full border-2 border-white"
            />
          )}
        </div>
      )}
    </div>
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
        <button
          className={clsx(
            "lg:hidden",
            scrolled ? "text-gray-900" : "text-white"
          )}
          onClick={() => setIsMobileMenuOpen(true)}
        >
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
        </button>
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
