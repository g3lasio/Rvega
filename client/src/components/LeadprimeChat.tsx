/** Style guide: a calm project desk, visually ready for Leadprime but intentionally offline until credentials arrive. */
import { FormEvent, useState } from "react";
import { MessageCircle, Minus, Send, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Do not add a token here. Leadprime connection will be initialized only after the owner supplies approved credentials.
const LEADPRIME_CHAT_TOKEN = "";

const copy = {
  es: { label: "Consulta rápida", title: "Mesa de proyecto", intro: "Cuéntanos qué superficie quieres revisar.", prompts: ["Tengo una reparación", "Quiero estuco exterior", "Necesito preparar una pared"], placeholder: "Escribe tu pregunta…", send: "Enviar", pending: "El chat en vivo se conectará pronto. Por ahora puedes llamar al (209) 640-5323.", reply: "Gracias. Cuando el chat esté conectado, un miembro del equipo podrá revisar estos detalles contigo." },
  en: { label: "Quick question", title: "Project desk", intro: "Tell us which surface you want to review.", prompts: ["I have a repair", "I need exterior stucco", "I need wall preparation"], placeholder: "Type your question…", send: "Send", pending: "Live chat will be connected soon. For now, call (209) 640-5323.", reply: "Thank you. Once chat is connected, a team member can review these details with you." },
};

export default function LeadprimeChat() {
  const { language } = useLanguage();
  const text = copy[language];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const submit = (event: FormEvent) => { event.preventDefault(); if (!value.trim()) return; setMessages((current) => [...current, value.trim()]); setValue(""); };
  const choosePrompt = (prompt: string) => setMessages((current) => [...current, prompt]);
  const connected = Boolean(LEADPRIME_CHAT_TOKEN);
  return <aside className={`leadprime-chat ${open ? "is-open" : ""}`} aria-label={text.label}>
    {open && <div className="chat-panel">
      <header><div><span className="chat-presence" /> <p>{text.label}</p><h2>{text.title}</h2></div><button onClick={() => setOpen(false)} aria-label="Close chat"><Minus size={20} /></button></header>
      <div className="chat-body"><p className="chat-intro">{text.intro}</p>{messages.map((message, index) => <p className="chat-message" key={`${message}-${index}`}>{message}</p>)}{messages.length > 0 && <p className="chat-response">{connected ? text.reply : text.pending}</p>}{messages.length === 0 && <div className="chat-prompts">{text.prompts.map((prompt) => <button key={prompt} onClick={() => choosePrompt(prompt)}>{prompt}</button>)}</div>}</div>
      <form onSubmit={submit}><input value={value} onChange={(event) => setValue(event.target.value)} placeholder={text.placeholder} /><button type="submit" aria-label={text.send}><Send size={16} /></button></form>
    </div>}
    <button className="chat-trigger" onClick={() => setOpen((current) => !current)} aria-expanded={open}>{open ? <X size={20} /> : <MessageCircle size={20} />}<span>{open ? "" : text.label}</span></button>
  </aside>;
}
