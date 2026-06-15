import type { ChatAction } from '../types/chat';

const PREFILL_KEY = 'dale_prefill';
export const DALE_PREFILL_EVENT = 'dale:prefill';

export interface DalePrefillDetail {
  route: string;
  formData: Record<string, string>;
}

export function savePrefill(route: string, formData: Record<string, string>) {
  sessionStorage.setItem(PREFILL_KEY, JSON.stringify({ route, formData, ts: Date.now() }));
  window.dispatchEvent(
    new CustomEvent<DalePrefillDetail>(DALE_PREFILL_EVENT, {
      detail: { route, formData },
    }),
  );
}

export function peekPrefill(expectedRoute: string): Record<string, string> | null {
  const raw = sessionStorage.getItem(PREFILL_KEY);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as { route: string; formData: Record<string, string> };
    if (data.route === expectedRoute || window.location.pathname === data.route) {
      return data.formData;
    }
  } catch {
    sessionStorage.removeItem(PREFILL_KEY);
  }
  return null;
}

export function consumePrefill(expectedRoute: string): Record<string, string> | null {
  const data = peekPrefill(expectedRoute);
  if (data) {
    sessionStorage.removeItem(PREFILL_KEY);
  }
  return data;
}

/** Строит URL с query-параметрами для deep link. */
export function buildRoute(action: ChatAction): string {
  if (!action.route) return '/dashboard';
  const params = action.params || {};
  const search = new URLSearchParams(params).toString();
  return search ? `${action.route}?${search}` : action.route;
}

export function navigateWithPrefill(
  navigate: (path: string, options?: { replace?: boolean; state?: unknown }) => void,
  action: ChatAction,
  currentPath?: string,
) {
  const route = buildRoute(action);
  if (action.form_data && Object.keys(action.form_data).length > 0 && action.route) {
    savePrefill(action.route, action.form_data);
  }
  const sameRoute = currentPath != null && (
    currentPath === action.route || currentPath.startsWith(`${action.route}?`)
  );
  if (sameRoute) {
    navigate(route, { replace: true, state: { dalePrefill: Date.now() } });
  } else {
    navigate(route);
  }
}
