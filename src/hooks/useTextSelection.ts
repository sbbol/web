import { useCallback, useEffect, useState } from 'react';
import { explainText } from '../api/explain';

interface SelectionState {
  text: string;
  x: number;
  y: number;
}

export function useTextSelection() {
  const [selection, setSelection] = useState<SelectionState | null>(null);
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMouseUp = useCallback(async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('input, textarea, select, [contenteditable="true"]') ||
      target.closest('[data-chat-panel]')
    ) {
      return;
    }

    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) {
      return;
    }

    const anchor = sel.anchorNode?.parentElement;
    if (
      anchor?.closest('input, textarea, select, [contenteditable="true"], [data-chat-panel]')
    ) {
      return;
    }

    const text = sel.toString().trim();
    if (text.length < 3 || text.length > 500) return;

    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    setSelection({
      text,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
    setLoading(true);
    setExplanation('');

    try {
      const result = await explainText(text);
      setExplanation(result);
    } catch {
      setExplanation('Не удалось получить объяснение.');
    } finally {
      setLoading(false);
    }
  }, []);

  const dismiss = useCallback(() => {
    setSelection(null);
    setExplanation('');
    window.getSelection()?.removeAllRanges();
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-explain-tooltip]') || target.closest('[data-chat-panel]')) {
        return;
      }
      if (selection) dismiss();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [selection, dismiss]);

  return { selection, explanation, loading, dismiss };
}
