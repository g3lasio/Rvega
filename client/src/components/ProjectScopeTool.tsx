/**
 * Style guide: Taller de Cal y Sombra — a tactile wall-study, not a conventional form.
 * CSS depth and restrained mineral light make each selection feel like a field observation.
 */
import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, Check, Crosshair, Move3D, Ruler } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Step = "surface" | "goal" | "finish";
type Selection = Record<Step, string>;

const copy = {
  en: {
    eyebrow: "PROJECT MATCH PRO",
    title: <>See the wall<br />before the <em>visit.</em></>,
    intro: "Build a visual field note in three moves. Each choice changes the study, so the next conversation begins with actual context.",
    drag: "Move over the wall to inspect depth",
    steps: [
      { id: "surface" as Step, label: "01 / Surface", prompt: "Where does the work live?", options: [["exterior", "Exterior wall"], ["interior", "Interior surface"], ["preparation", "Base & lath"]] },
      { id: "goal" as Step, label: "02 / Intent", prompt: "What needs attention?", options: [["repair", "Repair an area"], ["remodel", "Remodel a space"], ["new", "New construction"]] },
      { id: "finish" as Step, label: "03 / Finish", prompt: "What should the surface do?", options: [["protect", "Protect & unify"], ["smooth", "Smooth & refined"], ["texture", "Texture & character"]] },
    ],
    visualLabels: { exterior: "Exterior elevation", interior: "Interior plane", preparation: "Substrate / lath" },
    study: "LIVE SURFACE STUDY",
    summary: "Project brief ready.",
    summaryText: "Bring this context to the quote. The final scope still starts with photos and a review of the actual surface.",
    checklistTitle: "Add these to the request",
    checklist: ["One wide view of the wall", "Two close photos of the area", "Project city or ZIP"],
    cta: "Take this brief to a quote",
    reset: "Start a new study",
    incomplete: "Choose one option in each field to prepare your brief.",
  },
  es: {
    eyebrow: "PROJECT MATCH PRO",
    title: <>Mira el muro<br />antes de la <em>visita.</em></>,
    intro: "Crea una ficha visual en tres movimientos. Cada decisión cambia el estudio para que la conversación empiece con contexto real.",
    drag: "Mueve el cursor sobre el muro para ver profundidad",
    steps: [
      { id: "surface" as Step, label: "01 / Superficie", prompt: "¿Dónde está el trabajo?", options: [["exterior", "Muro exterior"], ["interior", "Superficie interior"], ["preparation", "Base y lath"]] },
      { id: "goal" as Step, label: "02 / Intención", prompt: "¿Qué necesita atención?", options: [["repair", "Reparar un área"], ["remodel", "Remodelar espacio"], ["new", "Construcción nueva"]] },
      { id: "finish" as Step, label: "03 / Acabado", prompt: "¿Qué debe hacer la superficie?", options: [["protect", "Proteger y unificar"], ["smooth", "Liso y fino"], ["texture", "Textura y carácter"]] },
    ],
    visualLabels: { exterior: "Elevación exterior", interior: "Plano interior", preparation: "Sustrato / lath" },
    study: "ESTUDIO DE SUPERFICIE EN VIVO",
    summary: "Ficha de proyecto lista.",
    summaryText: "Lleva este contexto a la cotización. El alcance final empieza con fotos y una revisión de la superficie real.",
    checklistTitle: "Agrega esto a la solicitud",
    checklist: ["Una vista amplia del muro", "Dos fotos de detalle del área", "Ciudad o ZIP del proyecto"],
    cta: "Llevar ficha a cotización",
    reset: "Empezar un nuevo estudio",
    incomplete: "Elige una opción en cada ficha para preparar tu resumen.",
  },
};

