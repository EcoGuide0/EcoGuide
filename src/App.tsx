import {ArrowLeft, Globe, Sun, Wifi, WifiOff} from 'lucide-react';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {CrisisSection} from './components/CrisisSection';
import {FloatingAudioBar} from './components/FloatingAudioBar';
import {Header} from './components/Header';
import {HomeSemicircle} from './components/HomeSemicircle';
import {MapSection} from './components/MapSection';
import {OpenDataGuide} from './components/OpenDataGuide';
import {PlantingCalendar} from './components/PlantingCalendar';
import {SmartGallerySection} from './components/SmartGallerySection';
import {WaterSimulator} from './components/WaterSimulator';
import {SECTION_META, UI_TEXT} from './data/i18n';
import {
  CRISIS_BY_PROVINCE,
  MOQUEGUA_PROVINCES,
  OFFLINE_PROVINCE_BASELINES,
  VALLEY_WAYPOINTS,
} from './data/moqueguaData';
import {useOnlineStatus} from './hooks/useOnlineStatus';
import type {
  Lang,
  NasaClimateData,
  NasaGibsLayerKey,
  ProvinceKey,
  SectionId,
  SoilKey,
} from './types/agro';
import {runAgronomicSimulation} from './utils/agronomy';
import {fetchNasaPowerMonthly, getCachedNasaData} from './utils/nasaPower';

const ISOLATED_SECTIONS: Exclude<SectionId, 'inicio'>[] = [
  'mapa',
  'simulador',
  'calendario',
  'galeria',
  'crisis',
  'datos',
];

