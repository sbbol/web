import type { ChatAction } from '../types/chat';

const PREFILL_KEY = 'dale_prefill';

export function savePrefill(route: string, formData: Record<string, string>) {
  sessionStorage.setItem(PREFILL_KEY, JSON.stringify({ route, formData }));
}

export function consumePrefill(expectedRoute: string): Record<string, string> | null {
  const raw = sessionStorage.getItem(PREFILL_KEY);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as { route: string; formData: Record<string, string> };
    if (data.route === expectedRoute || window.location.pathname === data.route) {
      sessionStorage.removeItem(PREFILL_KEY);
      return data.formData;
    }
  } catch {
    sessionStorage.removeItem(PREFILL_KEY);
  }
  return null;
}

/** Строит URL с query-параметрами для deep link. */
export function buildRoute(action: ChatAction): string {
  if (!action.route) return '/dashboard';
  const params = action.params || {};
  const search = new URLSearchParams(params).toString();
  return search ? `${action.route}?${search}` : action.route;
}

export function navigateWithPrefill(
  navigate: (path: string) => void,
  action: ChatAction,
) {
  if (action.form_data && Object.keys(action.form_data).length > 0 && action.route) {
    savePrefill(action.route, action.form_data);
  }
  navigate(buildRoute(action));
}
