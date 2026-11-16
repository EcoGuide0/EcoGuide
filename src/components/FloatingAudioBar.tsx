import {Square, Volume2} from 'lucide-react';
import {useEffect, useState} from 'react';
import {SECTION_META, UI_TEXT} from '../data/i18n';
import type {Lang, SectionId} from '../types/agro';

interface FloatingAudioBarProps {
  lang: Lang;
  activeSection: SectionId;
  narrationText: string;
}

export function FloatingAudioBar({lang, activeSection, narrationText}: FloatingAudioBarProps) {
  const t = UI_TEXT[lang];
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [slowMode, setSlowMode] = useState(false);

  useEffect(() => {
    // Detener audio al cambiar de apartado para evitar mezclar narraciones
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, [activeSection, lang]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggle = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(narrationText);
    utter.lang = lang === 'es' ? 'es-PE' : 'en-US';
    utter.rate = slowMode ? 0.84 : 0.98;
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utter);
  };

  return (
    <aside
      aria-label={t.audioBarTitle}
      className="fixed bottom-3 right-3 left-3 sm:left-auto sm:bottom-5 sm:right-5 z-50"
    >
      <div className="flex items-center justify-between gap-2.5 rounded-xl border-2 border-[#F59E0B] bg-[#0E261C] px-3.5 py-2.5 text-white shadow-xl">
        <button
          type="button"
          onClick={handleToggle}
          className={`inline-flex min-h-11 flex-1 sm:flex-initial items-center justify-center gap-2.5 rounded-lg px-4 py-2 text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
            isSpeaking
              ? 'bg-[#DC2626] text-white hover:bg-[#B91C1C]'
              : 'bg-[#F59E0B] text-[#0B1F17] hover:bg-[#FBBF24]'
          }`}
        >
          {isSpeaking ? (
            <>
              <Square className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.audioStop}</span>
            </>
          ) : (
            <>
              <Volume2 className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>
                {t.audioPlay} · {SECTION_META[activeSection].shortLabel[lang]}
              </span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setSlowMode((prev) => !prev)}
          aria-pressed={slowMode}
          className={`min-h-11 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            slowMode
              ? 'border-[#FDE68A] bg-white text-[#0E261C]'
              : 'border-white/30 bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {slowMode ? t.audioRateSlow : t.audioRateNormal}
        </button>
      </div>
    </aside>
  );
}
