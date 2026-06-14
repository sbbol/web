import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { saveDraft } from '../api/chat';

interface DraftConfig {
  draftType: string;
  title: string;
  route: string;
}

/**
 * Отслеживает незавершённые формы и сохраняет черновик на сервер при уходе со страницы.
 */
export function useDraftTracker(config: DraftConfig) {
  const location = useLocation();
  const hasInteracted = useRef(false);
  const formDataRef = useRef<Record<string, string>>({});
  const draftIdRef = useRef<string | undefined>(undefined);

  const trackField = (name: string, value: string) => {
    hasInteracted.current = true;
    formDataRef.current[name] = value;
  };

  const persistDraft = () => {
    if (!hasInteracted.current) return Promise.resolve(undefined);
    return saveDraft({
      draft_type: config.draftType,
      title: config.title,
      route: config.route,
      form_data: formDataRef.current,
      draft_id: draftIdRef.current,
    }).then(id => {
      draftIdRef.current = id;
      return id;
    });
  };

  const saveNow = async () => {
    hasInteracted.current = true;
    return persistDraft();
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (hasInteracted.current) {
        navigator.sendBeacon?.(
          '/api/drafts',
          JSON.stringify({
            user_id: 'demo_user',
            draft_type: config.draftType,
            title: config.title,
            route: config.route,
            form_data: formDataRef.current,
            draft_id: draftIdRef.current,
          }),
        );
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      persistDraft().catch(() => {});
    };
  }, [config.draftType, config.title, config.route, location.pathname]);

  return { trackField, saveNow, formDataRef };
}
