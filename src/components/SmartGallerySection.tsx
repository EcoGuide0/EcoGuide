import {Droplets, FlaskConical, Leaf, Sprout, Sun} from 'lucide-react';
import {useMemo, useState} from 'react';
import {UI_TEXT} from '../data/i18n';
import {MEDIA_ASSETS} from '../data/mediaAssets';
import {GALLERY_CROPS, MOQUEGUA_SEASONS, SOILS} from '../data/moqueguaData';
import type {Lang, SoilKey} from '../types/agro';
import {SectionComments} from './SectionComments';

interface SmartGallerySectionProps {
  lang: Lang;
}

interface PhGuidance {
  category: 'acid' | 'neutral' | 'alkaline';
  label: string;
  colorClass: string;
  nutrientNote: string;
  compatibleCrops: string;
  amendmentTip: string;
}

function getPhGuidance(ph: number, lang: Lang, t: (typeof UI_TEXT)['es']): PhGuidance {
  if (ph < 6.0) {
    return {
      category: 'acid',
      label: t.galPhAcid,
      colorClass: 'border-[#DC2626] bg-[#FEE2E2] text-[#7F1D1D]',
      nutrientNote:
        lang === 'es'
          ? 'Por debajo de pH 6.0 el fósforo, calcio y magnesio quedan atrapados en el suelo y el aluminio puede dañar raíces finas, reduciendo la cosecha aunque apliques fertilizante.'
          : 'Below pH 6.0, phosphorus, calcium, and magnesium lock up while excess aluminum can stress fine roots even if you fertilize.',
      compatibleCrops:
        lang === 'es'
          ? 'Papa nativa, haba, quinua tolerante y avena forrajera en pisos altoandinos.'
          : 'Native potato, fava beans, resilient quinoa, and forage oats in highland terraces.',
      amendmentTip:
        lang === 'es'
          ? 'Aplica cal agrícola (dolomita) o ceniza vegetal bien mezclada antes de la siembra y suma compost maduro.'
          : 'Mix agricultural lime (dolomite) or wood ash before sowing and enrich with mature compost.',
    };
  }
  if (ph <= 7.5) {
    return {
      category: 'neutral',
      label: t.galPhNeutral,
      colorClass: 'border-[#16A34A] bg-[#DCFCE7] text-[#14532D]',
      nutrientNote:
        lang === 'es'
          ? 'Rango óptimo (6.0 – 7.5): casi todos los nutrientes (nitrógeno, fósforo, potasio, boro y zinc) están libres para que la planta los absorba con el agua de riego.'
          : 'Optimal range (6.0 – 7.5): nearly all macro and micronutrients (N, P, K, boron, zinc) stay soluble for root uptake.',
      compatibleCrops:
        lang === 'es'
          ? 'Palto Hass, vid pisquera, orégano de Torata, maíz amiláceo, quinua y frijol.'
          : 'Hass avocado, pisco grapes, Torata oregano, starchy corn, quinoa, and beans.',
      amendmentTip:
        lang === 'es'
          ? 'Mantén este equilibrio evitando exceso de fertilizantes ácidos; basta aportar materia orgánica (guano o compost) cada campaña.'
          : 'Maintain balance by adding organic matter (compost or aged manure) each season and avoiding over-fertilization.',
    };
  }
  return {
    category: 'alkaline',
    label: t.galPhAlkaline,
    colorClass: 'border-[#0284C7] bg-[#E0F2FE] text-[#0C4A6E]',
    nutrientNote:
      lang === 'es'
        ? 'Sobre pH 7.5 el hierro, zinc y fósforo se bloquean (hojas amarillentas o clorosis) y suele subir la salinidad por evaporación rápida en zonas costeras.'
        : 'Above pH 7.5, iron, zinc, and phosphorus precipitate (causing leaf yellowing) and coastal evaporation concentrates salts.',
    compatibleCrops:
      lang === 'es'
        ? 'Olivo de mesa (Ilo), quinua tolerante a salinidad, tuna y pitahaya.'
        : 'Table olives (Ilo), salt-tolerant quinoa, prickly pear, and pitahaya.',
    amendmentTip:
      lang === 'es'
        ? 'Aplica yeso agrícola + compost ácido (humus/estiércol) y realiza lavados lentos de sales al amanecer antes de abonar.'
        : 'Apply agricultural gypsum with organic compost and run slow dawn leaching irrigations before fertilizing.',
  };
}

