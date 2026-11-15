"use client";
import { useEffect, useRef, Dispatch, SetStateAction } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

interface IHeaderProps {
  name: string;
  setPageNo: Dispatch<SetStateAction<number>>;
  setTempPageNo: Dispatch<SetStateAction<number | string>>;
  setName: Dispatch<SetStateAction<string>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const Header = ({
  name,
  setPageNo,
  setName,
  setSearchQuery,
  setTempPageNo,
}: IHeaderProps) => {
  const titleCanvasRef = useRef<HTMLCanvasElement>(null);
  const badgeCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleReset = () => {
    setSearchQuery("");
    setName("");
    setPageNo(1);
    setTempPageNo(1);
  };

  useEffect(() => {
    const drawCanvases = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // 1. Draw ">_" Badge Canvas (100% Immune to Force-Dark)
      const badgeCanvas = badgeCanvasRef.current;
      if (badgeCanvas) {
        const isMobile = window.innerWidth < 640;
        const size = isMobile ? 46 : 56;
        badgeCanvas.width = size * dpr;
        badgeCanvas.height = size * dpr;
        badgeCanvas.style.width = `${size}px`;
        badgeCanvas.style.height = `${size}px`;

        const bCtx = badgeCanvas.getContext("2d");
        if (bCtx) {
          bCtx.scale(dpr, dpr);
          bCtx.fillStyle = "#FF6B00";
          bCtx.fillRect(0, 0, size, size);
          bCtx.lineWidth = 4;
          bCtx.strokeStyle = "#000000";
          bCtx.strokeRect(2, 2, size - 4, size - 4);
          bCtx.font = `400 ${isMobile ? 20 : 26}px "Wellfleet", cursive, sans-serif`;
          bCtx.fillStyle = "#FFFFFF";
          bCtx.textAlign = "center";
          bCtx.textBaseline = "middle";
          bCtx.fillText(">_", size / 2, size / 2 + 1);
        }
      }

      // 2. Draw "RICK & MORTY WIKI" Title Canvas (100% Immune to Force-Dark)
      const titleCanvas = titleCanvasRef.current;
      if (titleCanvas) {
        const isMobile = window.innerWidth < 640;
        const isTablet = window.innerWidth < 1024;
        const fontSize = isMobile ? 24 : isTablet ? 34 : 42;
        const width = isMobile ? 225 : isTablet ? 390 : 480;
        const height = isMobile ? 62 : 52;

        titleCanvas.width = width * dpr;
        titleCanvas.height = height * dpr;
        titleCanvas.style.width = `${width}px`;
        titleCanvas.style.height = `${height}px`;

        const ctx = titleCanvas.getContext("2d");
        if (ctx) {
          ctx.scale(dpr, dpr);
          ctx.clearRect(0, 0, width, height);
          ctx.font = `400 ${fontSize}px "Wellfleet", cursive, sans-serif`;
          ctx.textBaseline = "top";
          ctx.lineJoin = "round";

          const drawPopArtLine = (text: string, x: number, y: number) => {
            ctx.fillStyle = "#000000";
            ctx.fillText(text, x + 3, y + 3);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#000000";
            ctx.strokeText(text, x, y);
            ctx.fillStyle = "#FF6B00";
            ctx.fillText(text, x, y);
          };

          if (isMobile) {
            drawPopArtLine("RICK & MORTY", 2, 2);
            drawPopArtLine("WIKI", 2, 31);
          } else {
            drawPopArtLine("RICK & MORTY WIKI", 2, 4);
          }
        }
      }
    };

    // Explicitly load Wellfleet before painting the canvas
    if (typeof document !== "undefined" && document.fonts) {
      Promise.all([
        document.fonts.load('400 24px "Wellfleet"'),
        document.fonts.load('400 42px "Wellfleet"'),
        document.fonts.ready,
      ])
        .then(() => {
          drawCanvases();
        })
        .catch(() => {
          drawCanvases();
        });
    } else {
      drawCanvases();
    }

    window.addEventListener("resize", drawCanvases);
    return () => window.removeEventListener("resize", drawCanvases);
  }, []);

  return (
    <header className="safe-top relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 pb-2 overflow-hidden">
      {/* Top Retro System Ticker */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(16px)",
        }}
        className="w-full text-xs px-3 sm:px-4 py-1.5 border-x-4 border-t-4 border-black flex items-center justify-between gap-2 overflow-hidden"
      >
        <span className="truncate min-w-0 !text-[#00E676]">
          SYSTEM_CHECK: OK // CITADEL_DB: CONNECTED // PORTAL_PROTOCOL: ACTIVE
        </span>
        <span className="hidden sm:inline !text-[#F9F4DA] shrink-0">V 2.4.0</span>
      </div>

      {/* Main Console Banner */}
      <div className="slate-card-surface w-full text-white border-4 border-black shadow-[6px_6px_0px_#000000] sm:shadow-[8px_8px_0px_#000000] p-4 sm:p-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-3 sm:gap-4 text-left group focus:outline-none min-w-0"
        >
          <div className="shrink-0 shadow-[4px_4px_0px_#000000] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">
            <canvas ref={badgeCanvasRef} aria-hidden="true" className="block" />
          </div>
          <div className="min-w-0">
            <canvas
              ref={titleCanvasRef}
              aria-label="Rick & Morty Wiki"
              className="block max-w-full"
            />
            <p
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                backdropFilter: "blur(16px)",
              }}
              className="inline-flex text-xs sm:text-sm !text-[#F9F4DA] items-center gap-2 mt-1 px-2 py-0.5 border border-black"
            >
              MULTIVERSE ARCHIVE
              <span className="inline-block w-2.5 h-2.5 bg-[#00E676] border border-black rounded-full animate-pulse shrink-0" />
              <span className="!text-[#00E676]">LIVE</span>
            </p>
          </div>
        </button>

        {/* Search Input with Explicit Opaque rgba Background + Backdrop Blur */}
        <div className="relative w-full lg:w-96">
          <input
            type="text"
            className="cream-surface w-full !text-black placeholder-neutral-600 border-4 border-black px-4 py-3 pr-12 text-base sm:text-lg shadow-[5px_5px_0px_#000000] focus:border-black focus:ring-0 focus:outline-none focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-[3px_3px_0px_#000000] transition-all"
            placeholder="Search by name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="inset-y-0 right-3 absolute flex items-center !text-black">
            {name === "" ? (
              <IoIosSearch className="w-7 h-7 pointer-events-none !text-black" />
            ) : (
              <button
                type="button"
                aria-label="Clear search"
                onClick={handleReset}
                style={{ backgroundColor: "rgba(0, 0, 0, 0.92)" }}
                className="!text-white border-2 border-black hover:bg-[#FF2A55] transition-colors focus:outline-none"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;