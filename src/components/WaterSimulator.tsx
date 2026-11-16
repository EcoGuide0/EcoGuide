import {AlertTriangle, CheckCircle2, Droplets, Flame, RefreshCw, Snowflake} from 'lucide-react';
import {useState} from 'react';
import {UI_TEXT} from '../data/i18n';
import {MEDIA_ASSETS} from '../data/mediaAssets';
import {CROPS, MOQUEGUA_PROVINCES, SOILS} from '../data/moqueguaData';
import type {Lang, ProvinceKey, SimulationResult, SoilKey} from '../types/agro';
import {SectionComments} from './SectionComments';

interface WaterSimulatorProps {
  lang: Lang;
  provinceKey: ProvinceKey;
  currentCropKey: string;
  rotationCropKey: string;
  soilKey: SoilKey;
  areaHectares: number;
  simulation: SimulationResult;
  onCurrentCropChange: (key: string) => void;
  onRotationCropChange: (key: string) => void;
  onSoilChange: (key: SoilKey) => void;
  onAreaChange: (ha: number) => void;
  onRecalculate: () => void;
}

export function WaterSimulator({
  lang,
  provinceKey,
  currentCropKey,
  rotationCropKey,
  soilKey,
  areaHectares,
  simulation,
  onCurrentCropChange,
  onRotationCropChange,
  onSoilChange,
  onAreaChange,
  onRecalculate,
}: WaterSimulatorProps) {
  const t = UI_TEXT[lang];
  const [hoverMonth, setHoverMonth] = useState<number>(new Date().getMonth());

  const currentCropOptions = Object.values(CROPS).filter((c) => c.category === 'current' || c.category === 'both');
  const rotationCropOptions = Object.values(CROPS).filter((c) => c.category === 'rotation' || c.category === 'both');
  const province = MOQUEGUA_PROVINCES[provinceKey];
  const activeCrop = CROPS[currentCropKey] ?? CROPS.alfalfa;
  const activeRot = CROPS[rotationCropKey] ?? CROPS.quinua;

  const width = 680;
  const height = 210;
  const padL = 46;
  const padR = 16;
  const padT = 18;
  const padB = 30;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const maxM3 =
    Math.max(400, ...simulation.monthlySeries.flatMap((m) => [m.currentNeedM3Ha, m.rotationNeedM3Ha])) * 1.1;

  const groupW = plotW / 12;
  const barW = Math.min(18, groupW * 0.34);
  const yAt = (v: number) => padT + plotH - (v / Math.max(1, maxM3)) * plotH;
  const activePoint = simulation.monthlySeries[hoverMonth] ?? simulation.monthlySeries[0];

  const thermalText =
    simulation.thermalAlert === 'frost'
      ? t.thermalFrost
      : simulation.thermalAlert === 'heat'
      ? t.thermalHeat
      : t.thermalNormal;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-6">
      {/* Introducción guiada con apoyo visual fotográfico */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-5 items-center">
        <div className="lg:col-span-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fs-accent)]">
            02 · {t.simEyebrow}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--fs-ink)] text-balance">
            {t.simHeading}
          </h1>
          <p className="text-sm font-semibold text-[var(--fs-ink)]">{t.simIntroTitle}</p>
          <ul className="space-y-1.5 text-sm text-[var(--fs-ink-muted)] leading-relaxed">
            {t.simSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <figure className="overflow-hidden rounded-lg border border-[var(--fs-border)] bg-[var(--fs-canvas)]">
            <img
              src={MEDIA_ASSETS.irrigation.src}
              alt={lang === 'es' ? MEDIA_ASSETS.irrigation.altEs : MEDIA_ASSETS.irrigation.altEn}
              referrerPolicy="no-referrer"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="p-2.5 text-xs text-[var(--fs-ink-muted)]">{t.simImg1Caption}</figcaption>
          </figure>

          <figure className="overflow-hidden rounded-lg border border-[var(--fs-border)] bg-[var(--fs-canvas)]">
            <img
              src={MEDIA_ASSETS.calendar.src}
              alt={lang === 'es' ? MEDIA_ASSETS.calendar.altEs : MEDIA_ASSETS.calendar.altEn}
              referrerPolicy="no-referrer"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="p-2.5 text-xs text-[var(--fs-ink-muted)]">{t.simImg2Caption}</figcaption>
          </figure>
        </div>
      </div>

      {/* Simulador interactivo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-5 space-y-4">
          <div>
            <label htmlFor="current-crop-select" className="block text-xs font-semibold text-[var(--fs-ink)] mb-1.5">
              {t.lblCurrentCrop}
            </label>
            <select
              id="current-crop-select"
              value={currentCropKey}
              onChange={(e) => onCurrentCropChange(e.target.value)}
              className="w-full min-h-10 rounded-lg border border-[var(--fs-border-strong)] bg-[var(--fs-canvas)] px-3 py-2 text-sm font-medium text-[var(--fs-ink)] cursor-pointer"
            >
              {currentCropOptions.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.name[lang]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="rotation-crop-select" className="block text-xs font-semibold text-[var(--fs-ink)] mb-1.5">
              {t.lblRotationCrop}
            </label>
            <select
              id="rotation-crop-select"
              value={rotationCropKey}
              onChange={(e) => onRotationCropChange(e.target.value)}
              className="w-full min-h-10 rounded-lg border border-[var(--fs-border-strong)] bg-[var(--fs-canvas)] px-3 py-2 text-sm font-medium text-[var(--fs-ink)] cursor-pointer"
            >
              {rotationCropOptions.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.name[lang]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="soil-type-select" className="block text-xs font-semibold text-[var(--fs-ink)] mb-1.5">
              {t.lblSoilType}
            </label>
            <select
              id="soil-type-select"
              value={soilKey}
              onChange={(e) => onSoilChange(e.target.value as SoilKey)}
              className="w-full min-h-10 rounded-lg border border-[var(--fs-border-strong)] bg-[var(--fs-canvas)] px-3 py-2 text-sm font-medium text-[var(--fs-ink)] cursor-pointer"
            >
              {(Object.keys(SOILS) as SoilKey[]).map((k) => (
                <option key={k} value={k}>
                  {SOILS[k].name[lang]}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-[var(--fs-ink-muted)]">{SOILS[soilKey].infiltrationNote[lang]}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="area-ha-input" className="text-xs font-semibold text-[var(--fs-ink)]">
                {t.lblAreaHa}
              </label>
              <span className="font-mono-tabular text-xs font-bold text-[var(--fs-accent)]">{areaHectares} ha</span>
            </div>
            <input
              id="area-ha-input"
              type="number"
              min={0.25}
              max={50}
              step={0.25}
              value={areaHectares}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (!Number.isNaN(val)) onAreaChange(Math.min(50, Math.max(0.25, val)));
              }}
              className="w-full min-h-10 rounded-lg border border-[var(--fs-border-strong)] bg-[var(--fs-canvas)] px-3 py-2 text-sm font-mono-tabular font-medium text-[var(--fs-ink)]"
            />
            <div className="mt-2 flex items-center gap-1.5">
              {[0.5, 1, 2, 5].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onAreaChange(preset)}
                  className={`flex-1 min-h-9 rounded-md border text-xs font-mono-tabular font-semibold transition-colors cursor-pointer ${
                    areaHectares === preset
                      ? 'border-[var(--fs-accent)] bg-[var(--fs-accent)] text-white'
                      : 'border-[var(--fs-border)] bg-[var(--fs-canvas)] text-[var(--fs-ink-muted)] hover:text-[var(--fs-ink)]'
                  }`}
                >
                  {preset} ha
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onRecalculate}
            className="w-full min-h-11 inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--fs-accent)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--fs-accent-hover)] transition-colors cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            {t.btnRecalculate}
          </button>
        </div>

        <div className="lg:col-span-8 rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div
              className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold ${
                simulation.riskLevel === 'low'
                  ? 'border-[#15803D] bg-[#DCFCE7] text-[#14532D]'
                  : 'border-[var(--fs-border)] bg-[var(--fs-canvas)] text-[var(--fs-ink-muted)] opacity-55'
              }`}
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.riskLow}</span>
            </div>
            <div
              className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold ${
                simulation.riskLevel === 'moderate'
                  ? 'border-[#B45309] bg-[#FEF3C7] text-[#78350F]'
                  : 'border-[var(--fs-border)] bg-[var(--fs-canvas)] text-[var(--fs-ink-muted)] opacity-55'
              }`}
            >
              <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.riskModerate}</span>
            </div>
            <div
              className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold ${
                simulation.riskLevel === 'high'
                  ? 'border-[#B91C1C] bg-[#FEE2E2] text-[#7F1D1D]'
                  : 'border-[var(--fs-border)] bg-[var(--fs-canvas)] text-[var(--fs-ink-muted)] opacity-55'
              }`}
            >
              <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.riskHigh}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-[var(--fs-border)] py-4">
            <div>
              <span className="text-xs text-[var(--fs-ink-muted)] block">{t.kpiWeeklyWater}</span>
              <strong className="font-mono-tabular text-xl font-bold text-[var(--fs-ink)] mt-0.5 block">
                {simulation.weeklyIrrigationCurrentM3.toLocaleString()}
              </strong>
              <span className="text-xs text-[var(--fs-ink-muted)]">
                {t.perWeek} ({simulation.weeklyIrrigationRotationM3.toLocaleString()} rot.)
              </span>
            </div>

            <div>
              <span className="text-xs text-[var(--fs-ink-muted)] block">{t.kpiInterval}</span>
              <strong className="font-mono-tabular text-xl font-bold text-[#0369A1] mt-0.5 block">
                {t.everyDays.replace('{d}', String(simulation.irrigationIntervalCurrentDays))}
              </strong>
              <span className="text-xs text-[var(--fs-ink-muted)]">
                → {t.everyDays.replace('{d}', String(simulation.irrigationIntervalRotationDays))}
              </span>
            </div>

            <div>
              <span className="text-xs text-[var(--fs-ink-muted)] block">{t.kpiSavings}</span>
              <strong className="font-mono-tabular text-xl font-bold text-[#15803D] mt-0.5 block">
                −{simulation.annualSavingsPercent}%
              </strong>
              <span className="text-xs font-mono-tabular text-[var(--fs-ink-muted)]">
                {simulation.annualSavingsM3.toLocaleString()} {t.perYear}
              </span>
            </div>

            <div>
              <span className="text-xs text-[var(--fs-ink-muted)] block">{t.kpiThermalWatch}</span>
              <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[var(--fs-ink)]">
                {simulation.thermalAlert === 'frost' ? (
                  <Snowflake className="h-4 w-4 text-[#0369A1] shrink-0" aria-hidden="true" />
                ) : simulation.thermalAlert === 'heat' ? (
                  <Flame className="h-4 w-4 text-[#B45309] shrink-0" aria-hidden="true" />
                ) : (
                  <Droplets className="h-4 w-4 text-[#15803D] shrink-0" aria-hidden="true" />
                )}
                <span>{thermalText}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-sm leading-relaxed text-[var(--fs-ink)]">
            <p className="font-semibold text-[var(--fs-accent)]">{province.title[lang]}</p>
            <p>
              {lang === 'es' ? (
                <>
                  Mantener <strong>{activeCrop.name.es}</strong> en{' '}
                  <span className="font-mono-tabular">{areaHectares} ha</span> implica un estrés estimado de{' '}
                  <strong className="font-mono-tabular">{simulation.riskScore}%</strong>. Al rotar o intercalar con{' '}
                  <strong>{activeRot.name.es}</strong>, el estrés desciende a{' '}
                  <strong className="font-mono-tabular text-[#15803D]">{simulation.improvedRiskScore}%</strong>.{' '}
                  {activeRot.waterNote.es}
                </>
              ) : (
                <>
                  Keeping <strong>{activeCrop.name.en}</strong> across{' '}
                  <span className="font-mono-tabular">{areaHectares} ha</span> produces an estimated{' '}
                  <strong className="font-mono-tabular">{simulation.riskScore}%</strong> stress score. Rotating or
                  intercropping with <strong>{activeRot.name.en}</strong> drops stress to{' '}
                  <strong className="font-mono-tabular text-[#15803D]">{simulation.improvedRiskScore}%</strong>.{' '}
                  {activeRot.waterNote.en}
                </>
              )}
            </p>
          </div>

          <div className="border-t border-[var(--fs-border)] pt-4">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="font-display text-base font-bold text-[var(--fs-ink)]">{t.simChartTitle}</h3>
                <p className="text-xs text-[var(--fs-ink-muted)]">{t.simChartSub}</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-[var(--fs-ink-muted)]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#B91C1C]" />
                  {t.simChartCurrent}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#1B4332]" />
                  {t.simChartRotation}
                </span>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full min-w-[480px] h-auto select-none"
                role="img"
                aria-label={t.simChartTitle}
              >
                {[0, 0.25, 0.5, 0.75, 1].map((f) => {
                  const y = padT + f * plotH;
                  const val = Math.round((1 - f) * maxM3);
                  return (
                    <g key={f}>
                      <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="var(--fs-border)" strokeDasharray="3 3" />
                      <text
                        x={padL - 8}
                        y={y + 4}
                        textAnchor="end"
                        fontSize="10"
                        fill="var(--fs-ink-muted)"
                        className="font-mono-tabular"
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}

                {simulation.monthlySeries.map((pt, i) => {
                  const cx = padL + (i + 0.5) * groupW;
                  const isHover = i === hoverMonth;
                  const yCur = yAt(pt.currentNeedM3Ha);
                  const yRot = yAt(pt.rotationNeedM3Ha);
                  const hCur = Math.max(2, padT + plotH - yCur);
                  const hRot = Math.max(2, padT + plotH - yRot);

                  return (
                    <g
                      key={pt.monthIndex}
                      onMouseEnter={() => setHoverMonth(i)}
                      onClick={() => setHoverMonth(i)}
                      className="cursor-pointer"
                    >
                      <rect
                        x={padL + i * groupW}
                        y={padT}
                        width={groupW}
                        height={plotH}
                        fill={isHover ? 'var(--fs-surface-muted)' : 'transparent'}
                      />
                      <rect x={cx - barW - 2} y={yCur} width={barW} height={hCur} rx={3} fill="#B91C1C" />
                      <rect x={cx + 2} y={yRot} width={barW} height={hRot} rx={3} fill="#1B4332" />
                      <text
                        x={cx}
                        y={height - 10}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight={isHover ? '700' : '500'}
                        fill={isHover ? 'var(--fs-ink)' : 'var(--fs-ink-muted)'}
                      >
                        {t.monthsShort[i]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular text-[var(--fs-ink)]">
              <span className="font-semibold text-[var(--fs-accent)]">{t.monthsShort[activePoint.monthIndex]}</span>
              <span>ET0 NASA: {activePoint.et0Mm} mm</span>
              <span className="text-[#B91C1C]">
                {activeCrop.name[lang].split('(')[0].trim()}: {activePoint.currentNeedM3Ha} m³/ha
              </span>
              <span className="text-[#15803D]">
                {activeRot.name[lang].split('(')[0].trim()}: {activePoint.rotationNeedM3Ha} m³/ha
              </span>
            </div>
          </div>
        </div>
      </div>

      <SectionComments lang={lang} sectionId="simulador" />
    </div>
  );
}
