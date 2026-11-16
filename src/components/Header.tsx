import {SECTION_META, UI_TEXT} from '../data/i18n';
import type {Lang, SectionId} from '../types/agro';

interface HeaderProps {
  lang: Lang;
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

const TOP_NAV_SECTIONS: SectionId[] = ['inicio', 'mapa', 'simulador', 'calendario', 'galeria'];

export function Header({lang, activeSection, onNavigate}: HeaderProps) {
  const t = UI_TEXT[lang];
  const ctaTarget: SectionId = activeSection === 'crisis' ? 'datos' : 'crisis';

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--fs-border)] bg-[var(--fs-canvas)]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
        {/* Zona 1: Marca en una sola línea */}
        <button
          type="button"
          onClick={() => onNavigate('inicio')}
          className="font-display text-xl font-bold tracking-tight text-[var(--fs-accent)] whitespace-nowrap shrink-0 cursor-pointer"
        >
          {t.brandName}
        </button>

        {/* Zona 2: 5 enlaces de navegación concisos de una línea */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--fs-ink-muted)]"
        >
          {TOP_NAV_SECTIONS.map((sec) => {
            const isActive = activeSection === sec;
            return (
              <button
                key={sec}
                type="button"
                onClick={() => onNavigate(sec)}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer underline-offset-4 ${
                  isActive
                    ? 'font-bold text-[var(--fs-accent)] underline'
                    : 'hover:text-[var(--fs-ink)] hover:underline'
                }`}
              >
                {SECTION_META[sec].shortLabel[lang]}
              </button>
            );
          })}
        </nav>

        {/* Zona 3: Acceso directo sin botón de instalación */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onNavigate(ctaTarget)}
            className="inline-flex min-h-10 items-center rounded-lg bg-[var(--fs-accent)] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--fs-accent-hover)] cursor-pointer whitespace-nowrap shrink-0"
          >
            {SECTION_META[ctaTarget].shortLabel[lang]}
          </button>
        </div>
      </div>
    </header>
  );
}