export function SmartGallerySection({lang}: SmartGallerySectionProps) {
  const t = UI_TEXT[lang];
  const [soilPh, setSoilPh] = useState<number>(6.8);

  const phGuidance = useMemo(() => getPhGuidance(soilPh, lang, t), [soilPh, lang, t]);
  const phPercent = ((soilPh - 4.0) / 5.0) * 100;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Cabecera e introducción visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-5 sm:p-6 items-center">
        <div className="lg:col-span-7 space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fs-accent)]">
            04 · {t.galEyebrow}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--fs-ink)] text-balance">
            {t.galHeading}
          </h1>
          <p className="text-sm text-[var(--fs-ink-muted)] leading-relaxed max-w-3xl">{t.galIntro}</p>
        </div>

        <div className="lg:col-span-5">
          <img
            src={MEDIA_ASSETS.crops.src}
            alt={lang === 'es' ? MEDIA_ASSETS.crops.altEs : MEDIA_ASSETS.crops.altEn}
            referrerPolicy="no-referrer"
            className="aspect-[4/3] w-full rounded-lg border border-[var(--fs-border)] object-cover"
          />
        </div>
      </div>

      {/* 1. Cultivos emblemáticos */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sprout className="h-5 w-5 text-[var(--fs-accent)] shrink-0" aria-hidden="true" />
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--fs-ink)]">{t.galCropsTitle}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY_CROPS.map((crop) => (
            <article
              key={crop.id}
              className="rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <p className="font-mono-tabular text-xs font-semibold text-[#B45309]">
                  {crop.province[lang]} · {crop.altitude}
                </p>
                <h3 className="font-display text-lg font-bold text-[var(--fs-ink)]">{crop.name[lang]}</h3>
                <p className="text-xs sm:text-sm text-[var(--fs-ink-muted)] leading-relaxed">{crop.summary[lang]}</p>
              </div>

              <div className="border-t border-[var(--fs-border)] pt-3 space-y-1 text-xs">
                <p>
                  <strong className="text-[var(--fs-accent)]">{lang === 'es' ? 'pH ideal:' : 'Ideal pH:'}</strong>{' '}
                  <span className="font-mono-tabular font-semibold text-[var(--fs-ink)]">{crop.idealPh}</span>
                </p>
                <p>
                  <strong className="text-[#0369A1]">{lang === 'es' ? 'Demanda de agua:' : 'Water need:'}</strong>{' '}
                  <span className="text-[var(--fs-ink)]">{crop.waterDemand[lang]}</span>
                </p>
                <p>
                  <strong className="text-[var(--fs-ink)]">{lang === 'es' ? 'Mejor época:' : 'Best season:'}</strong>{' '}
                  <span className="text-[var(--fs-ink-muted)]">{crop.bestSeason[lang]}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 2. Tipos de suelo y capacidad de retención */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-[#0369A1] shrink-0" aria-hidden="true" />
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--fs-ink)]">{t.galSoilsTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(SOILS) as SoilKey[]).map((key) => {
            const soil = SOILS[key];
            const pct = Math.min(100, Math.round((soil.availableWaterMmPerM / 150) * 100));
            const barColor =
              key === 'franco' ? 'bg-[#16A34A]' : key === 'arenoso' ? 'bg-[#D97706]' : 'bg-[#0284C7]';

            return (
              <article
                key={key}
                className="rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-5 space-y-3"
              >
                <h3 className="font-display text-lg font-bold text-[var(--fs-ink)]">{soil.name[lang]}</h3>
                <p className="text-xs sm:text-sm text-[var(--fs-ink-muted)] leading-relaxed">
                  {soil.infiltrationNote[lang]}
                </p>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[var(--fs-ink)]">
                      {lang === 'es' ? 'Agua útil por metro' : 'Available water / m'}
                    </span>
                    <span className="font-mono-tabular font-bold text-[var(--fs-accent)]">
                      {soil.availableWaterMmPerM} mm/m
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--fs-surface-muted)] border border-[var(--fs-border)]">
                    <div className={`h-full ${barColor}`} style={{width: `${pct}%`}} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. Escala Interactiva de pH del Suelo (4.0 - 9.0) */}
      <section className="rounded-xl border border-[var(--fs-border-strong)] bg-[var(--fs-surface)] p-5 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-[var(--fs-accent)] shrink-0" aria-hidden="true" />
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--fs-ink)]">{t.galPhTitle}</h2>
            </div>
            <p className="text-sm text-[var(--fs-ink-muted)] leading-relaxed">{t.galPhSub}</p>
          </div>

          <div className="rounded-lg border border-[var(--fs-border)] bg-[var(--fs-canvas)] px-4 py-2 text-right">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--fs-ink-muted)]">
              {lang === 'es' ? 'pH seleccionado' : 'Selected pH'}
            </span>
            <strong className="font-mono-tabular text-2xl font-bold text-[var(--fs-ink)]">
              {soilPh.toFixed(1)}
            </strong>
          </div>
        </div>

        {/* Barra de color pH + deslizador */}
        <div className="space-y-3">
          <div className="relative pt-1">
            <div
              className="h-4 w-full rounded-full border border-[var(--fs-border)]"
              style={{
                background:
                  'linear-gradient(90deg, #DC2626 0%, #F59E0B 30%, #16A34A 52%, #16A34A 66%, #0284C7 84%, #1D4ED8 100%)',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute top-0 h-6 w-1.5 -translate-x-1/2 rounded-full bg-[#182B22] ring-2 ring-white"
              style={{left: `${phPercent}%`}}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[var(--fs-ink-muted)]">
            <span>4.0 ({lang === 'es' ? 'Muy ácido' : 'Very acid'})</span>
            <span>6.5 – 7.0 ({lang === 'es' ? 'Neutro ideal' : 'Optimal neutral'})</span>
            <span>9.0 ({lang === 'es' ? 'Muy alcalino' : 'Very alkaline'})</span>
          </div>

          <div>
            <label htmlFor="soil-ph-slider" className="sr-only">
              {t.galPhTitle}
            </label>
            <input
              id="soil-ph-slider"
              type="range"
              min={4.0}
              max={9.0}
              step={0.1}
              value={soilPh}
              onChange={(e) => setSoilPh(parseFloat(e.target.value))}
              className="w-full accent-[#1B4332] cursor-pointer"
            />
          </div>

          {/* Botones de ejemplo rápido por piso de Moquegua */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSoilPh(5.3)}
              className="min-h-9 rounded-lg border border-[var(--fs-border-strong)] bg-[var(--fs-canvas)] px-3 py-1.5 text-xs font-semibold text-[var(--fs-ink)] hover:bg-[var(--fs-surface-muted)] cursor-pointer"
            >
              pH 5.3 · {lang === 'es' ? 'Suelo ácido (Ubinas / Puquina)' : 'Acidic (Ubinas / Puquina)'}
            </button>
            <button
              type="button"
              onClick={() => setSoilPh(7.0)}
              className="min-h-9 rounded-lg border border-[var(--fs-border-strong)] bg-[var(--fs-canvas)] px-3 py-1.5 text-xs font-semibold text-[var(--fs-ink)] hover:bg-[var(--fs-surface-muted)] cursor-pointer"
            >
              pH 7.0 · {lang === 'es' ? 'Valle medio Moquegua' : 'Mid-valley Moquegua'}
            </button>
            <button
              type="button"
              onClick={() => setSoilPh(8.1)}
              className="min-h-9 rounded-lg border border-[var(--fs-border-strong)] bg-[var(--fs-canvas)] px-3 py-1.5 text-xs font-semibold text-[var(--fs-ink)] hover:bg-[var(--fs-surface-muted)] cursor-pointer"
            >
              pH 8.1 · {lang === 'es' ? 'Costa salina (Ilo)' : 'Coastal alkaline (Ilo)'}
            </button>
          </div>
        </div>

        {/* Diagnóstico dinámico según pH */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[var(--fs-border)] pt-4">
          <div className={`rounded-lg border p-4 space-y-1.5 ${phGuidance.colorClass}`}>
            <span className="text-xs font-bold uppercase tracking-wider block">{phGuidance.label}</span>
            <p className="text-xs sm:text-sm leading-relaxed">{phGuidance.nutrientNote}</p>
          </div>

          <div className="rounded-lg border border-[var(--fs-border)] bg-[var(--fs-canvas)] p-4 space-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--fs-accent)]">
              <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
              {lang === 'es' ? 'Cultivos compatibles' : 'Compatible crops'}
            </span>
            <p className="text-xs sm:text-sm text-[var(--fs-ink)] leading-relaxed">{phGuidance.compatibleCrops}</p>
          </div>

          <div className="rounded-lg border border-[var(--fs-border)] bg-[var(--fs-canvas)] p-4 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B45309] block">
              {lang === 'es' ? 'Corrección económica en campo' : 'Low-cost field amendment'}
            </span>
            <p className="text-xs sm:text-sm text-[var(--fs-ink)] leading-relaxed">{phGuidance.amendmentTip}</p>
          </div>
        </div>
      </section>

      {/* 4. Mejores estaciones en Moquegua */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sun className="h-5 w-5 text-[#D97706] shrink-0" aria-hidden="true" />
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--fs-ink)]">{t.galSeasonsTitle}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOQUEGUA_SEASONS.map((season) => (
              <article
                key={season.id}
                className="rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-4 space-y-2"
              >
                <span className="font-mono-tabular text-xs font-semibold text-[#B45309]">{season.months}</span>
                <h3 className="font-display text-base font-bold text-[var(--fs-ink)]">{season.name[lang]}</h3>
                <p className="text-xs sm:text-sm text-[var(--fs-ink-muted)] leading-relaxed">{season.desc[lang]}</p>
              </article>
            ))}
          </div>

          <div className="lg:col-span-4">
            <figure className="h-full overflow-hidden rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] flex flex-col">
              <img
                src={MEDIA_ASSETS.calendar.src}
                alt={lang === 'es' ? MEDIA_ASSETS.calendar.altEs : MEDIA_ASSETS.calendar.altEn}
                referrerPolicy="no-referrer"
                className="aspect-[4/3] w-full object-cover flex-1"
              />
              <figcaption className="p-3 text-xs text-[var(--fs-ink-muted)]">
                {lang === 'es'
                  ? 'Andenes de Moquegua adaptados a microclimas entre la costa y la sierra.'
                  : 'Moquegua stone terraces adapted to microclimates from coast to highlands.'}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <SectionComments lang={lang} sectionId="galeria" />
    </div>
  );
}
