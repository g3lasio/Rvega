/**
 * Style guide: Taller de Cal y Sombra — brutalismo cálido de oficio.
 * Mineral surfaces, editorial asymmetry, eucalyptus accents and tool-like interactions.
 */
import { FormEvent, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ClipboardCheck,
  ChevronRight,
  Menu,
  MoveRight,
  Phone,
  Ruler,
  Search,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";

const brandIconUrl = "/assets/brand-icon.png";
const brandWordmarkDarkUrl = "/assets/logo-dark.png";
const heroUrl = "/assets/project-residential-front.jpg";
const craftUrl = "/assets/project-bay-window.jpg";
const interiorUrl = "/assets/interior-plaster.jpg";
const processUrl = "/assets/process-commercial.jpg";
const residentialSideUrl = "/assets/project-residential-side.jpg";
const smoothingUrl = "/assets/smoothing-finish.jpg";
// Reemplazar con la URL del webhook que proporcione el negocio. Debe aceptar solicitudes CORS desde el dominio del sitio.
const WEBHOOK_ENDPOINT = "";

const services = [
  {
    number: "01",
    title: "Estuco exterior",
    text: "Instalación, reparación y acabado de muros exteriores con atención a preparación, textura y continuidad visual.",
    href: "/exterior-stucco",
  },
  {
    number: "02",
    title: "Plaster interior",
    text: "Superficies lisas, paredes de acento y texturas hechas para que la luz trabaje a favor del espacio.",
    href: "/interior-plaster",
  },
  {
    number: "03",
    title: "Lath y preparación",
    text: "Base técnica para remodelaciones y construcción nueva: detalle antes de la capa final.",
    href: "/lath-preparation",
  },
];

const steps = [
  ["01", "Cuéntanos el muro", "Comparte ubicación, alcance y algunas fotos. Revisamos el trabajo antes de prometer tiempos."],
  ["02", "Recibe un plan claro", "Alineamos preparación, acabado y próximos pasos para que sepas qué incluye el proyecto."],
  ["03", "Terminamos con intención", "Llegamos preparados, protegemos el área y dejamos un acabado listo para durar."],
];

const decisionPoints: Array<[LucideIcon, string, string]> = [
  [Search, "La visita empieza con contexto", "Ubicación, superficie, fotos y alcance. Es la base para revisar el trabajo de manera útil."],
  [ClipboardCheck, "Alcance antes de empezar", "Cada cotización debe dejar claro el tipo de superficie, la preparación y el siguiente paso."],
  [ShieldCheck, "Una especialidad, no una lista larga", "El sitio se concentra en estuco, plaster y lathing para que el mensaje sea directo."],
];

const realProjectItems = [
  [heroUrl, "01 / FACHADA RESIDENCIAL", "Superficie exterior de obra residencial."],
  [craftUrl, "02 / DETALLE EXTERIOR", "Encuentro de ventana, molduras y acabado."],
  [processUrl, "03 / EN PROCESO", "Aplicación en una fachada comercial en obra."],
  [residentialSideUrl, "04 / VISTA LATERAL", "Continuidad de muros exteriores en el mismo proyecto residencial."],
];

const faqs = [
  ["¿Qué debo enviar para solicitar una cotización?", "Comparte la ubicación aproximada, el tipo de trabajo, fotos claras de la superficie y una forma de contactarte. Con esa base podemos decirte cuál es el siguiente paso para revisar el alcance."],
  ["¿Atienden reparaciones pequeñas?", "Cuéntanos el problema y comparte imágenes del área. El alcance, el acceso y el tipo de superficie ayudan a determinar si el proyecto encaja y cómo conviene evaluarlo."],
  ["¿Trabajan en remodelación y construcción nueva?", "El sitio está preparado para ambos tipos de consulta. Indica si se trata de una reparación, una remodelación o una construcción nueva para orientar la conversación desde el principio."],
  ["¿Cómo sé si mi ubicación está dentro de su área?", "R Vega Plastering parte de Stockton. Envía la ciudad o el código postal junto con tu proyecto y confirmaremos si la visita puede programarse."],
];

function BrandLockup({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#inicio" className="brand-lockup" aria-label="R Vega Plastering, inicio">
      <span className={`brand-mark ${inverse ? "brand-mark-inverse" : ""}`}>
        <img src={brandIconUrl} alt="" />
      </span>
      <span className="brand-type">
        <strong>R VEGA</strong>
        <small>PLASTERING</small>
      </span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formSending, setFormSending] = useState(false);
  const [formError, setFormError] = useState("");

  const closeMenu = () => setMenuOpen(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    if (!WEBHOOK_ENDPOINT) {
      setFormSent(true);
      return;
    }

    setFormSending(true);
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch(WEBHOOK_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "r-vega-plastering-website", submittedAt: new Date().toISOString(), ...fields }),
      });
      if (!response.ok) throw new Error("Webhook response was not successful");
      setFormSent(true);
      form.reset();
    } catch {
      setFormError("No pudimos enviar la solicitud en este momento. Por favor llama al (209) 640-5323.");
    } finally {
      setFormSending(false);
    }
  };

  return (
    <div className="site-shell" id="inicio">
      <header className="site-header">
        <div className="header-inner">
          <BrandLockup />
          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#servicios">Servicios</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#proceso">Proceso</a>
            <a href="#preguntas">Preguntas</a>
            <a href="#cobertura">Cobertura</a>
          </nav>
          <a className="header-call" href="tel:+12096405323">
            <Phone size={15} strokeWidth={2.2} />
            <span>(209) 640-5323</span>
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-nav">
            <a onClick={closeMenu} href="#servicios">Servicios <ChevronRight size={17} /></a>
            <a onClick={closeMenu} href="#proyectos">Proyectos <ChevronRight size={17} /></a>
            <a onClick={closeMenu} href="#proceso">Proceso <ChevronRight size={17} /></a>
            <a onClick={closeMenu} href="#preguntas">Preguntas <ChevronRight size={17} /></a>
            <a onClick={closeMenu} href="#cobertura">Cobertura <ChevronRight size={17} /></a>
            <a onClick={closeMenu} href="#cotizar">Solicitar cotización <ArrowUpRight size={17} /></a>
          </div>
        )}
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <img className="hero-image" src={heroUrl} alt="Fachada residencial con acabado exterior de estuco" />
          <div className="hero-scrim" />
          <div className="hero-grid">
            <div className="hero-rail" aria-hidden="true">
              <span>STOCKTON, CA</span>
              <i />
              <span>C-35</span>
            </div>
            <div className="hero-content">
              <p className="eyebrow eyebrow-light"><span /> ESTUCO · PLASTER · LATHING</p>
              <h1 id="hero-title">Un acabado parejo<br />empieza con <em>oficio.</em></h1>
              <p className="hero-intro">Estuco, plaster y lathing para hogares, remodelaciones y proyectos de construcción en Stockton y áreas cercanas.</p>
              <div className="hero-actions">
                <a className="button button-eucalyptus" href="#cotizar">Revisar mi proyecto <ArrowDownRight size={19} /></a>
                <a className="text-link text-link-light" href="#servicios">Ver servicios <MoveRight size={18} /></a>
              </div>
            </div>
            <div className="hero-stamp">
              <Ruler size={17} />
              <span>LIC. #1114856</span>
              <span>CLASIFICACIÓN C-35</span>
            </div>
          </div>
        </section>

        <section className="service-section section-pad" id="servicios" aria-labelledby="services-title">
          <div className="measure-line" aria-hidden="true"><span>01 / OFICIO</span></div>
          <div className="section-heading split-heading">
            <p className="eyebrow"><span /> LO QUE HACEMOS</p>
            <h2 id="services-title">Superficies que se<br /><em>sienten terminadas.</em></h2>
            <p className="heading-copy">Cada proyecto empieza revisando la superficie, el uso del espacio y el acabado que realmente necesitas.</p>
          </div>
          <div className="services-layout">
            <div className="services-list">
              {services.map((service) => (
                <a className="service-card" href={service.href} key={service.number}>
                  <span className="service-number">{service.number}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                  <ArrowUpRight className="service-arrow" size={19} />
                </a>
              ))}
            </div>
            <div className="craft-photo-frame">
              <img src={craftUrl} alt="Detalle de molduras y estuco alrededor de una ventana salediza" />
              <div className="photo-caption"><span>DETALLE EXTERIOR</span><strong>Uniones, líneas y textura que se leen de cerca.</strong></div>
            </div>
          </div>
        </section>

        <section className="decision-section" aria-labelledby="decision-title">
          <div className="decision-photo"><img src={smoothingUrl} alt="Detalle de la última pasada de plaster sobre una pared" /></div>
          <div className="decision-content">
            <p className="eyebrow"><span /> ANTES DE LA COTIZACIÓN</p>
            <h2 id="decision-title">Mejor información.<br /><em>Mejor comienzo.</em></h2>
            <p className="decision-intro">Una solicitud útil no necesita ser complicada. Solo necesita el contexto correcto para empezar la conversación con orden.</p>
            <div className="decision-list">
              {decisionPoints.map(([Icon, title, text]) => (
                <article key={title}>
                  <span className="decision-icon"><Icon size={19} /></span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="proof-section" id="proceso" aria-labelledby="process-title">
          <div className="proof-image-wrap">
            <img src={processUrl} alt="Equipo trabajando sobre andamio en una fachada comercial" />
          </div>
          <div className="proof-content">
            <p className="eyebrow eyebrow-light"><span /> NUESTRO PROCESO</p>
            <h2 id="process-title">Del soporte al<br /><em>acabado.</em></h2>
            <div className="process-list">
              {steps.map(([number, title, text]) => (
                <article className="process-item" key={number}>
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="work-section section-pad" id="proyectos" aria-labelledby="projects-title">
          <div className="work-heading">
            <div><p className="eyebrow"><span /> TRABAJO DOCUMENTADO</p><h2 id="projects-title">Proyectos que<br /><em>muestran el oficio.</em></h2></div>
            <p>Una selección de fotografías de obra y acabados suministradas por el equipo. Cada proyecto tiene condiciones distintas; la visita permite definir el alcance real de la siguiente intervención.</p>
          </div>
          <div className="work-grid">
            {realProjectItems.map(([image, label, description], index) => (
              <figure className={`work-card work-card-${index + 1}`} key={label}>
                <img src={image} alt={`${label}: ${description}`} />
                <figcaption><span>{String(index + 1).padStart(2, "0")} / {label}</span><strong>{description}</strong></figcaption>
              </figure>
            ))}
          </div>
          <a className="work-cta" href="#cotizar">¿Tienes una superficie que revisar? <ArrowDownRight size={20} /></a>
        </section>

        <section className="coverage-section section-pad" id="cobertura" aria-labelledby="coverage-title">
          <div className="coverage-copy">
            <p className="eyebrow"><span /> DONDE TRABAJAMOS</p>
            <h2 id="coverage-title">Hecho para los muros<br />de <em>Central Valley.</em></h2>
            <p>Con base en Stockton, trabajamos en proyectos residenciales y de remodelación de la zona. Cuéntanos dónde está el trabajo y te diremos si estamos dentro del área de servicio.</p>
            <ul className="check-list">
              <li><Check size={18} /> Stockton y zonas cercanas</li>
              <li><Check size={18} /> Remodelación y construcción nueva</li>
              <li><Check size={18} /> Revisión de alcance antes de iniciar</li>
            </ul>
            <a href="#cotizar" className="text-link">Consultar ubicación <MoveRight size={18} /></a>
          </div>
          <div className="interior-frame">
            <img src={interiorUrl} alt="Interior luminoso con pared de plaster de acabado fino" />
            <span className="vertical-label">STOCKTON / CA</span>
          </div>
        </section>

        <section className="faq-section" id="preguntas" aria-labelledby="faq-title">
          <div className="faq-intro">
            <p className="eyebrow eyebrow-light"><span /> PREGUNTAS FRECUENTES</p>
            <h2 id="faq-title">Respuestas antes<br />de <em>la llamada.</em></h2>
            <p>Cuando lleguen las fotos y la ubicación, podremos revisar el siguiente paso con mejor contexto.</p>
            <a href="#cotizar" className="text-link text-link-light">Enviar mi proyecto <MoveRight size={18} /></a>
          </div>
          <Accordion type="single" collapsible className="faq-list">
            {faqs.map(([question, answer], index) => (
              <AccordionItem value={`faq-${index}`} key={question}>
                <AccordionTrigger><span>{String(index + 1).padStart(2, "0")}</span>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="quote-section" id="cotizar" aria-labelledby="quote-title">
          <div className="quote-rail" aria-hidden="true"><span>02 / COTIZACIÓN</span></div>
          <div className="quote-copy">
            <p className="eyebrow eyebrow-light"><span /> HABLEMOS DEL TRABAJO</p>
            <h2 id="quote-title">Tu proyecto merece<br />un <em>plan claro.</em></h2>
            <p>Comparte algunos detalles y prepararemos la mejor forma de revisar el alcance contigo.</p>
            <a className="phone-block" href="tel:+12096405323"><Phone size={20} /><span>LLÁMANOS</span><strong>(209) 640-5323</strong></a>
          </div>
          <form className="quote-form" onSubmit={handleSubmit}>
            {formSent ? (
              <div className="form-success">
                <ShieldCheck size={38} />
                <h3>Solicitud preparada.</h3>
                <p>La conexión de recepción se activará al definir el correo comercial de la LLC. Por ahora, puedes llamar al (209) 640-5323 para revisar tu proyecto.</p>
                <button type="button" onClick={() => setFormSent(false)}>Enviar otra solicitud</button>
              </div>
            ) : (
              <>
                <label>Nombre<input required name="name" placeholder="Tu nombre" /></label>
                <label>Teléfono<input required name="phone" type="tel" placeholder="(000) 000-0000" /></label>
                <label>Correo<input required name="email" type="email" placeholder="nombre@correo.com" /></label>
                <label>Ciudad o ZIP<input required name="location" placeholder="Stockton, CA o 95204" /></label>
                <label>Tipo de proyecto<select required name="project"><option value="">Seleccionar</option><option>Estuco exterior</option><option>Plaster interior</option><option>Reparación</option><option>Otro</option></select></label>
                <label className="full-width">Cuéntanos un poco<textarea name="details" placeholder="Ubicación, tipo de superficie y cualquier detalle útil." rows={3} /></label>
                <button className="button button-light full-width" type="submit" disabled={formSending}>{formSending ? "Enviando…" : "Preparar solicitud"} <Send size={17} /></button>
                {formError && <p className="form-error">{formError}</p>}
                <p className="form-note">Formulario de pre-lanzamiento. El seguimiento por correo se conectará antes de activar campañas de Meta o Google.</p>
              </>
            )}
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main"><div><BrandLockup inverse /><img className="official-footer-wordmark" src={brandWordmarkDarkUrl} alt="R Vega Plastering" /></div><p>Estuco, plaster y lathing con una ruta de trabajo clara.</p></div>
        <div className="footer-meta"><span>STOCKTON, CALIFORNIA</span><span>LIC. #1114856 · C-35</span><span>© {new Date().getFullYear()} R VEGA PLASTERING</span></div>
      </footer>
    </div>
  );
}
