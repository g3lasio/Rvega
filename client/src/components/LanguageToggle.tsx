/** Style guide: compact field-tool control; eucalyptus is the active decision color. */
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle({ dark = false }: { dark?: boolean }) {
  const { language, setLanguage } = useLanguage();
  return (
    <div className={`language-toggle ${dark ? "language-toggle-dark" : ""}`} role="group" aria-label="Language selector">
      <button className={language === "es" ? "is-active" : ""} onClick={() => setLanguage("es")} aria-pressed={language === "es"}>ES</button>
      <span aria-hidden="true" />
      <button className={language === "en" ? "is-active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
    </div>
  );
}
