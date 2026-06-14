import { useEffect, useState, type ChangeEvent } from 'react';
import { consumePrefill } from '../utils/deepLinks';

export function useFormPrefill(route: string) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [fromDale, setFromDale] = useState(false);

  useEffect(() => {
    const data = consumePrefill(route);
    if (data && Object.keys(data).length > 0) {
      setValues(data);
      setFromDale(true);
    }
  }, [route]);

  const get = (key: string, fallback = '') => values[key] ?? fallback;

  const bind = (key: string, fallback = '') => ({
    value: get(key, fallback),
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues(prev => ({ ...prev, [key]: e.target.value }));
    },
  });

  return { values, fromDale, get, bind, setValues };
}
