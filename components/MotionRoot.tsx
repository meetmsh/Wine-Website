"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// One observer for every [data-reveal] block: content is visible by default and only
// hidden once JS confirms motion is allowed, and anything already on screen is never hidden.
// Also drives the cursor spotlight on [data-spotlight] surfaces for fine pointers.
export function MotionRoot() {
  const path = usePathname();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const blocks = [...document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")];
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
    }, { rootMargin: "0px 0px -10% 0px" });
    for (const el of blocks) {
      [...el.children].forEach((child, i) => (child as HTMLElement).style.setProperty("--i", String(Math.min(i, 6))));
      if (el.getBoundingClientRect().top < innerHeight * 0.9) el.classList.add("is-in");
      else io.observe(el);
    }
    document.documentElement.classList.add("motion");
    return () => io.disconnect();
  }, [path]);
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-spotlight]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", move, { passive: true });
    return () => document.removeEventListener("pointermove", move);
  }, []);
  return null;
}
