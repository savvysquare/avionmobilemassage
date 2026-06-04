import React, { useState, useEffect, useRef } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { BackgroundCanvas } from "./BackgroundCanvas";
import { ChapterIndicator } from "./ChapterIndicator";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Services } from "./Services";
import { About } from "./About";
import { Areas } from "./Areas";
import { FAQ } from "./FAQ";
import { Booking } from "./Booking";

export function HUDLayout() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Custom Cursor Refs
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);
  const totalChapters = 6;

  // Preload audio and manage play/pause state
  useEffect(() => {
    // Royalty-free peaceful wellness music URL
    const audio = new Audio(
      "https://assets.mixkit.co/music/preview/mixkit-forest-lullaby-1109.mp3",
    );
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Audio autoplay blocked by browser policy:", err);
        setIsMuted(true);
      });
    }
  }, [isMuted]);

  // Scroll and touch swipe event handlers (scroll-jacking)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Throttle scrolling to prevent double triggers
      const now = Date.now();
      if (now - lastScrollTime.current < 1000) return;

      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          // Scroll Down -> Next Chapter
          setActiveChapter((prev) => Math.min(prev + 1, totalChapters - 1));
        } else {
          // Scroll Up -> Prev Chapter
          setActiveChapter((prev) => Math.max(prev - 1, 0));
        }
        lastScrollTime.current = now;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 1000) return;

      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY.current - touchEndY;

      if (Math.abs(diffY) > 50) {
        if (diffY > 0) {
          // Swipe Up -> Next Chapter
          setActiveChapter((prev) => Math.min(prev + 1, totalChapters - 1));
        } else {
          // Swipe Down -> Prev Chapter
          setActiveChapter((prev) => Math.max(prev - 1, 0));
        }
        lastScrollTime.current = now;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Custom cursor follower animation
  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;
    if (!cursorDot || !cursorRing) return;

    let mouseX = -9999;
    let mouseY = -9999;
    let ringX = -9999;
    let ringY = -9999;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update dot instantly
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    };

    // Smoothly interpolate the outer ring position
    const animateRing = () => {
      if (ringX === -9999) {
        ringX = mouseX;
        ringY = mouseY;
      } else {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
      }

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(animateRing);
    };

    // Event delegation for cursor hover state on interactive items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "SELECT" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.classList.contains("cursor-pointer");

      if (isInteractive) {
        document.body.classList.add("cursor-hover");
      } else {
        document.body.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    const animId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  const getExitClass = (chapterIndex: number) => {
    if (chapterIndex < activeChapter) return "exit-up";
    if (chapterIndex > activeChapter) return "exit-down";
    return "";
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none">
      {/* Background Canvas Particles */}
      <BackgroundCanvas activeChapter={activeChapter} />

      {/* Cybernetic HUD Scanlines & Noise overlays */}
      <div className="scanlines" />
      <div className="noise-overlay" />

      {/* Custom Cursor Followers */}
      <div id="custom-cursor-dot" ref={cursorDotRef} />
      <div id="custom-cursor-ring" ref={cursorRingRef} />

      {/* Persistent Navigation Header */}
      <Nav
        activeChapter={activeChapter}
        setActiveChapter={setActiveChapter}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Left HUD Chapter Indicator Menu */}
      <ChapterIndicator activeChapter={activeChapter} setActiveChapter={setActiveChapter} />

      {/* Main Chapter Containers */}
      <main className="relative w-full h-full z-10">
        {/* Chapter 00: Hero */}
        <section
          className={`hud-chapter-section ${activeChapter === 0 ? "active" : getExitClass(0)}`}
        >
          <Hero setActiveChapter={setActiveChapter} />
        </section>

        {/* Chapter 01: Wellness Sequence (How It Works) */}
        <section
          className={`hud-chapter-section ${activeChapter === 1 ? "active" : getExitClass(1)}`}
        >
          <HowItWorks />
        </section>

        {/* Chapter 02: Therapy Modules (Services) */}
        <section
          className={`hud-chapter-section ${activeChapter === 2 ? "active" : getExitClass(2)}`}
        >
          <Services />
        </section>

        {/* Chapter 03: Science Panel (About Us) */}
        <section
          className={`hud-chapter-section ${activeChapter === 3 ? "active" : getExitClass(3)}`}
        >
          <About />
        </section>

        {/* Chapter 04: Coverage Map & Diagnostic Accordions */}
        <section
          className={`hud-chapter-section ${activeChapter === 4 ? "active" : getExitClass(4)}`}
        >
          <div className="container mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl max-h-[80vh] overflow-y-auto lg:overflow-visible">
            <div className="lg:col-span-5 flex items-center">
              <Areas />
            </div>
            <div className="lg:col-span-7 flex items-center">
              <FAQ />
            </div>
          </div>
        </section>

        {/* Chapter 05: Session Initiation Portal (Booking Form) */}
        <section
          className={`hud-chapter-section ${activeChapter === 5 ? "active" : getExitClass(5)}`}
        >
          <Booking />
        </section>
      </main>

      {/* Floating HUD Footer */}
      <Footer activeChapter={activeChapter} />
    </div>
  );
}
