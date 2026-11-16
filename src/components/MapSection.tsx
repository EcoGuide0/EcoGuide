import {MapPin} from 'lucide-react';
import {UI_TEXT} from '../data/i18n';
import {MOQUEGUA_PROVINCES, VALLEY_WAYPOINTS} from '../data/moqueguaData';
import type {Lang, NasaClimateData, NasaGibsLayerKey, ProvinceKey} from '../types/agro';
import {MonthlyClimateChart} from './MonthlyClimateChart';
import {MoqueguaMap} from './MoqueguaMap';
import {SectionComments} from './SectionComments';

interface MapSectionProps {
  lang: Lang;
  provinceKey: ProvinceKey;
  lat: number;
  lon: number;
  gibsLayer: NasaGibsLayerKey;
  gibsOpacity: number;
  climate: NasaClimateData;
  onGibsLayerChange: (layer: NasaGibsLayerKey) => void;
  onGibsOpacityChange: (opacity: number) => void;
  onSelectProvince: (key: ProvinceKey) => void;
  onCoordinatesChange: (lat: number, lon: number, provinceHint?: ProvinceKey, label?: string) => void;
}

export function MapSection({
  lang,
  provinceKey,
  lat,
  lon,
  gibsLayer,
  gibsOpacity,
  climate,
  onGibsLayerChange,
  onGibsOpacityChange,
  onSelectProvince,
  onCoordinatesChange,
}: MapSectionProps) {
  const t = UI_TEXT[lang];
  const province = MOQUEGUA_PROVINCES[provinceKey];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-6">
      {/* Introducción guiada breve */}
      <div className="rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fs-accent)]">
          01 · {t.mapHeading}
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--fs-ink)] mt-1 text-balance">
          {t.mapIntroTitle}
        </h1>
        <p className="text-sm text-[var(--fs-ink-muted)] mt-2 max-w-4xl leading-relaxed">
          {t.mapIntroBody}
        </p>
      </div>

      {/* Selector territorial distribuido arriba del mapa para dejar más espacio al visor */}
      <div className="rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fs-ink-muted)] mb-2">
              {t.selectProvinceLabel}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(MOQUEGUA_PROVINCES) as ProvinceKey[]).map((key) => {
                const p = MOQUEGUA_PROVINCES[key];
                const active = key === provinceKey;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => onSelectProvince(key)}
                    className={`rounded-lg border px-3 py-2 text-left transition-colors cursor-pointer ${
                      active
                        ? 'border-[var(--fs-accent)] bg-[var(--fs-accent)] text-white'
                        : 'border-[var(--fs-border-strong)] bg-[var(--fs-canvas)] text-[var(--fs-ink)] hover:bg-[var(--fs-surface-muted)]'
                    }`}
                  >
                    <span className="block text-xs font-bold truncate">{p.shortName}</span>
                    <span className={`block text-[11px] truncate ${active ? 'text-white/80' : 'text-[var(--fs-ink-muted)]'}`}>
                      {p.districts.split('·')[0].trim()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fs-ink-muted)] mb-2">
              {t.quickValleysLabel}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {VALLEY_WAYPOINTS.map((wp) => {
                const isSelected = Math.abs(wp.lat - lat) < 0.01 && Math.abs(wp.lon - lon) < 0.01;
                return (
                  <button
                    key={wp.id}
                    type="button"
                    onClick={() => onCoordinatesChange(wp.lat, wp.lon, wp.provinceKey, wp.name)}
                    className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'border-[var(--fs-accent)] bg-[var(--fs-accent-soft)] text-[var(--fs-accent)] font-semibold'
                        : 'border-[var(--fs-border)] bg-[var(--fs-canvas)] text-[var(--fs-ink-muted)] hover:text-[var(--fs-ink)]'
                    }`}
                  >
                    <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                    {wp.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mapa principal ampliado */}
      <MoqueguaMap
        lang={lang}
        selectedProvince={provinceKey}
        lat={lat}
        lon={lon}
        gibsLayer={gibsLayer}
        gibsOpacity={gibsOpacity}
        onGibsLayerChange={onGibsLayerChange}
        onGibsOpacityChange={onGibsOpacityChange}
        onSelectProvince={onSelectProvince}
        onCoordinatesChange={onCoordinatesChange}
      />

      {/* 5 métricas NASA POWER distribuidas en una franja limpia */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-4">
          <span className="text-xs font-medium text-[var(--fs-ink-muted)] block">{t.metricTemp}</span>
          <strong className="font-mono-tabular text-2xl font-bold text-[var(--fs-accent)] mt-1 block">
            {climate.annual.avgTemp.toFixed(1)} <span className="text-xs font-normal">°C</span>
          </strong>
          <span className="font-mono-tabular text-xs text-[var(--fs-ink-muted)]">
            {climate.annual.minTemp}–{climate.annual.maxTemp}°C
          </span>
        </div>

        <div className="rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-4">
          <span className="text-xs font-medium text-[var(--fs-ink-muted)] block">{t.metricPrecip}</span>
          <strong className="font-mono-tabular text-2xl font-bold text-[#0369A1] mt-1 block">
            {climate.annual.precipMmYear} <span className="text-xs font-normal">mm</span>
          </strong>
          <span className="font-mono-tabular text-xs text-[var(--fs-ink-muted)]">
            {climate.annual.precipMmDay} mm/d
          </span>
        </div>

        <div className="rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-4">
          <span className="text-xs font-medium text-[var(--fs-ink-muted)] block">{t.metricHumidity}</span>
          <strong className="font-mono-tabular text-2xl font-bold text-[#0F766E] mt-1 block">
            {climate.annual.avgHumidity.toFixed(0)} <span className="text-xs font-normal">%</span>
          </strong>
          <span className="text-xs text-[var(--fs-ink-muted)]">{climate.yearLabel}</span>
        </div>

        <div className="rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-4">
          <span className="text-xs font-medium text-[var(--fs-ink-muted)] block">{t.metricSolar}</span>
          <strong className="font-mono-tabular text-2xl font-bold text-[#B45309] mt-1 block">
            {climate.annual.avgSolarKwh.toFixed(1)} <span className="text-xs font-normal">kWh</span>
          </strong>
          <span className="font-mono-tabular text-xs text-[var(--fs-ink-muted)]">
            {climate.annual.avgSolarMj} MJ/m²
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1 rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-4">
          <span className="text-xs font-medium text-[var(--fs-ink-muted)] block">{t.metricSoilMoisture}</span>
          <strong className="font-mono-tabular text-2xl font-bold text-[var(--fs-ink)] mt-1 block">
            {(climate.annual.avgSoilWetness * 100).toFixed(0)} <span className="text-xs font-normal">%</span>
          </strong>
          <span className="text-xs text-[var(--fs-ink-muted)]">0–5 cm NASA</span>
        </div>
      </div>

      {/* Perfil Regional + Ciclo Mensual lado a lado equilibrados */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-5 space-y-3.5">
          <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[var(--fs-border)] pb-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B45309] block">
                {t.cardSubtitle}
              </span>
              <h2 className="font-display text-xl font-bold text-[var(--fs-accent)] mt-0.5">
                {province.title[lang]}
              </h2>
              <p className="text-xs text-[var(--fs-ink-muted)] mt-0.5">{province.districts}</p>
            </div>
            <span className="font-mono-tabular text-xs font-semibold text-[var(--fs-ink)]">
              {province.altitude[lang]}
            </span>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed">
            <p>
              <strong className="text-[var(--fs-accent)]">{t.lblStressLevel}: </strong>
              <span className="font-semibold text-[#B45309]">{province.stressLabel[lang]}</span>
            </p>
            <p>
              <strong className="text-[var(--fs-accent)]">{t.lblCrops}: </strong>
              <span className="text-[var(--fs-ink)]">{province.crops[lang]}</span>
            </p>
            <p>
              <strong className="text-[#B91C1C]">{t.lblElNino}: </strong>
              <span className="text-[var(--fs-ink)]">{province.elNinoImpact[lang]}</span>
            </p>
            <div className="border-t border-[var(--fs-border)] pt-2.5">
              <strong className="block text-[var(--fs-accent)] mb-0.5">{t.lblTip}</strong>
              <p className="text-[var(--fs-ink)]">{province.lowCostTip[lang]}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <MonthlyClimateChart lang={lang} monthly={climate.monthly} />
        </div>
      </div>

      <SectionComments lang={lang} sectionId="mapa" />
    </div>
  );
}
