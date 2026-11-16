import {Download, MessageSquarePlus} from 'lucide-react';
import {useEffect, useState, type FormEvent} from 'react';
import {SECTION_META, UI_TEXT} from '../data/i18n';
import type {Lang, SectionComment, SectionId} from '../types/agro';

interface SectionCommentsProps {
  lang: Lang;
  sectionId: SectionId;
}

const STORAGE_KEY = 'ecoguia_comments_v1';

function loadAllComments(): SectionComment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SectionComment[]) : [];
  } catch {
    return [];
  }
}

function saveAllComments(items: SectionComment[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore quota errors
  }
}

export function SectionComments({lang, sectionId}: SectionCommentsProps) {
  const t = UI_TEXT[lang];
  const [allComments, setAllComments] = useState<SectionComment[]>(() => loadAllComments());
  const [author, setAuthor] = useState('');
  const [zone, setZone] = useState('');
  const [kind, setKind] = useState<'question' | 'feedback'>('question');
  const [message, setMessage] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    const onStorage = () => setAllComments(loadAllComments());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const sectionComments = allComments.filter((c) => c.sectionId === sectionId);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanMsg = message.trim();
    if (!cleanMsg) return;

    const nextItem: SectionComment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      sectionId,
      author: author.trim() || (lang === 'es' ? 'Agricultor / Visitante' : 'Farmer / Visitor'),
      zone: zone.trim() || 'Moquegua',
      kind,
      message: cleanMsg,
      createdAt: new Date().toISOString(),
    };

    const updated = [nextItem, ...allComments];
    setAllComments(updated);
    saveAllComments(updated);
    setMessage('');
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 3000);
  };

  const triggerDownload = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], {type: mime});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportJson = () => {
    const rows = sectionComments.length > 0 ? sectionComments : allComments;
    triggerDownload(JSON.stringify(rows, null, 2), `ecoguide-${sectionId}-comentarios.json`, 'application/json');
  };

  const handleExportCsv = () => {
    const rows = sectionComments.length > 0 ? sectionComments : allComments;
    const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
    const header = ['id', 'section', 'kind', 'author', 'zone', 'message', 'created_at'].join(',');
    const body = rows.map((r) =>
      [esc(r.id), esc(r.sectionId), esc(r.kind), esc(r.author), esc(r.zone), esc(r.message), esc(r.createdAt)].join(',')
    );
    triggerDownload([header, ...body].join('\n'), `ecoguide-${sectionId}-comentarios.csv`, 'text/csv;charset=utf-8');
  };

  return (
    <section className="mt-8 rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-5 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--fs-border)] pb-4">
        <div>
          <h3 className="font-display text-xl font-bold text-[var(--fs-ink)]">
            {t.commentsTitle} · {SECTION_META[sectionId].title[lang]}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--fs-ink-muted)] mt-1">{t.commentsSub}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleExportCsv}
            disabled={allComments.length === 0}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[var(--fs-border-strong)] bg-[var(--fs-canvas)] px-3 py-1.5 text-xs font-semibold text-[var(--fs-ink)] hover:bg-[var(--fs-surface-muted)] disabled:opacity-45 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            {t.commentExportCsv}
          </button>
          <button
            type="button"
            onClick={handleExportJson}
            disabled={allComments.length === 0}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[var(--fs-border-strong)] bg-[var(--fs-canvas)] px-3 py-1.5 text-xs font-semibold text-[var(--fs-ink)] hover:bg-[var(--fs-surface-muted)] disabled:opacity-45 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            {t.commentExportJson}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder={t.commentNamePlaceholder}
            className="min-h-10 rounded-lg border border-[var(--fs-border-strong)] bg-[var(--fs-canvas)] px-3 py-2 text-sm text-[var(--fs-ink)]"
          />
          <input
            type="text"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            placeholder={t.commentZonePlaceholder}
            className="min-h-10 rounded-lg border border-[var(--fs-border-strong)] bg-[var(--fs-canvas)] px-3 py-2 text-sm text-[var(--fs-ink)]"
          />
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value as 'question' | 'feedback')}
            className="min-h-10 rounded-lg border border-[var(--fs-border-strong)] bg-[var(--fs-canvas)] px-3 py-2 text-sm font-medium text-[var(--fs-ink)] cursor-pointer"
          >
            <option value="question">{t.commentKindQuestion}</option>
            <option value="feedback">{t.commentKindFeedback}</option>
          </select>
        </div>

        <textarea
          rows={3}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.commentMessagePlaceholder}
          className="w-full rounded-lg border border-[var(--fs-border-strong)] bg-[var(--fs-canvas)] px-3 py-2.5 text-sm text-[var(--fs-ink)]"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="submit"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[var(--fs-accent)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--fs-accent-hover)] transition-colors cursor-pointer"
          >
            <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
            {t.commentSubmit}
          </button>

          {savedNotice && (
            <span className="text-xs font-semibold text-[#15803D]">{t.commentSavedToast}</span>
          )}
        </div>
      </form>

      <div className="space-y-3 border-t border-[var(--fs-border)] pt-4">
        {sectionComments.length === 0 ? (
          <p className="text-xs text-[var(--fs-ink-muted)]">{t.commentEmpty}</p>
        ) : (
          sectionComments.map((item) => (
            <div key={item.id} className="border-b last:border-b-0 border-[var(--fs-border)] pb-3 last:pb-0">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--fs-ink-muted)]">
                <strong className="text-[var(--fs-ink)]">{item.author}</strong>
                <span aria-hidden="true">·</span>
                <span>{item.zone}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[var(--fs-accent)]">
                  {item.kind === 'question' ? t.commentKindQuestion : t.commentKindFeedback}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">
                  {new Date(item.createdAt).toLocaleDateString(lang === 'es' ? 'es-PE' : 'en-US')}
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--fs-ink)] leading-relaxed">{item.message}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
