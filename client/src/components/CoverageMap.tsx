/**
 * Style guide: Taller de Cal y Sombra — the map is a field instrument, not a generic embed.
 * It uses custom markers, a coverage envelope, and an actionable city handoff to the quote form.
 */
import { FormEvent, useEffect, useRef, useState } from "react";
import { Crosshair, LocateFixed, MapPin, Search } from "lucide-react";
import { MapView } from "@/components/Map";
import { useLanguage } from "@/contexts/LanguageContext";

type City = { name: string; position: google.maps.LatLngLiteral; cluster: "valley" | "sacramento" | "bay" | "south" };

const cities: City[] = [
  { name: "Stockton", position: { lat: 37.9577, lng: -121.2908 }, cluster: "valley" },
  { name: "Manteca", position: { lat: 37.7974, lng: -121.2161 }, cluster: "valley" },
  { name: "Bakersfield", position: { lat: 35.3733, lng: -119.0187 }, cluster: "south" },
  { name: "Huron", position: { lat: 36.2027, lng: -120.1029 }, cluster: "south" },
  { name: "Sacramento", position: { lat: 38.5816, lng: -121.4944 }, cluster: "sacramento" },
  { name: "Roseville", position: { lat: 38.7521, lng: -121.288 }, cluster: "sacramento" },
  { name: "Fairfield", position: { lat: 38.2494, lng: -122.039 }, cluster: "bay" },
  { name: "Davis", position: { lat: 38.5449, lng: -121.74 }, cluster: "sacramento" },
  { name: "Woodland", position: { lat: 38.6785, lng: -121.773 }, cluster: "sacramento" },
  { name: "Folsom", position: { lat: 38.67796, lng: -121.176 }, cluster: "sacramento" },
  { name: "Brentwood", position: { lat: 37.9319, lng: -121.695 }, cluster: "bay" },
  { name: "San Jose", position: { lat: 37.3382, lng: -121.886 }, cluster: "bay" },
  { name: "Saratoga", position: { lat: 37.2638, lng: -122.023 }, cluster: "bay" },
  { name: "Union City", position: { lat: 37.5934, lng: -122.0438 }, cluster: "bay" },
];

const coverageCenter = { lat: 37.42, lng: -120.62 };