export default function App() {
  const isOnline = useOnlineStatus();

  const [activeSection, setActiveSection] = useState<SectionId>('inicio');

  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem('fs_lang') === 'en' ? 'en' : 'es';
    } catch {
      return 'es';
    }
  });

  const [sunMode, setSunMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('fs_sun_mode') === 'true';
    } catch {
      return false;
    }
  });

  const [provinceKey, setProvinceKey] = useState<ProvinceKey>('mariscal_nieto');
  const [lat, setLat] = useState<number>(MOQUEGUA_PROVINCES.mariscal_nieto.lat);
  const [lon, setLon] = useState<number>(MOQUEGUA_PROVINCES.mariscal_nieto.lon);
  const [activeValleyLabel, setActiveValleyLabel] = useState<string>('Valle Moquegua / Samegua');

  const [gibsLayer, setGibsLayer] = useState<NasaGibsLayerKey>('ndvi');
  const [gibsOpacity, setGibsOpacity] = useState<number>(0.75);

  const [climate, setClimate] = useState<NasaClimateData>(OFFLINE_PROVINCE_BASELINES.mariscal_nieto);
  const [isLoadingNasa, setIsLoadingNasa] = useState<boolean>(true);

  const [currentCropKey, setCurrentCropKey] = useState<string>('palto');
  const [rotationCropKey, setRotationCropKey] = useState<string>('quinua');
  const [soilKey, setSoilKey] = useState<SoilKey>('franco');
  const [areaHectares, setAreaHectares] = useState<number>(2);

  const t = UI_TEXT[lang];
  const province = MOQUEGUA_PROVINCES[provinceKey];

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('fs_lang', lang);
    } catch {
      // ignore
    }
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle('sun-mode', sunMode);
    try {
      localStorage.setItem('fs_sun_mode', String(sunMode));
    } catch {
      // ignore
    }
  }, [sunMode]);

  const navigateSection = useCallback((next: SectionId) => {
    setActiveSection(next);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  const loadCoordinateClimate = useCallback(
    async (targetLat: number, targetLon: number, provKey: ProvinceKey) => {
      setIsLoadingNasa(true);
      if (!navigator.onLine) {
        setClimate(getCachedNasaData(targetLat, targetLon, provKey));
        setIsLoadingNasa(false);
        return;
      }
      const data = await fetchNasaPowerMonthly(targetLat, targetLon, provKey);
      setClimate(data);
      setIsLoadingNasa(false);
    },
    []
  );

  useEffect(() => {
    loadCoordinateClimate(lat, lon, provinceKey);
  }, [lat, lon, provinceKey, loadCoordinateClimate]);

  const handleSelectProvince = useCallback((key: ProvinceKey) => {
    const prov = MOQUEGUA_PROVINCES[key];
    setProvinceKey(key);
    setLat(prov.lat);
    setLon(prov.lon);
    const defaultWp = VALLEY_WAYPOINTS.find((v) => v.provinceKey === key);
    setActiveValleyLabel(defaultWp ? defaultWp.name : prov.shortName);
    if (key === 'ilo') {
      setCurrentCropKey('olivo');
      setSoilKey('arenoso');
    } else if (key === 'sanchez_cerro') {
      setCurrentCropKey('maiz');
      setSoilKey('arcilloso');
    } else {
      setCurrentCropKey('palto');
      setSoilKey('franco');
    }
  }, []);

  const handleCoordinatesChange = useCallback(
    (nextLat: number, nextLon: number, provHint?: ProvinceKey, label?: string) => {
      const cleanLat = parseFloat(nextLat.toFixed(4));
      const cleanLon = parseFloat(nextLon.toFixed(4));
      const inferredProv: ProvinceKey =
        provHint ??
        (cleanLat > -16.85 ? 'sanchez_cerro' : cleanLat < -17.38 && cleanLon < -71.08 ? 'ilo' : 'mariscal_nieto');
      setProvinceKey(inferredProv);
      setLat(cleanLat);
      setLon(cleanLon);
      setActiveValleyLabel(label ?? `${cleanLat}, ${cleanLon}`);
    },
    []
  );

  const simulation = useMemo(
    () =>
      runAgronomicSimulation({
        climate,
        provinceKey,
        currentCropKey,
        rotationCropKey,
        soilKey,
        areaHectares,
        lang,
      }),
    [climate, provinceKey, currentCropKey, rotationCropKey, soilKey, areaHectares, lang]
  );

  // Texto accesible leído en voz alta por la barra flotante de alto contraste
  const narrationText = useMemo(() => {
    if (activeSection === 'inicio') {
      return lang === 'es'
        ? `Bienvenido a ECOGUIDE Moquegua. ${t.homeHeadline}. ${t.homeSub}`
        : `Welcome to ECOGUIDE Moquegua. ${t.homeHeadline}. ${t.homeSub}`;
    }
    if (activeSection === 'mapa') {
      return lang === 'es'
        ? `Mapa satelital en ${activeValleyLabel}, ${province.title.es}. Temperatura media NASA de ${climate.annual.avgTemp.toFixed(1)} grados, lluvia anual estimada de ${climate.annual.precipMmYear} milímetros y humedad superficial de suelo de ${(climate.annual.avgSoilWetness * 100).toFixed(0)} por ciento. ${province.lowCostTip.es}`
        : `Satellite map for ${activeValleyLabel}, ${province.title.en}. NASA mean temperature ${climate.annual.avgTemp.toFixed(1)} degrees, estimated annual rain ${climate.annual.precipMmYear} millimeters, and topsoil moisture ${(climate.annual.avgSoilWetness * 100).toFixed(0)} percent. ${province.lowCostTip.en}`;
    }
    if (activeSection === 'simulador') {
      return simulation.spokenDiagnosis;
    }
    if (activeSection === 'calendario') {
      return lang === 'es'
        ? `Calendario agrícola semáforo para ${province.title.es}. Rojo indica riego crítico, amarillo ventana de siembra, verde cosecha y blanco descanso del suelo. Toca o posa el cursor en cualquier mes para escuchar o leer el motivo técnico.`
        : `Traffic-light agricultural calendar for ${province.title.en}. Red indicates critical irrigation, yellow sowing, green harvest, and white soil rest.`;
    }
    if (activeSection === 'galeria') {
      return lang === 'es'
        ? `Galería inteligente de Moquegua. Explora cultivos emblemáticos como palto Hass, olivo de Ilo, orégano y quinua, compara la retención de agua de suelos franco, arenoso y arcilloso, y prueba la escala interactiva de pH del suelo entre cuatro y nueve.`
        : `Moquegua Smart Gallery. Explore signature crops, compare loam, sandy, and clay water retention, and test the interactive soil pH scale from 4 to 9.`;
    }
    if (activeSection === 'crisis') {
      const c = CRISIS_BY_PROVINCE[provinceKey];
      return `${c.headline[lang]}. ${c.plainSummary[lang]}`;
    }
    return lang === 'es'
      ? `Datos abiertos oficiales. Encuentra enlaces directos a misiones NASA GPM, ECOSTRESS y SMAP junto con ANA Observatorio del Agua, MIDAGRI SIEA y SENAMHI Perú.`
      : `Open scientific data. Access direct links to NASA GPM, ECOSTRESS, and SMAP alongside Peru ANA, MIDAGRI, and SENAMHI portals.`;
  }, [activeSection, lang, t, activeValleyLabel, province, climate, simulation.spokenDiagnosis, provinceKey]);

  const sourceLabel = isLoadingNasa
    ? t.statusLoading
    : !isOnline
    ? t.statusOffline
    : climate.source === 'cache'
    ? t.statusCache
    : climate.source === 'baseline'
    ? t.statusBaseline
    : t.statusOnline;

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[var(--fs-canvas)] text-[var(--fs-ink)]">
      <Header lang={lang} activeSection={activeSection} onNavigate={navigateSection} />

      {/* Barra operativa del espacio de trabajo + regreso a Inicio y cambio entre los 6 apartados únicos */}
      <div className="border-b border-[var(--fs-border)] bg-[var(--fs-surface)]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-[var(--fs-ink-muted)]">
            {activeSection !== 'inicio' && (
              <button
                type="button"
                onClick={() => navigateSection('inicio')}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[var(--fs-accent)] bg-[var(--fs-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--fs-accent)] hover:bg-[var(--fs-accent)] hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                {t.backToHome}
              </button>
            )}

            <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--fs-ink)]">
              {isOnline ? (
                <Wifi className="h-3.5 w-3.5 text-[#15803D]" aria-hidden="true" />
              ) : (
                <WifiOff className="h-3.5 w-3.5 text-[#B45309]" aria-hidden="true" />
              )}
              {sourceLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular text-[var(--fs-ink)]">{activeValleyLabel}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setLang((prev) => (prev === 'es' ? 'en' : 'es'))}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[var(--fs-border-strong)] bg-[var(--fs-canvas)] px-3 py-1.5 text-xs font-semibold text-[var(--fs-ink)] hover:bg-[var(--fs-surface-muted)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              {t.btnLangSwitch}
            </button>

            <button
              type="button"
              onClick={() => setSunMode((prev) => !prev)}
              aria-pressed={sunMode}
              className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                sunMode
                  ? 'border-[#000000] bg-[#000000] text-white'
                  : 'border-[#B45309] bg-[#FEF3C7] text-[#78350F] hover:bg-[#FDE68A]'
              }`}
            >
              <Sun className="h-3.5 w-3.5" aria-hidden="true" />
              {sunMode ? t.btnSunModeActive : t.btnSunMode}
            </button>
          </div>
        </div>

        {/* Selector horizontal compacto de los 6 apartados cuando el usuario está dentro de un módulo */}
        {activeSection !== 'inicio' && (
          <div className="border-t border-[var(--fs-border)] bg-[var(--fs-canvas)]">
            <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2 sm:px-6">
              {ISOLATED_SECTIONS.map((sec) => {
                const isActive = activeSection === sec;
                const meta = SECTION_META[sec];
                return (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => navigateSection(sec)}
                    className={`min-h-9 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'border-[var(--fs-accent)] bg-[var(--fs-accent)] text-white'
                        : 'border-[var(--fs-border)] bg-[var(--fs-surface)] text-[var(--fs-ink-muted)] hover:text-[var(--fs-ink)]'
                    }`}
                  >
                    <span className="font-mono-tabular mr-1.5 opacity-80">{meta.number}</span>
                    {meta.shortLabel[lang]}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Renderizado exclusivo del apartado activo para evitar choques entre secciones */}
      <main className="flex-1">
        {activeSection === 'inicio' && <HomeSemicircle lang={lang} onNavigate={navigateSection} />}

        {activeSection === 'mapa' && (
          <MapSection
            lang={lang}
            provinceKey={provinceKey}
            lat={lat}
            lon={lon}
            gibsLayer={gibsLayer}
            gibsOpacity={gibsOpacity}
            climate={climate}
            onGibsLayerChange={setGibsLayer}
            onGibsOpacityChange={setGibsOpacity}
            onSelectProvince={handleSelectProvince}
            onCoordinatesChange={handleCoordinatesChange}
          />
        )}

        {activeSection === 'simulador' && (
          <WaterSimulator
            lang={lang}
            provinceKey={provinceKey}
            currentCropKey={currentCropKey}
            rotationCropKey={rotationCropKey}
            soilKey={soilKey}
            areaHectares={areaHectares}
            simulation={simulation}
            onCurrentCropChange={setCurrentCropKey}
            onRotationCropChange={setRotationCropKey}
            onSoilChange={setSoilKey}
            onAreaChange={setAreaHectares}
            onRecalculate={() => loadCoordinateClimate(lat, lon, provinceKey)}
          />
        )}

        {activeSection === 'calendario' && (
          <PlantingCalendar
            lang={lang}
            provinceKey={provinceKey}
            currentCropKey={currentCropKey}
            rotationCropKey={rotationCropKey}
            monthlyClimate={climate.monthly}
          />
        )}

        {activeSection === 'galeria' && <SmartGallerySection lang={lang} />}

        {activeSection === 'crisis' && (
          <CrisisSection lang={lang} provinceKey={provinceKey} onSelectProvince={handleSelectProvince} />
        )}

        {activeSection === 'datos' && <OpenDataGuide lang={lang} />}
      </main>

      <footer className="border-t border-[var(--fs-border)] bg-[var(--fs-accent)] py-7 pb-24 sm:pb-24 px-4 text-center text-xs text-white/90">
        <p className="font-display text-base font-bold text-white">{t.footerTitle}</p>
        <p className="mt-1.5 opacity-85 max-w-3xl mx-auto leading-relaxed">{t.footerDesc}</p>
      </footer>

      {!isOnline && (
        <div
          role="status"
          className="fixed bottom-20 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-sm z-40 flex items-center gap-2 rounded-lg border border-[#B45309] bg-[#FEF3C7] px-3.5 py-2.5 text-xs font-semibold text-[#78350F] shadow-lg"
        >
          <WifiOff className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{t.offlineBanner}</span>
        </div>
      )}

      {/* Barra fija de alto contraste de lectura por voz para accesibilidad */}
      <FloatingAudioBar lang={lang} activeSection={activeSection} narrationText={narrationText} />
    </div>
  );
}
