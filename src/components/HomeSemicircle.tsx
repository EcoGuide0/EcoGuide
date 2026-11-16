import {ArrowRight} from 'lucide-react';
import {useState} from 'react';
import {SECTION_META, UI_TEXT} from '../data/i18n';
import {MEDIA_ASSETS, type MediaAssetKey} from '../data/mediaAssets';
import type {Lang, SectionId} from '../types/agro';

interface HomeSemicircleProps {
  lang: Lang;
  onNavigate: (section: SectionId) => void;
}

interface WedgeSpec {
  section: Exclude<SectionId, 'inicio'>;
  mediaKey: MediaAssetKey;
  accentHex: string;
}

const WEDGES: WedgeSpec[] = [
  {section: 'mapa', mediaKey: 'valley', accentHex: '#0284C7'},
  {section: 'simulador', mediaKey: 'irrigation', accentHex: '#0F766E'},
  {section: 'calendario', mediaKey: 'calendar', accentHex: '#16A34A'},
  {section: 'galeria', mediaKey: 'crops', accentHex: '#D97706'},
  {section: 'crisis', mediaKey: 'crisis', accentHex: '#DC2626'},
  {section: 'datos', mediaKey: 'satellite', accentHex: '#1D4ED8'},
];

function polarToCartesian(cx: number, cy: number, radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy - radius * Math.sin(rad),
  };
}

