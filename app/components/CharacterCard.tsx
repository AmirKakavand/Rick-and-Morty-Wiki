"use client";
import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import { ICharacter } from "../types/ICharacter";

interface IProps {
  character: ICharacter;
  onSelect: (character: ICharacter) => void;
}

const statusStyles: Record<
  string,
  { badge: string; dot: string; label: string; bgRgba: string; textHex: string }
> = {
  Alive: {
    badge: "border-black",
    dot: "bg-black",
    label: "ALIVE",
    bgRgba: "rgba(0, 230, 118, 0.96)",
    textHex: "#000000",
  },
  Dead: {
    badge: "border-black",
    dot: "bg-white",
    label: "DEAD",
    bgRgba: "rgba(255, 42, 85, 0.96)",
    textHex: "#FFFFFF",
  },
  unknown: {
    badge: "border-black",
    dot: "bg-black",
    label: "UNKNOWN",
    bgRgba: "rgba(234, 179, 8, 0.96)",
    textHex: "#000000",
  },
};

export const CharacterCard = ({ character, onSelect }: IProps) => {
  const cardRef = useRef<HTMLElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const isLocalImage = !character.image.startsWith("http");

  const [resolvedSrc, setResolvedSrc] = useState<string>(character.image);

  useEffect(() => {
    if (!character.image.startsWith("http") && typeof window !== "undefined") {
      const cleanPath = character.image.replace(/^\/Rick-and-Morty-Wiki/, "");
      const needsPrefix = window.location.pathname.startsWith(
        "/Rick-and-Morty-Wiki"
      );
      setResolvedSrc(
        needsPrefix ? `/Rick-and-Morty-Wiki${cleanPath}` : cleanPath
      );
    } else {
      setResolvedSrc(character.image);
    }
  }, [character.image]);

  const phys = useRef({
    phaseX: Math.random() * Math.PI * 2,
    phaseY: Math.random() * Math.PI * 2,
    phaseRot: Math.random() * Math.PI * 2,
    speedX: 0.0012 + Math.random() * 0.0007,
    speedY: 0.0014 + Math.random() * 0.0007,
    speedRot: 0.001 + Math.random() * 0.0006,
    offsetX: 0,
    offsetY: 0,
    vx: 0,
    vy: 0,
    tiltX: 0,
    tiltY: 0,
    targetTiltX: 0,
    targetTiltY: 0,
    isHovered: false,
  });

  const statusStyle = statusStyles[character.status] || statusStyles.unknown;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let pointerX = -9999;
    let pointerY = -9999;
    let lastScrollY = window.scrollY;

    const onMouseMove = (e: globalThis.MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = Math.max(-25, Math.min(25, currentScrollY - lastScrollY));
      lastScrollY = currentScrollY;
      phys.current.vy += -deltaY * 0.06;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    let rafId: number;
    const step = (time: number) => {
      const p = phys.current;

      const floatX = Math.sin(time * p.speedX + p.phaseX) * 6;
      const floatY = Math.cos(time * p.speedY + p.phaseY) * 7;
      const floatRot = Math.sin(time * p.speedRot + p.phaseRot) * 1.4;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = centerX - pointerX;
      const dy = centerY - pointerY;
      const dist = Math.hypot(dx, dy);

      if (dist < 180 && dist > 1 && !p.isHovered) {
        const push = ((180 - dist) / 180) * 0.22;
        p.vx += (dx / dist) * push;
        p.vy += (dy / dist) * push;
      }

      p.vx += -p.offsetX * 0.06;
      p.vy += -p.offsetY * 0.06;
      p.vx *= 0.86;
      p.vy *= 0.86;

      p.offsetX = Math.max(-18, Math.min(18, p.offsetX + p.vx));
      p.offsetY = Math.max(-18, Math.min(18, p.offsetY + p.vy));

      p.tiltX += (p.targetTiltX - p.tiltX) * 0.14;
      p.tiltY += (p.targetTiltY - p.tiltY) * 0.14;

      const totalX = floatX + p.offsetX;
      const totalY = floatY + p.offsetY;
      const totalRot = floatRot + p.offsetX * 0.08;
      const scale = p.isHovered ? 1.03 : 1;

      card.style.transform = `perspective(900px) translate3d(${totalX.toFixed(
        2
      )}px, ${totalY.toFixed(2)}px, 0px) rotateX(${p.tiltX.toFixed(
        2
      )}deg) rotateY(${p.tiltY.toFixed(2)}deg) rotateZ(${totalRot.toFixed(
        2
      )}deg) scale(${scale})`;

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    phys.current.isHovered = true;
    phys.current.targetTiltX = ((y - centerY) / centerY) * -10;
    phys.current.targetTiltY = ((x - centerX) / centerX) * 10;

    if (glareRef.current) {
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      glareRef.current.style.opacity = "1";
      glareRef.current.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.3), transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    phys.current.isHovered = false;
    phys.current.targetTiltX = 0;
    phys.current.targetTiltY = 0;
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect({ ...character, image: resolvedSrc })}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect({ ...character, image: resolvedSrc });
        }
      }}
      role="button"
      tabIndex={0}
      style={{
        transition: "box-shadow 0.2s ease",
        willChange: "transform",
      }}
      className="slate-card-surface group relative select-none cursor-pointer border-4 border-[#F9F4DA] shadow-[7px_7px_0px_#F9F4DA] hover:shadow-[10px_10px_0px_#FF6B00] hover:z-20 active:scale-95 focus:outline-none flex flex-col"
    >
      {/* Lighter Slate Top Window Bar (#334155) */}
      <div className="slate-bar-surface px-3 py-2 flex items-center justify-between border-b-4 border-[#F9F4DA] text-xs">
        <span className="truncate uppercase tracking-wider !text-[#F9F4DA]">
          FILE // {character.name.slice(0, 14)}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#FF3B5C] border border-black" />
          <span className="w-3 h-3 rounded-full bg-yellow-500 border border-black" />
          <span className="w-3 h-3 rounded-full bg-[#00E676] border border-black" />
        </div>
      </div>

      {/* Inner Frame */}
      <div className="p-3 flex-1 flex flex-col justify-between gap-3">
        <div className="cream-surface relative aspect-square w-full border-4 border-black overflow-hidden">
          {isLocalImage ? (
            <img
              src={resolvedSrc}
              alt={character.name}
              draggable={false}
              onError={() => {
                if (!resolvedSrc.startsWith("/Rick-and-Morty-Wiki")) {
                  setResolvedSrc(`/Rick-and-Morty-Wiki${resolvedSrc}`);
                } else {
                  setResolvedSrc(
                    resolvedSrc.replace("/Rick-and-Morty-Wiki", "")
                  );
                }
              }}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none"
            />
          ) : (
            <Image
              src={resolvedSrc}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
              alt={character.name}
              draggable={false}
              className="object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none"
            />
          )}

          {/* Interactive Holographic Glare Overlay */}
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200"
          />

          {/* Solid Status Tag with Explicit Opaque rgba + Blur */}
          <div className="absolute top-2.5 right-2.5 z-20">
            <span
              style={{
                backgroundColor: statusStyle.bgRgba,
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                color: statusStyle.textHex,
                WebkitTextFillColor: statusStyle.textHex,
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs uppercase tracking-wider border-2 shadow-[3px_3px_0px_#000000] ${statusStyle.badge}`}
            >
              <span
                className={`h-2 w-2 rounded-full border border-black ${statusStyle.dot}`}
              />
              {statusStyle.label}
            </span>
          </div>
        </div>

        {/* Name & Action Bar */}
        <div className="cream-surface border-4 border-black p-2.5 shadow-[4px_4px_0px_#000000] flex items-center justify-between gap-2">
          <h2 className="font-normal text-base sm:text-lg uppercase tracking-wide truncate !text-black">
            {character.name}
          </h2>
          <span
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.94)",
              backdropFilter: "blur(16px)",
              color: "#FFFFFF",
              WebkitTextFillColor: "#FFFFFF",
            }}
            className="text-xs px-2 py-0.5 group-hover:!bg-[#FF6B00] transition-colors shrink-0"
          >
            OPEN &gt;
          </span>
        </div>
      </div>
    </article>
  );
};