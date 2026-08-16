/**
 * Style guide: Taller de Cal y Sombra — regional field notes use white space, measured rules, and documented jobsite evidence.
 * City pages state service availability without assigning any supplied project photo to a city unless the client confirms it.
 */
import { ArrowDownRight, Check, MapPin, Phone, Ruler } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

type AreaKind = "stockton" | "sacramento" | "bay-area";

const PHONE_DISPLAY = "(916) 999-7931";
const PHONE_LINK = "tel:+19169997931";
const wordmark = "/assets/r-vega-official-wordmark.png";
const images = {
  finished: "/assets/commercial-finished-stucco.jpeg",
  scaffold: "/assets/commercial-construction-scaffold.jpeg",
  access: "/assets/commercial-scaffold-access.jpeg",
  entry: "/assets/commercial-entry-detail.jpeg",
  residential: "/assets/residential-finished-stucco.jpeg",
};

const areaContent = {
  en: {
    stockton: { label: "CENTRAL VALLEY FIELD NOTE", title: <>Stucco work for<br /><em>Stockton projects.</em></>, intro: "R Vega Plastering reviews residential, commercial, remodel, and new-construction scopes in Stockton and the Central Valley. The first conversation starts with the wall system, project conditions, and schedule.", communities: "Stockton · Manteca · Brentwood", note: "A documented field record is shown below. The exact project location is shared only as part of a qualified scope review." },
    sacramento: { label: "GREATER SACRAMENTO FIELD NOTE", title: <>A clear path for<br /><em>Sacramento work.</em></>, intro: "For exterior stucco, plaster, lath, and access planning across Sacramento-area projects, the team begins by reviewing substrate, system, finish, and site conditions.", communities: "Sacramento · Roseville · Davis · Woodland · Folsom", note: "The photographs below are documented R Vega field work. They are not assigned to a specific city without confirmation from the team." },
    "bay-area": { label: "BAY AREA FIELD NOTE", title: <>Regional work with<br /><em>field context.</em></>, intro: "R Vega Plastering can review qualified residential and commercial scopes across Bay Area communities. Location, access, wall assembly, and schedule shape the next step.", communities: "Fairfield · San Jose · Saratoga · Union City", note: "The photographs below document systems, access, and finishes completed by the team; project-city attribution is confirmed before publication." },
    common: { back: "Back to coverage", availability: "SERVICE AVAILABILITY", serving: "Coverage context", systems: ["Stucco and exterior finish systems", "Lath over metal studs, wood framing, and CMU", "EIFS, crack-isolation options, retexture, and scaffold access"], field: "DOCUMENTED FIELD WORK", fieldTitle: <>Evidence should<br /><em>read like evidence.</em></>, ask: "Review my project", call: "Call the field team", license: "LIC. #1114856 · C-35" }
  },
  es: {
    stockton: { label: "NOTA DE CAMPO · CENTRAL VALLEY", title: <>Trabajo de estuco para<br /><em>proyectos en Stockton.</em></>, intro: "R Vega Plastering revisa proyectos residenciales, comerciales, de remodelación y construcción nueva en Stockton y el Central Valley. La primera conversación empieza con el sistema de muro, condiciones de obra y calendario.", communities: "Stockton · Manteca · Brentwood", note: "Abajo se muestra trabajo de campo documentado. La ubicación exacta del proyecto se comparte solo durante una revisión de alcance calificada." },
    sacramento: { label: "NOTA DE CAMPO · GREATER SACRAMENTO", title: <>Una ruta clara para<br /><em>trabajo en Sacramento.</em></>, intro: "Para estuco exterior, plaster, lath y planificación de acceso en proyectos de Sacramento, el equipo empieza revisando sustrato, sistema, acabado y condiciones de obra.", communities: "Sacramento · Roseville · Davis · Woodland · Folsom", note: "Las fotos son trabajo de campo documentado de R Vega. No se asignan a una ciudad específica sin confirmación del equipo." },
    "bay-area": { label: "NOTA DE CAMPO · BAY AREA", title: <>Trabajo regional con<br /><em>contexto de campo.</em></>, intro: "R Vega Plastering puede revisar alcances residenciales y comerciales calificados en comunidades del Bay Area. La ubicación, acceso, sistema de muro y calendario determinan el siguiente paso.", communities: "Fairfield · San Jose · Saratoga · Union City", note: "Las fotos documentan sistemas, acceso y acabados realizados por el equipo; la atribución por ciudad se confirma antes de publicarse." },
    common: { back: "Volver a cobertura", availability: "DISPONIBILIDAD DE SERVICIO", serving: "Contexto de cobertura", systems: ["Sistemas de estuco y acabado exterior", "Lath sobre metal studs, wood framing y CMU", "EIFS, opciones de crack isolation, retexture y acceso con scaffold"], field: "TRABAJO DE CAMPO DOCUMENTADO", fieldTitle: <>La evidencia debe<br /><em>leerse como evidencia.</em></>, ask: "Revisar mi proyecto", call: "Llamar al equipo", license: "LIC. #1114856 · C-35" }
  }
} as const;

