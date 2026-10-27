"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getStoreItem } from "@/lib/store";
import styles from "./Toast.module.css";

const STORAGE_KEY = "uncorked:bag:v2";

type CellarContextValue = {
  items: Record<string, number>;
  count: number;
  add: (slug: string) => void;
  remove: (slug: string) => void;
};

const CellarContext = createContext<CellarContextValue | null>(null);

export function CellarProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});
  const [toast, setToast] = useState<{ id: number; slug: string } | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          setItems(Object.fromEntries(Object.entries(parsed).filter(([slug, quantity]) => getStoreItem(slug) && Number.isInteger(quantity) && (quantity as number) > 0)) as Record<string, number>);
        }
      }
    } catch {
      // Storage unavailable — the cellar simply starts empty.
    }
  }, []);

  const add = useCallback((slug: string) => {
    if (!getStoreItem(slug)) return;
    setItems((prev) => {
      const next = { ...prev, [slug]: (prev[slug] ?? 0) + 1 };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
    setToast(previous => ({ id: (previous?.id ?? 0) + 1, slug }));
    setToastVisible(true);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToastVisible(false), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const remove = useCallback((slug: string) => {
    setItems(prev => {
      const next = { ...prev };
      if ((next[slug] ?? 0) > 1) next[slug] -= 1;
      else delete next[slug];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ items, add, remove, count: Object.values(items).reduce((a, b) => a + b, 0) }),
    [items, add, remove],
  );

  const wine = toast ? getStoreItem(toast.slug) : undefined;

  return (
    <CellarContext.Provider value={value}>
      {children}
      <div className={styles.region} aria-live="polite">
        {wine && (
          <div className={styles.toast} data-visible={toastVisible} aria-hidden={!toastVisible}>
            <span className="label">Added to your bag</span>
            <span className={styles.name}>
              {wine.name}
            </span>
          </div>
        )}
      </div>
    </CellarContext.Provider>
  );
}

export function useCellar() {
  const ctx = useContext(CellarContext);
  if (!ctx) throw new Error("useCellar must be used inside <CellarProvider>");
  return ctx;
}