function describeAnnularSector(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startDeg: number,
  endDeg: number
) {
  // startDeg > endDeg moving clockwise from 180 (left) down to 0 (right)
  const p1 = polarToCartesian(cx, cy, rOuter, startDeg);
  const p2 = polarToCartesian(cx, cy, rOuter, endDeg);
  const p3 = polarToCartesian(cx, cy, rInner, endDeg);
  const p4 = polarToCartesian(cx, cy, rInner, startDeg);

  return [
    `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`,
    `A ${rOuter} ${rOuter} 0 0 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
    `L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}`,
    `A ${rInner} ${rInner} 0 0 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)}`,
    'Z',
  ].join(' ');
}

export function HomeSemicircle({lang, onNavigate}: HomeSemicircleProps) {
  const t = UI_TEXT[lang];
  const [hovered, setHovered] = useState<Exclude<SectionId, 'inicio'>>('mapa');

  const cx = 360;
  const cy = 356;
  const rInner = 114;
  const rOuter = 318;
  const totalSpan = 180;
  const gapDeg = 2.4;
  const step = totalSpan / WEDGES.length;

  const activeMeta = SECTION_META[hovered];

  return (
    <div className="space-y-8 pb-12">
      {/* Banner principal inspirado en la imagen referencial: fondo verde valle + semicírculo de 6 gajos */}
      <section className="relative overflow-hidden bg-[#1B4332] text-white border-b border-[#143326]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Bloque izquierdo: identidad ECOGUIDE + guía rápida */}
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#FDE68A]">
                {t.homeEyebrow}
              </p>
              <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-white text-balance">
                {t.brandName}
              </h1>
              <p className="font-display text-lg sm:text-xl font-semibold text-[#E8EFEA] text-balance">
                {t.homeHeadline}
              </p>
              <p className="text-sm leading-relaxed text-[#D1DFD6] max-w-xl">
                {t.homeSub}
              </p>

              {/* Vista previa dinámica del gajo señalado */}
              <div className="rounded-xl border border-white/20 bg-[#143326] p-4 space-y-2">
                <span className="font-mono-tabular text-xs font-semibold text-[#FCD34D]">
                  {activeMeta.number} · {activeMeta.title[lang]}
                </span>
                <p className="text-xs sm:text-sm text-[#E8EFEA] leading-relaxed">
                  {activeMeta.summary[lang]}
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate(hovered)}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#D97706] px-4 py-2 text-xs font-bold text-white hover:bg-[#B45309] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>
                    {t.homeOpenSection}: {activeMeta.shortLabel[lang]}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Bloque derecho: Semicírculo interactivo dividido en 6 secciones fotográficas */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <p className="text-xs font-medium text-[#D1DFD6] mb-2 text-center">
                {t.homeInstruction}
              </p>

              <div className="w-full max-w-[680px]">
                <svg
                  viewBox="0 0 720 400"
                  className="w-full h-auto select-none"
                  role="navigation"
                  aria-label="Menú semicircular de seis secciones ECOGUIDE"
                >
                  <defs>
                    {WEDGES.map((w, idx) => {
                      const startDeg = 180 - idx * step - gapDeg / 2;
                      const endDeg = 180 - (idx + 1) * step + gapDeg / 2;
                      const pathD = describeAnnularSector(cx, cy, rInner, rOuter, startDeg, endDeg);
                      return (
                        <clipPath key={`clip-${w.section}`} id={`wedge-clip-${w.section}`}>
                          <path d={pathD} />
                        </clipPath>
                      );
                    })}
                    <linearGradient id="wedgeScrim" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#091E15" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#091E15" stopOpacity="0.72" />
                    </linearGradient>
                  </defs>

                  {/* Arco decorativo sutil de fondo */}
                  <path
                    d={describeAnnularSector(cx, cy, rInner - 8, rOuter + 8, 180, 0)}
                    fill="rgba(255,255,255,0.06)"
                  />

                  {WEDGES.map((w, idx) => {
                    const startDeg = 180 - idx * step - gapDeg / 2;
                    const endDeg = 180 - (idx + 1) * step + gapDeg / 2;
                    const midDeg = (startDeg + endDeg) / 2;
                    const pathD = describeAnnularSector(cx, cy, rInner, rOuter, startDeg, endDeg);
                    const isHover = hovered === w.section;
                    const labelPos = polarToCartesian(cx, cy, (rInner + rOuter) * 0.56, midDeg);
                    const numPos = polarToCartesian(cx, cy, rOuter - 28, midDeg);
                    const asset = MEDIA_ASSETS[w.mediaKey];
                    const meta = SECTION_META[w.section];

                    return (
                      <g
                        key={w.section}
                        role="button"
                        tabIndex={0}
                        aria-label={`${meta.number}. ${meta.title[lang]}`}
                        onMouseEnter={() => setHovered(w.section)}
                        onFocus={() => setHovered(w.section)}
                        onClick={() => onNavigate(w.section)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onNavigate(w.section);
                          }
                        }}
                        className="cursor-pointer outline-none"
                      >
                        <g clipPath={`url(#wedge-clip-${w.section})`}>
                          <image
                            href={asset.src}
                            x={cx - rOuter}
                            y={cy - rOuter}
                            width={rOuter * 2}
                            height={rOuter}
                            preserveAspectRatio="xMidYMid slice"
                          />
                          <path d={pathD} fill="url(#wedgeScrim)" />
                          {isHover && <path d={pathD} fill={w.accentHex} fillOpacity="0.22" />}
                        </g>

                        {/* Borde del gajo */}
                        <path
                          d={pathD}
                          fill="none"
                          stroke={isHover ? '#FDE68A' : '#FAF8F4'}
                          strokeWidth={isHover ? 4 : 2.5}
                        />

                        {/* Número del apartado */}
                        <circle
                          cx={numPos.x}
                          cy={numPos.y}
                          r={13}
                          fill={isHover ? '#D97706' : '#143326'}
                          stroke="#FAF8F4"
                          strokeWidth="1.5"
                        />
                        <text
                          x={numPos.x}
                          y={numPos.y + 4}
                          textAnchor="middle"
                          fontSize="10"
                          fontWeight="700"
                          fill="#FFFFFF"
                          className="font-mono-tabular"
                        >
                          {idx + 1}
                        </text>

                        {/* Etiqueta legible del gajo */}
                        <text
                          x={labelPos.x}
                          y={labelPos.y}
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="700"
                          fill="#FFFFFF"
                          style={{textShadow: '0 1px 4px rgba(0,0,0,0.9)'}}
                        >
                          {meta.shortLabel[lang]}
                        </text>
                      </g>
                    );
                  })}

                  {/* Círculo central ECOGUIDE */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={rInner - 6}
                    fill="#FAF8F4"
                    stroke="#D97706"
                    strokeWidth="4"
                  />
                  <text
                    x={cx}
                    y={cy - 22}
                    textAnchor="middle"
                    fontSize="21"
                    fontWeight="700"
                    fill="#1B4332"
                    className="font-display"
                  >
                    ECOGUIDE
                  </text>
                  <text
                    x={cx}
                    y={cy - 2}
                    textAnchor="middle"
                    fontSize="10.5"
                    fontWeight="600"
                    fill="#51635A"
                  >
                    {t.homeHubTag}
                  </text>
                  <text
                    x={cx}
                    y={cy + 18}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#B45309"
                  >
                    NASA · MOQUEGUA
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Índice rápido de las 6 secciones independientes debajo de la portada */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WEDGES.map((w) => {
            const meta = SECTION_META[w.section];
            const asset = MEDIA_ASSETS[w.mediaKey];
            return (
              <button
                key={w.section}
                type="button"
                onClick={() => onNavigate(w.section)}
                className="group flex flex-col overflow-hidden rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] text-left transition-colors hover:border-[var(--fs-accent)] cursor-pointer"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--fs-surface-muted)]">
                  <img
                    src={asset.src}
                    alt={lang === 'es' ? asset.altEs : asset.altEn}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-4 space-y-2">
                  <div>
                    <span className="font-mono-tabular text-xs font-semibold text-[#B45309]">
                      {meta.number}
                    </span>
                    <h2 className="font-display text-lg font-bold text-[var(--fs-ink)] mt-0.5">
                      {meta.title[lang]}
                    </h2>
                    <p className="text-xs leading-relaxed text-[var(--fs-ink-muted)] mt-1">
                      {meta.summary[lang]}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--fs-accent)] pt-1">
                    {t.homeOpenSection}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