export default function ProjectScopeTool() {
  const { language } = useLanguage();
  const text = copy[language];
  const [selection, setSelection] = useState<Selection>({ surface: "", goal: "", finish: "" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ready = Boolean(selection.surface && selection.goal && selection.finish);
  const selectedNames = useMemo(() => text.steps.map((step) => step.options.find(([value]) => value === selection[step.id])?.[1]).filter(Boolean), [selection, text.steps]);
  useEffect(() => {
    if (ready) sessionStorage.setItem("rvega-project-match", selectedNames.join(" · "));
    else sessionStorage.removeItem("rvega-project-match");
  }, [ready, selectedNames]);
  const setChoice = (step: Step, value: string) => setSelection((current) => ({ ...current, [step]: value }));
  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => { const rect = event.currentTarget.getBoundingClientRect(); setTilt({ x: ((event.clientY - rect.top) / rect.height - .5) * -6, y: ((event.clientX - rect.left) / rect.width - .5) * 8 }); };
  const sceneClass = `match-scene is-${selection.surface || "exterior"} is-${selection.goal || "repair"} is-${selection.finish || "protect"}`;

  return <section className="match-pro section-pad" aria-labelledby="match-title">
    <div className="match-pro-heading"><div><p className="eyebrow"><span /> {text.eyebrow}</p><h2 id="match-title">{text.title}</h2></div><p>{text.intro}</p></div>
    <div className="match-pro-stage-grid">
      <div className="match-scene-shell">
        <div className={sceneClass} onPointerMove={handleMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })} style={{ "--match-x": `${tilt.x}deg`, "--match-y": `${tilt.y}deg` } as React.CSSProperties}>
          <div className="match-scene-floor" /><div className="match-scene-sun" /><div className="match-measure match-measure-top"><i /> <span>{text.study}</span></div>
          <div className="match-wall" aria-label={text.visualLabels[(selection.surface || "exterior") as keyof typeof text.visualLabels]}>
            <div className="match-wall-side" /><div className="match-wall-plane"><div className="match-window"><i /><i /><i /><i /></div><div className="match-surface-mark mark-one" /><div className="match-surface-mark mark-two" /><div className="match-surface-mark mark-three" /><div className="match-finish-light" /></div>
          </div>
          <div className="match-measure match-measure-side"><span>{text.visualLabels[(selection.surface || "exterior") as keyof typeof text.visualLabels]}</span><i /></div>
          <div className="match-orbit"><Crosshair size={15} /><span>{text.drag}</span></div>
          <div className="match-scene-label"><Move3D size={15} /><span>03D</span></div>
        </div>
      </div>
      <div className="match-panel"><div className="match-panel-top"><span><Ruler size={15} /> C-35 / FIELD STUDY</span><strong>{ready ? "03 / 03" : `${Object.values(selection).filter(Boolean).length.toString().padStart(2, "0")} / 03`}</strong></div>
        <div className="match-steps">{text.steps.map((step) => <article className={`match-step ${selection[step.id] ? "is-complete" : ""}`} key={step.id}><div className="match-step-title"><span>{step.label}</span><h3>{step.prompt}</h3></div><div className="match-options">{step.options.map(([value, label]) => <button key={value} className={selection[step.id] === value ? "is-selected" : ""} onClick={() => setChoice(step.id, value)}><i />{label}</button>)}</div></article>)}</div>
        <div className={`match-brief ${ready ? "is-ready" : ""}`} aria-live="polite">{ready ? <><div className="match-brief-title"><Check size={19} /><div><strong>{text.summary}</strong><p>{selectedNames.join(" · ")}</p></div></div><p className="match-brief-copy">{text.summaryText}</p><div className="match-checklist"><span>{text.checklistTitle}</span>{text.checklist.map((item) => <p key={item}><Check size={13} />{item}</p>)}</div><a href="#quote" className="match-brief-cta">{text.cta} <ArrowDownRight size={17} /></a><button className="match-reset" onClick={() => setSelection({ surface: "", goal: "", finish: "" })}>{text.reset}</button></> : <p className="match-incomplete">{text.incomplete}</p>}</div>
      </div>
    </div>
  </section>;
}
