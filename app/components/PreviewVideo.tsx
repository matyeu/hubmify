"use client";

import { useEffect, useRef, useState } from "react";

export default function PreviewVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({
    translateY: -500,
    scale: 0.8,
    rotateX: 20,
  });

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current || !videoRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Zone d'animation : commence quand l'élément entre dans le viewport
      // et se termine quand il sort complètement
      const animationStart = windowHeight * 0.5; // Commence à 50% du viewport
      const animationEnd = -elementHeight * 0.2; // Se termine quand le bas sort

      let progress = 0;

      if (elementTop < animationStart && elementTop > animationEnd) {
        // L'élément est dans la zone d'animation
        const range = animationStart - animationEnd;
        const current = animationStart - elementTop;
        progress = Math.max(0, Math.min(1, current / range));
      } else if (elementTop >= animationStart) {
        // L'élément est au-dessus de la zone d'animation
        progress = 0;
      } else {
        // L'élément est en dessous de la zone d'animation
        progress = 1;
      }

      // Applique easing pour une animation plus fluide
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);

      // Calcule les transformations
      const translateY = -500 + easedProgress * 500;
      const scale = 0.8 + easedProgress * 0.2;
      const rotateX = 20 - easedProgress * 20;

      setTransform({
        translateY,
        scale,
        rotateX,
      });
    };

    const onScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    handleScroll();

    // Écoute les événements de scroll avec requestAnimationFrame pour de meilleures performances
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="px-2">
      <div
        ref={containerRef}
        className="z-10 relative px-6 transition-all duration-200 h-[800px] max-lg:hidden"
        style={{ perspective: "1200px" }}
      >
        <div
          ref={videoRef}
          className="w-full h-full mx-auto rounded-[45px] max-w-6xl border backdrop-blur-sm border-opacity-20 border-white bg-white/20 p-[8px] z-1 overflow-hidden"
          style={{
            transform: `translateY(${transform.translateY}px) scale(${transform.scale}) rotateX(${transform.rotateX}deg) translateZ(0)`,
            willChange: "transform",
          }}
        >
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-[36px]"
          >
            <source src="/preview_video.webm" type="video/webm" />
          </video>
        </div>
      </div>
      <div className="z-10 relative transition-all duration-200 h-[40dvh] lg:hidden -translate-y-20">
        <div className="w-full h-full mx-auto rounded-[45px] max-w-6xl border border-opacity-20 border-white bg-white/20 p-[8px] z-1 overflow-hidden">
          <div className="w-full h-full rounded-[36px] bg-gradient-to-br from-purple-500/20 to-blue-500/20 overflow-hidden">
            <img
              src="/images/preview.svg"
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
