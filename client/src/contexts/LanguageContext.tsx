/**
 * Style guide: Taller de Cal y Sombra — language is a utility, not visual clutter.
 * The bilingual state stays shared so every route reads as one coherent field guide.
 */
import { createContext, useContext, useEffect, useState } from "react";

export type Language = "es" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem("rvega-language-v2") === "es" ? "es" : "en");

  useEffect(() => {
    localStorage.setItem("rvega-language-v2", language);
    document.documentElement.lang = language;
  }, [language]);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
