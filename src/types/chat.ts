export interface ChatAction {
  type: 'navigate' | 'escalate';
  label?: string;
  route?: string;
  params?: Record<string, string>;
  form_data?: Record<string, string>;
  reason?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'operator';
  content: string;
  actions?: ChatAction[];
  isStreaming?: boolean;
}

export interface Draft {
  id: string;
  draft_type: string;
  title: string;
  route: string;
  form_data: Record<string, string>;
  updated_at: string;
}

export interface ChatStreamEvent {
  type: 'meta' | 'status' | 'token' | 'action' | 'replace';
  text?: string;
  conversation_id?: string;
  action?: ChatAction;
}

export interface ServerMessage {
  id: string;
  role: 'user' | 'assistant' | 'operator';
  content: string;
  created_at: string;
  metadata?: {
    actions?: ChatAction[];
    escalated?: boolean;
    system?: boolean;
  };
}
