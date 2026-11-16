import L from 'leaflet';
import {Layers, Map as MapIcon} from 'lucide-react';
import {useEffect, useRef} from 'react';
import {UI_TEXT} from '../data/i18n';
import {MOQUEGUA_PROVINCES, VALLEY_WAYPOINTS} from '../data/moqueguaData';
import type {Lang, NasaGibsLayerKey, ProvinceKey} from '../types/agro';

interface MoqueguaMapProps {
  lang: Lang;
  selectedProvince: ProvinceKey;
  lat: number;
  lon: number;
  gibsLayer: NasaGibsLayerKey;
  gibsOpacity: number;
  onGibsLayerChange: (layer: NasaGibsLayerKey) => void;
  onGibsOpacityChange: (opacity: number) => void;
  onSelectProvince: (key: ProvinceKey) => void;
  onCoordinatesChange: (lat: number, lon: number, provinceHint?: ProvinceKey, label?: string) => void;
}

const GIBS_CONFIGS: Record<
  Exclude<NasaGibsLayerKey, 'none'>,
  {url: string; maxNativeZoom: number; attribution: string}
> = {
  truecolor: {
    url: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/default/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
    maxNativeZoom: 9,
    attribution: 'NASA EOSDIS GIBS MODIS Terra',
  },
  ndvi: {
    url: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_NDVI_8Day/default/default/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png',
    maxNativeZoom: 9,
    attribution: 'NASA EOSDIS GIBS MODIS NDVI 8-Day',
  },
  lst: {
    url: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_L3_Land_Surface_Temp_Daily_Day/default/default/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png',
    maxNativeZoom: 7,
    attribution: 'NASA EOSDIS GIBS MODIS LST Day',
  },
  smap: {
    url: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/SMAP_L4_Analyzed_Surface_Soil_Moisture/default/default/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png',
    maxNativeZoom: 6,
    attribution: 'NASA EOSDIS GIBS SMAP L4',
  },
};

