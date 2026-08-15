/** Style guide: Taller de Cal y Sombra — the public site remains light, mineral and editorial. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import LeadprimeChat from "./components/LeadprimeChat";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";

const ExteriorStucco = () => <ServicePage kind="exterior" />;
const InteriorPlaster = () => <ServicePage kind="interior" />;
const LathPreparation = () => <ServicePage kind="lath" />;

function Router() {
  return <Switch><Route path="/exterior-stucco" component={ExteriorStucco} /><Route path="/interior-plaster" component={InteriorPlaster} /><Route path="/lath-preparation" component={LathPreparation} /><Route path="/" component={Home} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><LanguageProvider><TooltipProvider><Toaster /><Router /><LeadprimeChat /></TooltipProvider></LanguageProvider></ThemeProvider></ErrorBoundary>;
}
