import {useState} from 'react';
import {UI_TEXT} from '../data/i18n';
import type {Lang, MonthlyClimatePoint} from '../types/agro';

interface MonthlyClimateChartProps {
  lang: Lang;
  monthly: MonthlyClimatePoint[];
}

export function MonthlyClimateChart({lang, monthly}: MonthlyClimateChartProps) {
  const t = UI_TEXT[lang];
  const [activeIdx, setActiveIdx] = useState<number>(new Date().getMonth());

  const width = 640;
  const height = 190;
  const padL = 34;
  const padR = 34;
  const padT = 18;
  const padB = 28;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const maxTemp = Math.max(30, ...monthly.map((m) => m.t2mMax)) + 2;
  const minTemp = Math.min(0, ...monthly.map((m) => m.t2mMin)) - 1;
  const maxRain = Math.max(40, ...monthly.map((m) => m.precipMmMonth)) * 1.15;

  const xAt = (i: number) => padL + ((i + 0.5) / 12) * plotW;
  const yTemp = (temp: number) => padT + ((maxTemp - temp) / Math.max(1, maxTemp - minTemp)) * plotH;
  const yRain = (mm: number) => padT + plotH - (mm / Math.max(1, maxRain)) * plotH;

  const tempPath = monthly
    .map((m, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(1)} ${yTemp(m.t2m).toFixed(1)}`)
    .join(' ');

  const active = monthly[activeIdx] ?? monthly[0];
  const barW = (plotW / 12) * 0.48;

  return (
    <div className="rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-display text-base font-bold text-[var(--fs-ink)]">{t.monthlyChartTitle}</h3>
          <p className="text-xs text-[var(--fs-ink-muted)]">{t.monthlyChartSub}</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-[var(--fs-ink-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#0369A1]/70" />
            {t.legendPrecip}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-3.5 bg-[#B45309]" />
            {t.legendTemp}
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[460px] h-auto select-none"
          role="img"
          aria-label={t.monthlyChartTitle}
        >
          {/* Guías horizontales */}
          {[0, 0.25, 0.5, 0.75, 1].map((f) => {
            const y = padT + f * plotH;
            const tempVal = Math.round(maxTemp - f * (maxTemp - minTemp));
            const rainVal = Math.round((1 - f) * maxRain);
            return (
              <g key={f}>
                <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="var(--fs-border)" strokeDasharray="3 3" />
                <text x={padL - 6} y={y + 4} textAnchor="end" fontSize="10" fill="var(--fs-ink-muted)" className="font-mono-tabular">
                  {tempVal}°
                </text>
                <text x={width - padR + 6} y={y + 4} textAnchor="start" fontSize="10" fill="#0369A1" className="font-mono-tabular">
                  {rainVal}
                </text>
              </g>
            );
          })}

          {/* Barras de precipitación mensual */}
          {monthly.map((m, i) => {
            const x = xAt(i) - barW / 2;
            const y = yRain(m.precipMmMonth);
            const h = Math.max(2, padT + plotH - y);
            const isActive = i === activeIdx;
            return (
              <g
                key={m.monthIndex}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(i)}
                className="cursor-pointer"
              >
                <rect
                  x={xAt(i) - plotW / 24}
                  y={padT}
                  width={plotW / 12}
                  height={plotH}
                  fill={isActive ? 'var(--fs-surface-muted)' : 'transparent'}
                />
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={h}
                  rx={3}
                  fill={isActive ? '#0369A1' : 'rgba(3, 105, 161, 0.45)'}
                />
                <text
                  x={xAt(i)}
                  y={height - 8}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={isActive ? '700' : '500'}
                  fill={isActive ? 'var(--fs-ink)' : 'var(--fs-ink-muted)'}
                >
                  {t.monthsShort[i]}
                </text>
              </g>
            );
          })}

          {/* Curva de temperatura media */}
          <path d={tempPath} fill="none" stroke="#B45309" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

          {monthly.map((m, i) => (
            <circle
              key={`pt-${m.monthIndex}`}
              cx={xAt(i)}
              cy={yTemp(m.t2m)}
              r={i === activeIdx ? 4.5 : 2.8}
              fill={i === activeIdx ? '#B45309' : '#FFFFFF'}
              stroke="#B45309"
              strokeWidth="2"
              pointerEvents="none"
            />
          ))}
        </svg>
      </div>

      {/* Lectura tabular del mes seleccionado */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--fs-border)] pt-2.5 text-xs font-mono-tabular text-[var(--fs-ink)]">
        <span className="font-semibold text-[var(--fs-accent)]">{t.monthsShort[active.monthIndex]}</span>
        <span>
          T° {active.t2m} °C ({active.t2mMin}–{active.t2mMax} °C)
        </span>
        <span>Rain: {active.precipMmMonth} mm</span>
        <span>RH: {active.rh2m}%</span>
        <span>GWET: {(active.soilWetness * 100).toFixed(0)}%</span>
        <span>Solar: {active.solarKwh} kWh/m²</span>
      </div>
    </div>
  );
}
