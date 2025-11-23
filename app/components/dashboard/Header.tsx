"use client";

import Image from "next/image";
import UserProfileMenu from "./UserProfileMenu";
import Button from "../Button";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  url?: string;
  userAvatar?: string;
  userName?: string;
  projectLogo?: string;
  projectName?: string;
}

export default function Header({
  title,
  subtitle,
  url,
  userAvatar,
  userName,
  projectLogo,
  projectName,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 p-4 md:pl-4 pl-[80px]">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          {projectLogo && (
            <Image
              src={projectLogo}
              alt={projectName || "Project"}
              width={48}
              height={48}
              className="w-12 h-12 rounded-lg object-cover border border-gray-200"
            />
          )}
          <div>
            {projectName ? (
              <h1 className="text-xl font-bold text-gray-900">{projectName}</h1>
            ) : (
              <>
                {title && (
                  <h1 className="text-xl font-bold text-gray-900 mb-1">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-sm text-gray-600">{subtitle}</p>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            className="hidden md:flex"
            icon={
              <Image
                src="/images/icon_pro.svg"
                alt="Pro badge"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            }
            iconPosition="right"
          >
            Upgrade to Pro
          </Button>
          <UserProfileMenu userName={userName} />
        </div>
      </div>
      {url && !projectLogo && (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <a
            href="#"
            className="text-sm text-gray-700 hover:text-gray-900 flex items-center gap-1"
          >
            {url}
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      )}
    </header>
  );
}
