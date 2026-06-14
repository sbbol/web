import { API_BASE } from './config';

export async function explainText(text: string): Promise<string> {
  const res = await fetch(`${API_BASE}/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  const data = await res.json();
  return data.explanation || 'Не удалось получить объяснение.';
}
