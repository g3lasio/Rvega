/** Style guide: the official Leadprime widget is isolated so CRM infrastructure never changes the crafted site shell. */
import { useEffect } from "react";

const WIDGET_TOKEN = "lp_wid_20e3ae4af9bfe75b29b457acd08d9339e90de29e";
const WIDGET_SCRIPT_URL = "https://leadprime.chyrris.com/api/widget/embed.js";

export default function LeadprimeWidget() {
  useEffect(() => {
    const existing = document.getElementById("leadprime-widget-embed");
    if (existing) return;
    const script = document.createElement("script");
    script.id = "leadprime-widget-embed";
    script.src = WIDGET_SCRIPT_URL;
    script.async = true;
    script.dataset.token = WIDGET_TOKEN;
    script.dataset.agentName = "R Vega Project Desk";
    script.dataset.lang = "auto";
    script.dataset.color = "#315F57";
    script.dataset.position = "bottom-right";
    script.dataset.theme = "dark";
    script.dataset.greeting = "Tell us about the wall, finish, or project you want to review.";
    script.dataset.logo = "/assets/brand-icon.png";
    document.body.appendChild(script);
  }, []);

  return null;
}
