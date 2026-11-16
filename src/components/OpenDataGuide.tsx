import {ExternalLink} from 'lucide-react';
import {UI_TEXT} from '../data/i18n';
import {MEDIA_ASSETS} from '../data/mediaAssets';
import {OPEN_DATA_SOURCES} from '../data/moqueguaData';
import type {Lang} from '../types/agro';
import {SectionComments} from './SectionComments';

interface OpenDataGuideProps {
  lang: Lang;
}

export function OpenDataGuide({lang}: OpenDataGuideProps) {
  const t = UI_TEXT[lang];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-6">
      <div className="rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fs-accent)]">
          06 · {t.dataEyebrow}
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--fs-ink)] mt-1 text-balance">
          {t.dataHeading}
        </h1>
        <p className="text-sm text-[var(--fs-ink-muted)] mt-2 max-w-3xl leading-relaxed">{t.dataDesc}</p>
      </div>

      {/* Tarjetas comparativas NASA + Perú con imagen debajo del texto de cada bloque */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {OPEN_DATA_SOURCES.map((item) => {
          const media = MEDIA_ASSETS[item.imageKey];
          return (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-5 space-y-4"
            >
              <div className="space-y-4">
                <div className="border-b border-[var(--fs-border)] pb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B45309] block">
                    {t.colGap}
                  </span>
                  <p className="text-sm font-medium text-[var(--fs-ink)] mt-1 leading-relaxed">{item.gap[lang]}</p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--fs-accent)] block">
                    {t.colNasa}
                  </span>
                  <h2 className="font-display text-lg font-bold text-[var(--fs-ink)]">{item.nasaSource.name}</h2>
                  <p className="text-xs sm:text-sm text-[var(--fs-ink-muted)] leading-relaxed">
                    {item.nasaSource.detail[lang]}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1">
                    <a
                      href={item.nasaSource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#0369A1] hover:underline"
                    >
                      {t.visitPortal}
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                    {item.nasaSource.extraUrls?.map((extra) => (
                      <a
                        key={extra.url}
                        href={extra.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#0369A1] hover:underline"
                      >
                        {extra.label}
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[var(--fs-border)] pt-3 space-y-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--fs-ink-muted)] block">
                    {t.colPeru}
                  </span>
                  <h3 className="font-display text-base font-bold text-[var(--fs-ink)]">{item.peruSource.name}</h3>
                  <p className="text-xs sm:text-sm text-[var(--fs-ink-muted)] leading-relaxed">
                    {item.peruSource.detail[lang]}
                  </p>
                  <a
                    href={item.peruSource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0369A1] hover:underline pt-0.5"
                  >
                    {t.visitPortal}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Imagen debajo del texto del enlace tal como solicitó el usuario */}
              <div className="pt-2">
                <img
                  src={media.src}
                  alt={lang === 'es' ? media.altEs : media.altEn}
                  referrerPolicy="no-referrer"
                  className="aspect-[4/3] w-full rounded-lg border border-[var(--fs-border)] object-cover"
                />
              </div>
            </article>
          );
        })}
      </div>

      <SectionComments lang={lang} sectionId="datos" />
    </div>
  );
}
