/**
 * Style guide: Taller de Cal y Sombra — city routes are field notes, not generic local landing pages.
 * All photographs document R Vega work; the UI deliberately avoids claiming a photo was taken in a given city without confirmation.
 */
import { ArrowDownRight, Check, MapPin, Phone, Ruler } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export const cityNotes = [
  { slug: "stockton", city: "Stockton", groupEn: "Central Valley", groupEs: "Central Valley" },
  { slug: "manteca", city: "Manteca", groupEn: "Central Valley", groupEs: "Central Valley" },
  { slug: "bakersfield", city: "Bakersfield", groupEn: "Southern Central Valley", groupEs: "Central Valley Sur" },
  { slug: "huron", city: "Huron", groupEn: "Southern Central Valley", groupEs: "Central Valley Sur" },
  { slug: "sacramento", city: "Sacramento", groupEn: "Greater Sacramento", groupEs: "Greater Sacramento" },
  { slug: "roseville", city: "Roseville", groupEn: "Greater Sacramento", groupEs: "Greater Sacramento" },
  { slug: "fairfield", city: "Fairfield", groupEn: "Bay Area + Solano", groupEs: "Bay Area + Solano" },
  { slug: "davis", city: "Davis", groupEn: "Greater Sacramento", groupEs: "Greater Sacramento" },
  { slug: "woodland", city: "Woodland", groupEn: "Greater Sacramento", groupEs: "Greater Sacramento" },
  { slug: "folsom", city: "Folsom", groupEn: "Greater Sacramento", groupEs: "Greater Sacramento" },
  { slug: "brentwood", city: "Brentwood", groupEn: "East Bay + Central Valley", groupEs: "East Bay + Central Valley" },
  { slug: "san-jose", city: "San Jose", groupEn: "South Bay", groupEs: "South Bay" },
  { slug: "saratoga", city: "Saratoga", groupEn: "South Bay", groupEs: "South Bay" },
  { slug: "union-city", city: "Union City", groupEn: "East Bay", groupEs: "East Bay" },
] as const;

export type CitySlug = (typeof cityNotes)[number]["slug"];

const PHONE_DISPLAY = "(209) 640-5323";
const PHONE_LINK = "tel:+12096405323";
const photos = [
  "/assets/commercial-finished-stucco.jpeg",
  "/assets/commercial-entry-detail.jpeg",
  "/assets/commercial-scaffold-access.jpeg",
  "/assets/residential-finished-stucco.jpeg",
  "/assets/residential-scaffold.jpeg",
  "/assets/exterior-finish-process.jpeg",
  "/assets/commercial-masonry-scaffold.jpeg",
  "/assets/commercial-block-finish.jpeg",
  "/assets/residential-garage-finish.jpeg",
  "/assets/residential-white-stucco.jpeg",
  "/assets/residential-trim-finish.jpeg",
  "/assets/commercial-scaffold-full.jpeg",
  "/assets/commercial-shell.jpeg",
  "/assets/commercial-facade-finish.jpeg",
  "/assets/commercial-construction-scaffold.jpeg",
];

function photoSet(index: number) {
  return [photos[index % photos.length], photos[(index + 4) % photos.length], photos[(index + 9) % photos.length], photos[(index + 12) % photos.length]];
}