export default function CoverageMap() {
  const { language } = useLanguage();
  const [activeCity, setActiveCity] = useState("Stockton");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const mapRef = useRef<google.maps.Map | null>(null);
  const queryMarker = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  const text = language === "es" ? {
    eyebrow: "COBERTURA DE PROYECTO", title: <>Un radio se ve mejor<br />cuando tiene <em>contexto.</em></>, intro: "Explora las ciudades donde el equipo ha realizado trabajo. La disponibilidad final se revisa con alcance, calendario y condiciones de obra.", legend: "TERRITORIO DE TRABAJO", envelope: "HASTA 200 MI · SEGÚN ALCANCE", input: "Ciudad o ZIP", action: "Revisar ubicación", reset: "Vista regional", result: "Ubicación enfocada. Comparte los detalles del proyecto para revisar cobertura.", notFound: "No pudimos ubicar esa entrada. Intenta con ciudad y estado o un ZIP.", send: "Usar esta ubicación en mi solicitud", cityList: "Ciudades y áreas documentadas"
  } : {
    eyebrow: "PROJECT COVERAGE", title: <>A service area reads better<br />with <em>context.</em></>, intro: "Explore the cities where the team has completed work. Final availability is reviewed with scope, timing, and site conditions.", legend: "WORK TERRITORY", envelope: "UP TO 200 MI · BY PROJECT SCOPE", input: "City or ZIP", action: "Check location", reset: "Regional view", result: "Location focused. Share the project details so coverage can be reviewed.", notFound: "We could not locate that entry. Try a city and state or a ZIP code.", send: "Use this location in my request", cityList: "Documented cities and areas"
  };

  const focus = (city: City, zoom = 8) => {
    setActiveCity(city.name);
    if (mapRef.current) {
      mapRef.current.panTo(city.position);
      mapRef.current.setZoom(zoom);
    }
  };

  const resetView = () => {
    setActiveCity("Stockton");
    setStatus("");
    mapRef.current?.panTo(coverageCenter);
    mapRef.current?.setZoom(6);
  };

  const onMapReady = async (map: google.maps.Map) => {
    mapRef.current = map;
    map.setOptions({
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: true,
      clickableIcons: false,
      gestureHandling: "cooperative",
      styles: [
        { elementType: "geometry", stylers: [{ color: "#d9ded6" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#3b4c43" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#edf0e8" }] },
        { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#a8b7aa" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#f5f2e9" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#b5c7c0" }] },
        { featureType: "poi", stylers: [{ visibility: "off" }] },
      ],
    });
    new window.google.maps.Circle({
      map,
      center: coverageCenter,
      radius: 321869,
      strokeColor: "#315f57",
      strokeOpacity: 0.78,
      strokeWeight: 1.2,
      fillColor: "#315f57",
      fillOpacity: 0.1,
      clickable: false,
    });
    const { AdvancedMarkerElement, PinElement } = await window.google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    cities.forEach((city) => {
      const pin = new PinElement({ background: city.cluster === "south" ? "#8b6650" : "#315f57", borderColor: "#f7f4ec", glyphColor: "#f7f4ec", scale: city.name === "Stockton" ? 1.1 : 0.8 });
      const marker = new AdvancedMarkerElement({ map, position: city.position, title: city.name, content: pin.element });
      marker.addListener("click", () => focus(city, 9));
    });
    map.panTo(coverageCenter);
    map.setZoom(6);
  };

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    if (!query.trim() || !mapRef.current || !window.google) return;
    const geocoder = new window.google.maps.Geocoder();
    setStatus("");
    try {
      const response = await geocoder.geocode({ address: `${query.trim()}, California` });
      const first = response.results[0];
      if (!first?.geometry.location) throw new Error("not-found");
      mapRef.current.panTo(first.geometry.location);
      mapRef.current.setZoom(9);
      const { AdvancedMarkerElement, PinElement } = await window.google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      if (queryMarker.current) queryMarker.current.map = null;
      const pin = new PinElement({ background: "#20352d", borderColor: "#f7f4ec", glyphColor: "#f7f4ec", scale: 1.15 });
      queryMarker.current = new AdvancedMarkerElement({ map: mapRef.current, position: first.geometry.location, title: first.formatted_address, content: pin.element });
      setStatus(text.result);
    } catch {
      setStatus(text.notFound);
    }
  };

  const useCity = () => {
    const field = document.querySelector<HTMLInputElement>("input[name='city']");
    if (field) {
      field.value = activeCity;
      field.dispatchEvent(new Event("input", { bubbles: true }));
      field.dispatchEvent(new Event("change", { bubbles: true }));
    }
    document.querySelector("#quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <section className="coverage-atlas" aria-labelledby="coverage-map-title">
    <div className="coverage-atlas-copy">
      <p className="eyebrow"><span /> {text.eyebrow}</p>
      <h2 id="coverage-map-title">{text.title}</h2>
      <p>{text.intro}</p>
      <div className="coverage-atlas-rule"><Crosshair size={15} /><span>{text.envelope}</span></div>
      <form className="coverage-search" onSubmit={handleSearch}>
        <label><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.input} aria-label={text.input} /></label>
        <button type="submit">{text.action}<LocateFixed size={15} /></button>
      </form>
      {status && <p className="coverage-status">{status}</p>}
      <div className="coverage-city-list"><span>{text.cityList}</span><div>{cities.map((city) => <button key={city.name} className={activeCity === city.name ? "is-active" : ""} onClick={() => focus(city)} type="button">{city.name}</button>)}</div></div>
    </div>
    <div className="coverage-map-shell">
      <MapView className="coverage-map-base" initialCenter={coverageCenter} initialZoom={6} onMapReady={onMapReady} />
      <div className="coverage-map-wash" aria-hidden="true" />
      <div className="coverage-map-legend"><span><i />{text.legend}</span><button onClick={resetView} type="button">{text.reset}</button></div>
      <div className="coverage-map-city"><MapPin size={16} /><div><span>{activeCity}</span><strong>{text.envelope}</strong></div></div>
      <button className="coverage-map-quote" onClick={useCity} type="button">{text.send}<span>↗</span></button>
    </div>
  </section>;
}