export default function AreaPage({ area }: { area: AreaKind }) {
  const { language } = useLanguage();
  const copy = areaContent[language];
  const detail = copy[area];
  const heroImage = area === "stockton" ? images.finished : area === "sacramento" ? images.entry : images.access;
  const fieldImages = area === "stockton" ? [images.scaffold, images.entry, images.residential] : area === "sacramento" ? [images.access, images.residential, images.finished] : [images.entry, images.finished, images.scaffold];
  return <div className={`area-page area-page-${area}`}>
    <header className="area-header"><a href="/#coverage-atlas" className="area-brand" aria-label="R Vega Plastering"><span className="area-wordmark" role="img" aria-label="R Vega Plastering" /></a><div className="area-header-tools"><span className="area-license"><Ruler size={14} />{copy.common.license}</span><LanguageToggle /><a href={PHONE_LINK}><Phone size={16} />{PHONE_DISPLAY}</a></div></header>
    <main>
      <section className="area-hero"><div className="area-hero-copy"><a className="area-back" href="/#coverage-atlas">← {copy.common.back}</a><div className="area-fiche"><span>FIELD FICHE / {area.toUpperCase()}</span><i /><strong>{copy.common.license}</strong></div><p className="eyebrow"><span /> {detail.label}</p><h1>{detail.title}</h1><p>{detail.intro}</p><div className="area-hero-actions"><a href="#quote" className="button button-eucalyptus">{copy.common.ask}<ArrowDownRight size={18} /></a><a href={PHONE_LINK} className="text-link">{copy.common.call}<Phone size={16} /></a></div></div><div className="area-hero-image"><img src={heroImage} alt="Documented R Vega Plastering field work" /><span>{copy.common.license}</span></div></section>
      <section className="area-context"><div><p className="eyebrow"><span /> {copy.common.availability}</p><h2>{copy.common.serving}</h2><p className="area-community-list">{detail.communities}</p></div><div className="area-system-list">{copy.common.systems.map((system, index) => <article key={system}><span>0{index + 1}</span><p>{system}</p><Check size={18} /></article>)}</div></section>
      <section className="area-field"><div className="area-field-ruler" aria-hidden="true"><i /><span>0</span><i /><span>1</span><i /><span>2</span><i /></div><div className="area-field-heading"><p className="eyebrow eyebrow-light"><span /> {copy.common.field}</p><h2>{copy.common.fieldTitle}</h2><p>{detail.note}</p></div><div className="area-field-grid"><figure className="area-field-primary"><img src={fieldImages[0]} alt="Documented exterior work and access" /><figcaption>01 / FIELD SYSTEM</figcaption></figure><figure><img src={fieldImages[1]} alt="Documented plaster or stucco field work" /><figcaption>02 / SURFACE RECORD</figcaption></figure><figure><img src={fieldImages[2]} alt="Documented R Vega Plastering project finish" /><figcaption>03 / FINISH RECORD</figcaption></figure></div></section>
      <section id="quote" className="area-close"><MapPin size={20} /><div><p>{detail.communities}</p><h2>{language === "es" ? "Cuéntanos sobre el muro." : "Tell us about the wall."}</h2></div><a className="button button-eucalyptus" href="/#quote">{copy.common.ask}<ArrowDownRight size={18} /></a></section>
    </main>
  </div>;
}
