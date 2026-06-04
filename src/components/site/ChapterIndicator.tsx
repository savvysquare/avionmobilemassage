import React from "react";

interface ChapterIndicatorProps {
  activeChapter: number;
  setActiveChapter: (index: number) => void;
}

const chapters = [
  { id: "00", name: "WELCOME" },
  { id: "01", name: "SEQUENCE" },
  { id: "02", name: "THERAPIES" },
  { id: "03", name: "SCIENCE" },
  { id: "04", name: "DETAILS" },
  { id: "05", name: "INITIATE" },
];

export function ChapterIndicator({ activeChapter, setActiveChapter }: ChapterIndicatorProps) {
  return (
    <div className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-6 z-50 select-none">
      {/* HUD line */}
      <div className="absolute left-[7px] top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none" />

      {/* Active slide line indicator */}
      <div
        className="absolute left-[7px] w-[1.5px] bg-amber-500 transition-all duration-700 ease-out pointer-events-none"
        style={{
          top: `${(activeChapter / (chapters.length - 1)) * 80}%`,
          height: `${100 / chapters.length}%`,
          maxHeight: "30px",
          boxShadow: "0 0 8px rgba(245, 158, 11, 0.8)",
        }}
      />

      {chapters.map((chap, idx) => {
        const isActive = activeChapter === idx;
        return (
          <button
            key={chap.id}
            onClick={() => setActiveChapter(idx)}
            className="group flex items-center gap-4 text-left focus:outline-none relative"
          >
            {/* Interactive dot indicator */}
            <div
              className={`w-[15px] h-[15px] border rounded-full flex items-center justify-center transition-all duration-300 relative z-10 ${
                isActive
                  ? "border-amber-500 bg-amber-500/20"
                  : "border-white/30 bg-black group-hover:border-white/70"
              }`}
            >
              <div
                className={`w-[5px] h-[5px] rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-amber-500 scale-120 shadow-[0_0_8px_#f59e0b]"
                    : "bg-transparent group-hover:bg-white/50"
                }`}
              />
            </div>

            {/* Label */}
            <div className="flex flex-col">
              <span
                className={`font-mono text-[9px] tracking-wider transition-all duration-300 ${
                  isActive
                    ? "text-amber-500 glow-text-gold"
                    : "text-white/40 group-hover:text-white/70"
                }`}
              >
                {chap.id}
              </span>
              <span
                className={`font-sans text-[11px] font-bold tracking-widest transition-all duration-300 ${
                  isActive
                    ? "text-white translate-x-1"
                    : "text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5"
                }`}
              >
                {chap.name}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
