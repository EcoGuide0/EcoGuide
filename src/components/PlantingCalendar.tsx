import {Info} from 'lucide-react';
import {useState} from 'react';
import {UI_TEXT} from '../data/i18n';
import {MEDIA_ASSETS} from '../data/mediaAssets';
import {CROPS, getCalendarCellJustification, MOQUEGUA_PROVINCES} from '../data/moqueguaData';
import type {CalendarPhase, Lang, MonthlyClimatePoint, ProvinceKey} from '../types/agro';
import {SectionComments} from './SectionComments';

interface PlantingCalendarProps {
  lang: Lang;
  provinceKey: ProvinceKey;
  currentCropKey: string;
  rotationCropKey: string;
  monthlyClimate: MonthlyClimatePoint[];
}

export function PlantingCalendar({
  lang,
  provinceKey,
  currentCropKey,
  rotationCropKey,
  monthlyClimate,
}: PlantingCalendarProps) {
  const t = UI_TEXT[lang];
  const currentCrop = CROPS[currentCropKey] ?? CROPS.alfalfa;
  const rotationCrop = CROPS[rotationCropKey] ?? CROPS.quinua;
  const province = MOQUEGUA_PROVINCES[provinceKey];

  const [hoveredCell, setHoveredCell] = useState<{cropKey: string; monthIndex: number}>({
    cropKey: currentCrop.key,
    monthIndex: new Date().getMonth(),
  });

  // Colores semáforo explícitos solicitados: Rojo (Riego crítico), Amarillo (Siembra), Verde (Cosecha), Blanco (Descanso)
  const phaseStyle = (phase: CalendarPhase) => {
    switch (phase) {
      case 'peak':
        return {
          cell: 'bg-[#FEE2E2] text-[#991B1B] border-[#DC2626] hover:bg-[#FECACA]',
          swatch: 'bg-[#DC2626] border-[#991B1B]',
          label: t.phasePeak,
        };
      case 'sow':
        return {
          cell: 'bg-[#FEF3C7] text-[#92400E] border-[#D97706] hover:bg-[#FDE68A]',
          swatch: 'bg-[#F59E0B] border-[#B45309]',
          label: t.phaseSow,
        };
      case 'harvest':
        return {
          cell: 'bg-[#DCFCE7] text-[#14532D] border-[#16A34A] hover:bg-[#BBF7D0]',
          swatch: 'bg-[#16A34A] border-[#15803D]',
          label: t.phaseHarvest,
        };
      default:
        return {
          cell: 'bg-[#FFFFFF] text-[#334155] border-[#CBD5E1] hover:bg-[#F8FAFC]',
          swatch: 'bg-[#FFFFFF] border-[#94A3B8]',
          label: t.phaseRest,
        };
    }
  };

  const rows = [
    {crop: currentCrop, phases: currentCrop.calendarByProvince[provinceKey]},
    {crop: rotationCrop, phases: rotationCrop.calendarByProvince[provinceKey]},
  ];

  const inspectedCrop = CROPS[hoveredCell.cropKey] ?? currentCrop;
  const inspectedPhase = inspectedCrop.calendarByProvince[provinceKey][hoveredCell.monthIndex] ?? 'rest';
  const inspectedClimate = monthlyClimate[hoveredCell.monthIndex];
  const justificationText = getCalendarCellJustification({
    crop: inspectedCrop,
    provinceKey,
    monthIndex: hoveredCell.monthIndex,
    phase: inspectedPhase,
    climatePoint: inspectedClimate,
    lang,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-6">
      {/* Cabecera con contexto visual agrícola */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-5 items-center">
        <div className="lg:col-span-7 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fs-accent)]">
            03 · {t.calEyebrow}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--fs-ink)] text-balance">
            {t.calHeading} — {province.shortName}
          </h1>
          <p className="text-sm text-[var(--fs-ink-muted)] leading-relaxed">{t.calSub}</p>

          {/* Leyenda visual de semáforo Rojo / Amarillo / Verde / Blanco */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-[var(--fs-ink)]">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3.5 w-3.5 rounded-sm bg-[#DC2626] border border-[#991B1B]" />
              {t.phasePeak}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3.5 w-3.5 rounded-sm bg-[#F59E0B] border border-[#B45309]" />
              {t.phaseSow}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3.5 w-3.5 rounded-sm bg-[#16A34A] border border-[#15803D]" />
              {t.phaseHarvest}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3.5 w-3.5 rounded-sm bg-[#FFFFFF] border border-[#64748B]" />
              {t.phaseRest}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          <img
            src={MEDIA_ASSETS.calendar.src}
            alt={lang === 'es' ? MEDIA_ASSETS.calendar.altEs : MEDIA_ASSETS.calendar.altEn}
            referrerPolicy="no-referrer"
            className="aspect-[4/3] w-full rounded-lg border border-[var(--fs-border)] object-cover"
          />
          <img
            src={MEDIA_ASSETS.crops.src}
            alt={lang === 'es' ? MEDIA_ASSETS.crops.altEs : MEDIA_ASSETS.crops.altEn}
            referrerPolicy="no-referrer"
            className="aspect-[4/3] w-full rounded-lg border border-[var(--fs-border)] object-cover"
          />
        </div>
      </div>

      {/* Tabla semáforo interactiva */}
      <div className="overflow-x-auto rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)]">
        <table className="w-full min-w-[820px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-[var(--fs-border)] bg-[var(--fs-surface-muted)]">
              <th className="px-4 py-3 font-semibold text-[var(--fs-ink)] w-52">
                {lang === 'es' ? 'Cultivo · Piso Provincial' : 'Crop · Provincial Belt'}
              </th>
              {t.monthsShort.map((mName, idx) => {
                const minT = monthlyClimate[idx]?.t2mMin ?? 10;
                const frostRisk = minT < 4;
                return (
                  <th key={mName} className="px-2 py-3 text-center font-semibold text-[var(--fs-ink)]">
                    <span>{mName}</span>
                    <span
                      className={`block font-mono-tabular text-[10px] font-normal ${
                        frostRisk ? 'text-[#0369A1] font-semibold' : 'text-[var(--fs-ink-muted)]'
                      }`}
                    >
                      mín {minT.toFixed(0)}°C
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map(({crop, phases}) => (
              <tr key={crop.key} className="border-b last:border-b-0 border-[var(--fs-border)]">
                <td className="px-4 py-4 font-semibold text-[var(--fs-ink)]">{crop.name[lang]}</td>
                {phases.map((phase, idx) => {
                  const style = phaseStyle(phase);
                  const isActive = hoveredCell.cropKey === crop.key && hoveredCell.monthIndex === idx;
                  return (
                    <td key={`${crop.key}-${idx}`} className="px-1.5 py-3 text-center">
                      <button
                        type="button"
                        onMouseEnter={() => setHoveredCell({cropKey: crop.key, monthIndex: idx})}
                        onFocus={() => setHoveredCell({cropKey: crop.key, monthIndex: idx})}
                        onClick={() => setHoveredCell({cropKey: crop.key, monthIndex: idx})}
                        className={`w-full rounded-md border px-1.5 py-2.5 text-[11px] font-bold leading-tight transition-transform cursor-pointer ${style.cell} ${
                          isActive ? 'ring-2 ring-[#182B22] scale-[1.03]' : ''
                        }`}
                      >
                        {style.label}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tarjeta fija de justificación al posar el cursor o tocar cualquier recuadro */}
      <div className="rounded-xl border border-[var(--fs-border-strong)] bg-[var(--fs-surface)] p-5 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--fs-accent)]">
            <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              {t.calJustificationTitle}: {t.monthsFull[hoveredCell.monthIndex]} ·{' '}
              {inspectedCrop.name[lang].split('(')[0].trim()}
            </span>
          </div>
          <span className="text-xs text-[var(--fs-ink-muted)]">{t.calHoverHint}</span>
        </div>

        <p className="text-sm leading-relaxed text-[var(--fs-ink)]">{justificationText}</p>
      </div>

      <SectionComments lang={lang} sectionId="calendario" />
    </div>
  );
}
