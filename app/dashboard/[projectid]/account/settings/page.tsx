"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Header from "../../../../components/dashboard/Header";
import Sidebar from "../../../../components/dashboard/Sidebar";
import Footer from "../../../../components/dashboard/Footer";
import Button from "../../../../components/Button";
import { useSidebar } from "../../../../contexts/SidebarContext";

export default function SettingsPage() {
  const { isMobile, isOpen, toggleCollapse } = useSidebar();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName] = useState("Matyeu");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Veuillez sélectionner un fichier image");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("L'image est trop volumineuse. Taille maximale : 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
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
            title="Account settings"
            subtitle="Manage your personal information and preferences."
            url="www.hubmify.com/matyeu"
          />

          <div className="p-6 space-y-6 flex-1">
            {/* Box photo de profil */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 w-fit min-w-[320px]">
              <h2 className="text-base font-semibold text-gray-600 mb-3">
                Profile Picture
              </h2>
              <div className="border-b border-gray-200 mb-5"></div>

              <div className="flex flex-col gap-3">
                {/* Aperçu de la photo - centré */}
                <div className="relative flex justify-center">
                  {profileImage ? (
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                      <Image
                        src={profileImage}
                        alt="Profile picture"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-32 h-32 rounded-full flex items-center justify-center text-white font-semibold text-3xl border-2 border-gray-200"
                      style={{
                        background: `linear-gradient(to bottom right, #004AAD, #E385EC)`,
                      }}
                    >
                      {getInitials(userName)}
                    </div>
                  )}
                </div>

                {/* Texte informatif - centré */}
                <p className="text-sm text-gray-600 text-center">
                  JPG or PNG no larger than 5 MB
                </p>

                {/* Bouton upload new image */}
                <Button
                  onClick={handleChangePhotoClick}
                  variant="primary"
                  size="md"
                >
                  Upload new image
                </Button>
              </div>

              {/* Input file caché */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          <Footer />
        </main>
      </div>
      {isMobile && <Sidebar />}
    </>
  );
}
