/**
 * Style guide: Taller de Cal y Sombra — service pages should feel like a precise field guide.
 * Use mineral imagery, clear scope framing and an editorial, non-generic conversion path.
 */
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, Phone, Ruler } from "lucide-react";

type ServiceKind = "exterior" | "interior" | "lath";

const logoUrl = "/assets/brand-icon.png";

const content: Record<ServiceKind, {
  eyebrow: string;
  title: string;
  emphasis: string;
  intro: string;
  image: string;
  imageAlt: string;
  imageNote?: string;
  focusTitle: string;
  focus: string[];
  notes: Array<[string, string]>;
  question: string;
}> = {
  exterior: {
    eyebrow: "SERVICIO 01 / EXTERIOR",
    title: "Estuco exterior",
    emphasis: "con un plan claro.",
    intro: "Para reparaciones, remodelaciones y superficies nuevas, la conversación empieza con la condición del muro, la ubicación y el tipo de acabado que buscas.",
    image: "/assets/project-residential-front.jpg",
    imageAlt: "Fachada residencial con acabado exterior de estuco",
    imageNote: "Fotografía de obra real",
    focusTitle: "Antes de hablar de textura, revisamos la superficie.",
    focus: ["Estado visual de la superficie y área de trabajo", "Ubicación, acceso y relación con el resto de la fachada", "Tipo de intervención: reparación, remodelación o construcción nueva"],
    notes: [["Reparación", "Comparte fotos del área y una vista amplia de la fachada para orientar la evaluación."], ["Remodelación", "Indica qué cambia alrededor del muro: ventanas, puertas, ampliación o materiales vecinos."], ["Construcción nueva", "Cuéntanos en qué etapa está el proyecto y qué tipo de acabado se está considerando."]],
    question: "¿Tienes una fachada o muro exterior que revisar?",
  },
  interior: {
    eyebrow: "SERVICIO 02 / INTERIOR",
    title: "Plaster interior",
    emphasis: "para la luz del espacio.",
    intro: "Una pared interior tiene que leerse bien a corta distancia. Cuéntanos el ambiente, la superficie existente y el tipo de resultado que imaginas.",
    image: "/assets/interior-arch-detail.jpg",
    imageAlt: "Detalle de una apertura interior con pared de plaster clara",
    focusTitle: "La superficie, la iluminación y el uso del cuarto cambian la conversación.",
    focus: ["Pared de acento, área completa o reparación puntual", "Fotos con luz natural y una toma amplia del cuarto", "Textura actual, cambios de material y condición visible"],
    notes: [["Pared de acento", "Comparte el tamaño aproximado y una foto donde se vea la luz que recibe el muro."], ["Remodelación", "Indica si hay nuevas aberturas, luminarias, gabinetes o elementos que se conectarán al acabado."], ["Reparación", "Una foto de cerca y otra desde el cuarto ayudan a ubicar el área en contexto."]],
    question: "¿Quieres revisar una pared interior o una superficie de acento?",
  },
  lath: {
    eyebrow: "SERVICIO 03 / PREPARACIÓN",
    title: "Lath y preparación",
    emphasis: "antes de la capa final.",
    intro: "La preparación forma parte del resultado. Para conversar sobre lath y base, necesitamos entender la etapa de obra, el sustrato y el acceso al área.",
    image: "/assets/process-commercial.jpg",
    imageAlt: "Equipo aplicando material en fachada comercial sobre andamio",
    imageNote: "Fotografía de obra real",
    focusTitle: "Antes del acabado, la base necesita una lectura ordenada.",
    focus: ["Etapa actual del proyecto y condición del sustrato", "Dimensiones aproximadas, ubicación y acceso", "Relación con ventanas, esquinas, transiciones y materiales contiguos"],
    notes: [["Construcción nueva", "Indica si el proyecto está listo para esta etapa o qué trabajo anterior sigue pendiente."], ["Ampliación", "Comparte una vista amplia que muestre cómo se une la nueva área con la existente."], ["Remodelación", "Explica qué se retiró o cambió para entender la superficie que recibirá la preparación."]],
    question: "¿Estás preparando una superficie para el siguiente paso?",
  },
};

export default function ServicePage({ kind }: { kind: ServiceKind }) {
  const service = content[kind];
  return (
    <div className="detail-page">
      <header className="detail-header">
        <a className="detail-brand" href="/"><span><img src={logoUrl} alt="" /></span><strong>R VEGA <small>PLASTERING</small></strong></a>
        <a className="detail-back" href="/"><ArrowLeft size={17} /> Inicio</a>
        <a className="detail-phone" href="tel:+12096405323"><Phone size={15} />(209) 640-5323</a>
      </header>
      <main>
        <section className="detail-hero">
          <div className="detail-hero-copy">
            <p className="eyebrow"><span /> {service.eyebrow}</p>
            <h1>{service.title}<br /><em>{service.emphasis}</em></h1>
            <p>{service.intro}</p>
            <a href="/#cotizar" className="button button-eucalyptus">Revisar mi proyecto <ArrowUpRight size={18} /></a>
          </div>
          <div className="detail-hero-media"><img src={service.image} alt={service.imageAlt} /><span><Ruler size={16} /> C-35 / STOCKTON</span>{service.imageNote && <small>{service.imageNote}</small>}</div>
        </section>
        <div className="detail-field-rule" aria-label={`Ficha técnica ${service.eyebrow}`}><i /><span>C-35 · FICHA DE CAMPO · {service.eyebrow}</span><i /></div>

        <section className="detail-focus">
          <div className="detail-section-title"><p className="eyebrow"><span /> QUÉ COMPARTIR</p><h2>{service.focusTitle}</h2></div>
          <div className="detail-focus-list">{service.focus.map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p><Check size={18} /></div>)}</div>
        </section>

        <section className="detail-notes">
          <div><p className="eyebrow eyebrow-light"><span /> CONTEXTO DEL PROYECTO</p><h2>La información correcta<br /><em>reduce vueltas.</em></h2><p className="detail-note-copy">Estas notas no sustituyen una visita. Sirven para preparar mejor la primera conversación y ayudar a identificar el siguiente paso.</p></div>
          <div className="detail-note-cards">{service.notes.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className="detail-cta"><div><p className="eyebrow"><span /> SIGUIENTE PASO</p><h2>{service.question}</h2></div><a className="detail-cta-button" href="/#cotizar">Empezar solicitud <ChevronRight size={22} /></a></section>
      </main>
      <footer className="detail-footer"><span>ESTUCO · PLASTER · LATHING</span><span>LIC. #1114856 · C-35</span><a href="/">R VEGA PLASTERING</a></footer>
    </div>
  );
}