function createParcelDivIcon() {
  return L.divIcon({
    className: 'fs-parcel-pin',
    html: `<div style="width:22px;height:22px;border-radius:9999px;background:#0369A1;border:3px solid #FFFFFF;box-shadow:0 2px 8px rgba(0,0,0,0.45);"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -12],
  });
}

function createValleyDivIcon() {
  return L.divIcon({
    className: 'fs-valley-pin',
    html: `<div style="width:12px;height:12px;border-radius:9999px;background:#D97706;border:2px solid #FFFFFF;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
}

export function MoqueguaMap({
  lang,
  selectedProvince,
  lat,
  lon,
  gibsLayer,
  gibsOpacity,
  onGibsLayerChange,
  onGibsOpacityChange,
  onSelectProvince,
  onCoordinatesChange,
}: MoqueguaMapProps) {
  const t = UI_TEXT[lang];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const gibsTileRef = useRef<L.TileLayer | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const polygonsRef = useRef<Partial<Record<ProvinceKey, L.Polygon>>>({});
  const valleyMarkersRef = useRef<L.Marker[]>([]);

  const callbacksRef = useRef({onSelectProvince, onCoordinatesChange});
  callbacksRef.current = {onSelectProvince, onCoordinatesChange};

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [lat, lon],
      zoom: MOQUEGUA_PROVINCES[selectedProvince].zoom,
      zoomControl: true,
    });
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    (Object.keys(MOQUEGUA_PROVINCES) as ProvinceKey[]).forEach((key) => {
      const prov = MOQUEGUA_PROVINCES[key];
      const poly = L.polygon(prov.polygon, {
        color: key === selectedProvince ? '#D97706' : '#1B4332',
        weight: key === selectedProvince ? 2.5 : 1.5,
        fillOpacity: key === selectedProvince ? 0.18 : 0.06,
      }).addTo(map);
      poly.bindTooltip(prov.title[lang], {sticky: true});
      poly.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        callbacksRef.current.onSelectProvince(key);
      });
      polygonsRef.current[key] = poly;
    });

    VALLEY_WAYPOINTS.forEach((wp) => {
      const m = L.marker([wp.lat, wp.lon], {icon: createValleyDivIcon()})
        .addTo(map)
        .bindTooltip(`${wp.name} (${wp.altitudeM} m)`);
      m.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        callbacksRef.current.onCoordinatesChange(wp.lat, wp.lon, wp.provinceKey, wp.name);
      });
      valleyMarkersRef.current.push(m);
    });

    const marker = L.marker([lat, lon], {
      draggable: true,
      icon: createParcelDivIcon(),
      zIndexOffset: 500,
    }).addTo(map);
    marker.bindPopup(t.popupSelected);
    marker.on('dragend', () => {
      const pos = marker.getLatLng();
      callbacksRef.current.onCoordinatesChange(pos.lat, pos.lng);
    });
    markerRef.current = marker;

    map.on('click', (e) => {
      callbacksRef.current.onCoordinatesChange(e.latlng.lat, e.latlng.lng);
    });

    const resizeTimer = window.setTimeout(() => map.invalidateSize(), 200);
    const onResize = () => map.invalidateSize();
    window.addEventListener('resize', onResize);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      map.remove();
      mapRef.current = null;
      polygonsRef.current = {};
      valleyMarkersRef.current = [];
      markerRef.current = null;
      gibsTileRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Real NASA GIBS WMTS overlay swap + opacity
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (gibsTileRef.current) {
      map.removeLayer(gibsTileRef.current);
      gibsTileRef.current = null;
    }
    if (gibsLayer !== 'none') {
      const cfg = GIBS_CONFIGS[gibsLayer];
      const layer = L.tileLayer(cfg.url, {
        attribution: cfg.attribution,
        maxNativeZoom: cfg.maxNativeZoom,
        maxZoom: 18,
        opacity: gibsOpacity,
      });
      layer.addTo(map);
      gibsTileRef.current = layer;
    }
  }, [gibsLayer, gibsOpacity]);

  // Sync marker position and map center when coordinates/province change
  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;
    if (!map || !marker) return;
    marker.setLatLng([lat, lon]);
    map.panTo([lat, lon], {animate: true, duration: 0.4});
  }, [lat, lon]);

  useEffect(() => {
    (Object.keys(MOQUEGUA_PROVINCES) as ProvinceKey[]).forEach((key) => {
      const poly = polygonsRef.current[key];
      if (!poly) return;
      poly.setStyle({
        color: key === selectedProvince ? '#D97706' : '#1B4332',
        weight: key === selectedProvince ? 2.5 : 1.5,
        fillOpacity: key === selectedProvince ? 0.18 : 0.06,
      });
      poly.setTooltipContent(MOQUEGUA_PROVINCES[key].title[lang]);
    });
    if (markerRef.current) {
      markerRef.current.setPopupContent(t.popupSelected);
    }
  }, [selectedProvince, lang, t.popupSelected]);

  const activeLegend =
    gibsLayer === 'ndvi'
      ? t.gibsLegendNdvi
      : gibsLayer === 'lst'
      ? t.gibsLegendLst
      : gibsLayer === 'smap'
      ? t.gibsLegendSmap
      : gibsLayer === 'truecolor'
      ? t.gibsLegendTrueColor
      : null;

  return (
    <div className="rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-display text-lg font-bold text-[var(--fs-accent)]">{t.mapHeading}</h3>
          <p className="text-xs text-[var(--fs-ink-muted)] mt-0.5">{t.mapSubheading}</p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--fs-border)] bg-[var(--fs-surface-muted)] px-3 py-1.5 text-xs font-medium text-[var(--fs-ink-muted)]">
          <MapIcon className="h-3.5 w-3.5 text-[var(--fs-accent)] shrink-0" aria-hidden="true" />
          {t.mapBaseOpenLabel}
        </span>
      </div>

      {/* Selector de capas reales NASA GIBS WMTS */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--fs-border)] bg-[var(--fs-surface-muted)] px-3 py-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--fs-ink)] mr-1">
            <Layers className="h-3.5 w-3.5 text-[var(--fs-accent)]" aria-hidden="true" />
            {t.gibsLayerLabel}
          </span>
          {(
            [
              ['none', t.gibsNone],
              ['ndvi', t.gibsNdvi],
              ['lst', t.gibsLst],
              ['smap', t.gibsSmap],
              ['truecolor', t.gibsTrueColor],
            ] as [NasaGibsLayerKey, string][]
          ).map(([layerKey, label]) => (
            <button
              key={layerKey}
              type="button"
              onClick={() => onGibsLayerChange(layerKey)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                gibsLayer === layerKey
                  ? 'bg-[var(--fs-accent)] text-white'
                  : 'bg-[var(--fs-surface)] text-[var(--fs-ink-muted)] border border-[var(--fs-border)] hover:text-[var(--fs-ink)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {gibsLayer !== 'none' && (
          <label className="flex items-center gap-2 text-xs font-medium text-[var(--fs-ink)] shrink-0">
            <span>{t.gibsOpacity}</span>
            <input
              type="range"
              min={0.25}
              max={1}
              step={0.05}
              value={gibsOpacity}
              onChange={(e) => onGibsOpacityChange(parseFloat(e.target.value))}
              className="w-20 accent-[#1B4332] cursor-pointer"
            />
            <span className="font-mono-tabular w-9 text-right">{Math.round(gibsOpacity * 100)}%</span>
          </label>
        )}
      </div>

      <div
        ref={containerRef}
        className="h-[380px] sm:h-[460px] lg:h-[520px] w-full rounded-lg border border-[var(--fs-border)] cursor-crosshair"
        aria-label={t.mapHeading}
      />

      {activeLegend && (
        <p className="mt-2.5 text-xs text-[var(--fs-ink-muted)] border-t border-[var(--fs-border)] pt-2">
          {activeLegend}
        </p>
      )}

      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--fs-ink-muted)]">
        <div>
          <span>{t.lblCoords}: </span>
          <strong className="font-mono-tabular text-[var(--fs-ink)]">
            {lat.toFixed(4)}, {lon.toFixed(4)}
          </strong>
        </div>
        <span>{t.mapHint}</span>
      </div>
    </div>
  );
}
