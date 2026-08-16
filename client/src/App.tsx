/** Style guide: Taller de Cal y Sombra — the public site remains light, mineral and editorial. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import LeadprimeWidget from "./components/LeadprimeWidget";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import AreaPage from "./pages/AreaPage";

const ExteriorStucco = () => <ServicePage kind="exterior" />;
const InteriorPlaster = () => <ServicePage kind="interior" />;
const LathPreparation = () => <ServicePage kind="lath" />;
const StocktonArea = () => <AreaPage citySlug="stockton" />;
const MantecaArea = () => <AreaPage citySlug="manteca" />;
const BakersfieldArea = () => <AreaPage citySlug="bakersfield" />;
const HuronArea = () => <AreaPage citySlug="huron" />;
const SacramentoArea = () => <AreaPage citySlug="sacramento" />;
const RosevilleArea = () => <AreaPage citySlug="roseville" />;
const FairfieldArea = () => <AreaPage citySlug="fairfield" />;
const DavisArea = () => <AreaPage citySlug="davis" />;
const WoodlandArea = () => <AreaPage citySlug="woodland" />;
const FolsomArea = () => <AreaPage citySlug="folsom" />;
const BrentwoodArea = () => <AreaPage citySlug="brentwood" />;
const SanJoseArea = () => <AreaPage citySlug="san-jose" />;
const SaratogaArea = () => <AreaPage citySlug="saratoga" />;
const UnionCityArea = () => <AreaPage citySlug="union-city" />;

function Router() {
  return <Switch><Route path="/exterior-stucco" component={ExteriorStucco} /><Route path="/interior-plaster" component={InteriorPlaster} /><Route path="/lath-preparation" component={LathPreparation} /><Route path="/areas/stockton" component={StocktonArea} /><Route path="/areas/manteca" component={MantecaArea} /><Route path="/areas/bakersfield" component={BakersfieldArea} /><Route path="/areas/huron" component={HuronArea} /><Route path="/areas/sacramento" component={SacramentoArea} /><Route path="/areas/roseville" component={RosevilleArea} /><Route path="/areas/fairfield" component={FairfieldArea} /><Route path="/areas/davis" component={DavisArea} /><Route path="/areas/woodland" component={WoodlandArea} /><Route path="/areas/folsom" component={FolsomArea} /><Route path="/areas/brentwood" component={BrentwoodArea} /><Route path="/areas/san-jose" component={SanJoseArea} /><Route path="/areas/saratoga" component={SaratogaArea} /><Route path="/areas/union-city" component={UnionCityArea} /><Route path="/" component={Home} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><LanguageProvider><TooltipProvider><Toaster /><Router /><LeadprimeWidget /></TooltipProvider></LanguageProvider></ThemeProvider></ErrorBoundary>;
}
