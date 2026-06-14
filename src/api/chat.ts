import { API_BASE, USER_ID } from './config';
import type { ChatStreamEvent, Draft, ServerMessage } from '../types/chat';

export async function* streamChat(
  message: string,
  conversationId?: string,
  signal?: AbortSignal,
): AsyncGenerator<ChatStreamEvent> {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: USER_ID,
      message,
      conversation_id: conversationId,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Chat error: ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const payload = line.slice(6).trim();
      if (payload === '[DONE]') return;
      try {
        yield JSON.parse(payload) as ChatStreamEvent;
      } catch {
        // skip malformed
      }
    }
  }
}

export async function fetchDrafts(): Promise<Draft[]> {
  const res = await fetch(`${API_BASE}/drafts?user_id=${USER_ID}`);
  if (!res.ok) throw new Error(`Drafts error: ${res.status}`);
  const data = await res.json();
  return data.drafts || [];
}

export async function saveDraft(draft: {
  draft_type: string;
  title: string;
  route: string;
  form_data?: Record<string, string>;
  draft_id?: string;
}): Promise<string> {
  const res = await fetch(`${API_BASE}/drafts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: USER_ID, ...draft }),
  });
  const data = await res.json();
  return data.draft_id;
}

export async function deleteDraft(draftId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/drafts/${draftId}?user_id=${USER_ID}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Delete draft error: ${res.status}`);
}

export async function fetchChatHistory(conversationId: string): Promise<{
  messages: ServerMessage[];
  escalated: boolean;
}> {
  const res = await fetch(`${API_BASE}/chat/history/${conversationId}?user_id=${USER_ID}`);
  if (!res.ok) throw new Error(`History error: ${res.status}`);
  return res.json();
}
