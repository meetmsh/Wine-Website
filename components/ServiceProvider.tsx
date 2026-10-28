"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Services = { orders: boolean; giftCards: boolean; newsletter: boolean; loading: boolean };
const unavailable: Services = { orders: false, giftCards: false, newsletter: false, loading: true };
const Context = createContext<Services>(unavailable);

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState(unavailable);
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    fetch("/api/services", { signal: controller.signal, cache: "no-store" })
      .then(r => { if (!r.ok) throw new Error("Unavailable"); return r.json(); })
      .then(data => setServices({ orders: data.orders === true, giftCards: data.giftCards === true, newsletter: data.newsletter === true, loading: false }))
      .catch(() => { if (!controller.signal.aborted) setServices({ ...unavailable, loading: false }); })
      .finally(() => clearTimeout(timer));
    const timeout = setTimeout(() => setServices(previous => previous.loading ? { ...unavailable, loading: false } : previous), 8100);
    return () => { clearTimeout(timer); clearTimeout(timeout); controller.abort(); };
  }, []);
  return <Context.Provider value={services}>{children}</Context.Provider>;
}

export const useServices = () => useContext(Context);