export default function AreaPage({ citySlug }: { citySlug: CitySlug }) {
  const { language } = useLanguage();
  const cityIndex = cityNotes.findIndex((item) => item.slug === citySlug);
  const city = cityNotes[cityIndex];
  const [hero, process, finish, system] = photoSet(cityIndex);
  const isSpanish = language === "es";
  const group = isSpanish ? city.groupEs : city.groupEn;
  const title = isSpanish ? <>Trabajo de estuco para<br /><em>{city.city}.</em></> : <>Stucco work for<br /><em>{city.city}.</em></>;
  const intro = isSpanish ? `R Vega Plastering revisa alcances residenciales, comerciales, de remodelación y construcción nueva en ${city.city}. La disponibilidad se confirma con sistema de muro, acceso, calendario y condiciones de obra.` : `R Vega Plastering reviews residential, commercial, remodel, and new-construction scopes in ${city.city}. Availability is confirmed with the wall system, access, schedule, and site conditions.`;
  const systems = isSpanish ? ["Sistemas de estuco y acabado exterior", "Lath sobre metal studs, wood framing y CMU", "EIFS, crack isolation, retexture y acceso con scaffold"] : ["Stucco and exterior finish systems", "Lath over metal studs, wood framing, and CMU", "EIFS, crack-isolation options, retexture, and scaffold access"];
  const note = isSpanish ? "Las fotografías son trabajo de campo documentado de R Vega. La ubicación exacta y el alcance de cada proyecto se confirman antes de atribuirse a una ciudad." : "The photographs are documented R Vega field work. The exact location and scope of each project are confirmed before they are attributed to a city.";
  const fieldHeading = isSpanish ? <>La evidencia debe<br /><em>leerse como evidencia.</em></> : <>Evidence should<br /><em>read like evidence.</em></>;
  const cta = isSpanish ? "Revisar mi proyecto" : "Review my project";
  const call = isSpanish ? "Llamar al equipo" : "Call the field team";
  return <div className={`area-page area-page-${citySlug}`}>
    <header className="area-header"><a href="/#coverage-atlas" className="area-brand" aria-label="R Vega Plastering"><span className="area-wordmark" role="img" aria-label="R Vega Plastering" /></a><div className="area-header-tools"><span className="area-license"><Ruler size={14} />LIC. #1114856 · C-35</span><LanguageToggle /><a href={PHONE_LINK}><Phone size={16} />{PHONE_DISPLAY}</a></div></header>
    <main>
      <section className="area-hero"><div className="area-hero-copy"><a className="area-back" href="/#coverage-atlas">← {isSpanish ? "Volver a cobertura" : "Back to coverage"}</a><div className="area-fiche"><span>FIELD FICHE / {city.city.toUpperCase()}</span><i /><strong>LIC. #1114856 · C-35</strong></div><p className="eyebrow"><span /> {group.toUpperCase()} {isSpanish ? "· NOTA DE CAMPO" : "FIELD NOTE"}</p><h1>{title}</h1><p>{intro}</p><div className="area-hero-actions"><a href="#quote" className="button button-eucalyptus">{cta}<ArrowDownRight size={18} /></a><a href={PHONE_LINK} className="text-link">{call}<Phone size={16} /></a></div></div><div className="area-hero-image"><img src={hero} alt="Documented R Vega Plastering field work" /><span>LIC. #1114856 · C-35</span></div></section>
      <section className="area-context"><div><p className="eyebrow"><span /> {isSpanish ? "DISPONIBILIDAD DE SERVICIO" : "SERVICE AVAILABILITY"}</p><h2>{isSpanish ? "Contexto de cobertura" : "Coverage context"}</h2><p className="area-community-list">{city.city} · {group} · {isSpanish ? "Hasta 200 mi según alcance" : "Up to 200 mi by project scope"}</p></div><div className="area-system-list">{systems.map((system, index) => <article key={system}><span>0{index + 1}</span><p>{system}</p><Check size={18} /></article>)}</div></section>
      <section className="area-field"><div className="area-field-ruler" aria-hidden="true"><i /><span>0</span><i /><span>1</span><i /><span>2</span><i /></div><div className="area-field-heading"><p className="eyebrow eyebrow-light"><span /> {isSpanish ? "TRABAJO DE CAMPO DOCUMENTADO" : "DOCUMENTED FIELD WORK"}</p><h2>{fieldHeading}</h2><p>{note}</p></div><div className="area-field-grid"><figure className="area-field-primary"><img src={process} alt="Documented scaffold and exterior system work" /><figcaption>01 / FIELD SYSTEM</figcaption></figure><figure><img src={finish} alt="Documented R Vega surface or finish work" /><figcaption>02 / SURFACE RECORD</figcaption></figure><figure><img src={system} alt="Documented R Vega project condition" /><figcaption>03 / FINISH RECORD</figcaption></figure></div></section>
      <section id="quote" className="area-close"><MapPin size={20} /><div><p>{city.city} · {group}</p><h2>{isSpanish ? "Cuéntanos sobre el muro." : "Tell us about the wall."}</h2></div><a className="button button-eucalyptus" href="/#quote">{cta}<ArrowDownRight size={18} /></a></section>
    </main>
  </div>;
}
