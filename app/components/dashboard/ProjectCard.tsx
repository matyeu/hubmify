"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  data: Array<{
    href: string;
    label: string;
    logo: string;
  }>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  return (
    <div className="flex items-start justify-center mx-auto w-full max-w-5xl px-5 mt-5 gap-6 flex-wrap">
      {data.map((card, index) => (
        <div
          key={index}
          className="w-full lg:w-[280px] md:w-[calc(100%/2-1.2rem)] sm:w-full flex flex-col"
        >
          <Link
            href={`/dashboard/${card.href}`}
            className="group relative aspect-[5/3] bg-neutral-800 hover:bg-neutral-700 transition-all duration-200 cursor-pointer rounded-[10px] hover:shadow-lg flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Logo flouté en arrière-plan qui couvre toute la carte */}
            <div className="absolute inset-0 opacity-100 group-hover:opacity-100 transition-opacity duration-200">
              <Image
                src={card.logo}
                alt={card.label}
                fill
                className="object-cover blur-2xl scale-150"
                style={{ objectPosition: "center" }}
              />
            </div>

            {/* Overlay sombre très léger pour améliorer la lisibilité */}
            <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-neutral-900/5 transition-colors duration-200"></div>

            {/* Logo principal centré */}
            <div className="relative z-10 flex items-center justify-center">
              <Image
                src={card.logo}
                alt={card.label}
                width={100}
                height={100}
                className="w-24 h-24 rounded-full border-2 border-white/30 group-hover:border-white/40 object-cover transition-colors duration-200"
              />
            </div>
          </Link>

          {/* Texte et bouton en dessous de la carte */}
          <div className="mt-2 flex items-center justify-between">
            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-0.5">
                {card.label}
              </h3>
              <p className="text-sm text-gray-600">Proprietaire</p>
            </div>
            <Link
              href={`/dashboard/${card.href}`}
              className="bg-neutral-700 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-neutral-600 transition-colors duration-200 cursor-pointer self-start"
            >
              Configurer
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCard;
