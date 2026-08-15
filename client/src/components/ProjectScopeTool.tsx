/** Style guide: an interactive field note, never a false instant quote. */
import { useState } from "react";
import { ArrowDownRight, Check, Ruler } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  es: {
    eyebrow: "FICHA DE PROYECTO",
    title: "Define el primer paso.<br /><em>Sin adivinar.</em>",
    intro: "Elige tres datos. Te indicamos qué conviene preparar antes de solicitar una visita.",
    labels: ["Tipo de trabajo", "Condición", "Etapa"],
    choices: [["Exterior", "Interior", "Preparación"], ["Reparación", "Remodelación", "Nuevo"], ["Pronto", "Planificando", "En obra"]],
    ready: "Tu ficha está lista.",
    result: "Para una primera revisión útil, comparte una vista amplia, dos fotos de detalle y la ciudad del proyecto.",
    cta: "Llevar esta ficha a cotización",
    tag: "C-35 · PREPARACIÓN DE VISITA",
  },
  en: {
    eyebrow: "PROJECT FIELD NOTE",
    title: "Set the first step.<br /><em>Without guessing.</em>",
    intro: "Choose three details. We’ll tell you what to prepare before requesting a visit.",
    labels: ["Work type", "Condition", "Project stage"],
    choices: [["Exterior", "Interior", "Preparation"], ["Repair", "Remodel", "New build"], ["Soon", "Planning", "In progress"]],
    ready: "Your field note is ready.",
    result: "For a useful first review, share one wide view, two close-up photos, and the project city.",
    cta: "Take this note to a quote",
    tag: "C-35 · VISIT PREPARATION",
  },
};

export default function ProjectScopeTool() {
  const { language } = useLanguage();
  const copy = content[language];
  const [answers, setAnswers] = useState(["", "", ""]);
  const complete = answers.every(Boolean);

  return <section className="scope-tool" aria-labelledby="scope-tool-title">
    <div className="scope-tool-copy">
      <p className="eyebrow"><span /> {copy.eyebrow}</p>
      <h2 id="scope-tool-title" dangerouslySetInnerHTML={{ __html: copy.title }} />
      <p>{copy.intro}</p>
      <div className="scope-tool-tag"><Ruler size={15} /> {copy.tag}</div>
    </div>
    <div className="scope-tool-panel">
      {copy.labels.map((label, groupIndex) => <div className="scope-choice" key={label}>
        <span>0{groupIndex + 1}</span>
        <div><p>{label}</p><div className="scope-choice-options">{copy.choices[groupIndex].map((choice) => <button key={choice} className={answers[groupIndex] === choice ? "is-selected" : ""} onClick={() => setAnswers((current) => current.map((answer, index) => index === groupIndex ? choice : answer))}>{choice}</button>)}</div></div>
      </div>)}
      <div className={`scope-result ${complete ? "is-ready" : ""}`} aria-live="polite">
        <Check size={19} /><div><strong>{complete ? copy.ready : "—"}</strong><p>{complete ? copy.result : ""}</p></div>
        {complete && <a href="#cotizar">{copy.cta} <ArrowDownRight size={17} /></a>}
      </div>
    </div>
  </section>;
}
