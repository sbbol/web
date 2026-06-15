import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { consumePrefill, DALE_PREFILL_EVENT, peekPrefill, type DalePrefillDetail } from '../utils/deepLinks';

export function useFormPrefill(route: string) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [fromDale, setFromDale] = useState(false);

  const applyPrefill = useCallback((data: Record<string, string>) => {
    if (data && Object.keys(data).length > 0) {
      setValues(data);
      setFromDale(true);
    }
  }, []);

  useEffect(() => {
    const data = consumePrefill(route);
    if (data) applyPrefill(data);
  }, [route, applyPrefill]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<DalePrefillDetail>).detail;
      if (!detail) return;
      if (detail.route === route || window.location.pathname === route) {
        applyPrefill(detail.formData);
      }
    };
    window.addEventListener(DALE_PREFILL_EVENT, handler);
    return () => window.removeEventListener(DALE_PREFILL_EVENT, handler);
  }, [route, applyPrefill]);

  const clearFromDale = useCallback(() => setFromDale(false), []);

  const get = (key: string, fallback = '') => values[key] ?? fallback;

  const bind = (key: string, fallback = '') => ({
    value: get(key, fallback),
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      clearFromDale();
      setValues(prev => ({ ...prev, [key]: e.target.value }));
    },
  });

  return { values, fromDale, get, bind, setValues, clearFromDale, applyPrefill };
}

/** Re-apply prefill without consuming sessionStorage (for modals). */
export function usePrefillListener(onPrefill: (data: Record<string, string>) => void, route = '/other') {
  useEffect(() => {
    const data = peekPrefill(route);
    if (data) onPrefill(data);

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<DalePrefillDetail>).detail;
      if (detail?.route === route) {
        onPrefill(detail.formData);
      }
    };
    window.addEventListener(DALE_PREFILL_EVENT, handler);
    return () => window.removeEventListener(DALE_PREFILL_EVENT, handler);
  }, [route, onPrefill]);
}
