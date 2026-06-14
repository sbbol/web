import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { streamChat, fetchDrafts, fetchChatHistory, deleteDraft } from '../api/chat';
import type { ChatAction, ChatMessage, Draft } from '../types/chat';

const CONVERSATION_STORAGE_KEY = 'dale_conversation_id';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  statusText: string;
  conversationId: string | null;
  isEscalated: boolean;
  drafts: Draft[];
  sendMessage: (text: string) => Promise<void>;
  stopGeneration: () => void;
  loadDrafts: () => Promise<void>;
  dismissDraft: (draftId: string) => Promise<void>;
  openChat: () => void;
  startNewConversation: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChatContext = createContext<ChatState | null>(null);

let msgCounter = 0;
const nextId = () => `msg-${++msgCounter}`;

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(() =>
    sessionStorage.getItem(CONVERSATION_STORAGE_KEY),
  );
  const [isEscalated, setIsEscalated] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const knownIdsRef = useRef<Set<string>>(new Set());
  const abortRef = useRef<AbortController | null>(null);
  const historyLoadedRef = useRef(false);

  const loadDrafts = useCallback(async () => {
    try {
      const data = await fetchDrafts();
      setDrafts(data);
    } catch {
      setDrafts([]);
    }
  }, []);

  const dismissDraft = useCallback(async (draftId: string) => {
    try {
      await deleteDraft(draftId);
      await loadDrafts();
    } catch {
      // ignore
    }
  }, [loadDrafts]);

  const restoreHistory = useCallback(async (convId: string) => {
    const data = await fetchChatHistory(convId);
    const restored: ChatMessage[] = data.messages.map(m => ({
      id: m.id,
      role: m.role,
      content: m.content,
      actions: m.metadata?.actions as ChatAction[] | undefined,
    }));
    knownIdsRef.current = new Set(data.messages.map(m => m.id));
    setMessages(restored);
    setIsEscalated(data.escalated);
    setConversationId(convId);
    sessionStorage.setItem(CONVERSATION_STORAGE_KEY, convId);
  }, []);

  const openChat = useCallback(async () => {
    setIsOpen(true);
    loadDrafts();

    const storedId = sessionStorage.getItem(CONVERSATION_STORAGE_KEY) || conversationId;
    if (storedId && !historyLoadedRef.current) {
      historyLoadedRef.current = true;
      try {
        await restoreHistory(storedId);
      } catch {
        sessionStorage.removeItem(CONVERSATION_STORAGE_KEY);
        setConversationId(null);
      }
    }
  }, [conversationId, loadDrafts, restoreHistory]);

  const startNewConversation = useCallback(() => {
    sessionStorage.removeItem(CONVERSATION_STORAGE_KEY);
    historyLoadedRef.current = false;
    setConversationId(null);
    setMessages([]);
    setIsEscalated(false);
    knownIdsRef.current.clear();
  }, []);

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const syncOperatorMessages = useCallback(async (convId: string) => {
    try {
      const data = await fetchChatHistory(convId);
      if (data.escalated) setIsEscalated(true);

      const newMsgs: ChatMessage[] = [];
      for (const m of data.messages) {
        if (knownIdsRef.current.has(m.id)) continue;
        knownIdsRef.current.add(m.id);
        if (m.role === 'operator') {
          newMsgs.push({ id: m.id, role: 'operator', content: m.content });
        }
      }
      if (newMsgs.length) {
        setMessages(prev => [...prev, ...newMsgs]);
      }
    } catch {
      // ignore poll errors
    }
  }, []);

  useEffect(() => {
    if (!conversationId || !isEscalated || isLoading) return;
    const timer = setInterval(() => syncOperatorMessages(conversationId), 3000);
    return () => clearInterval(timer);
  }, [conversationId, isEscalated, isLoading, syncOperatorMessages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const userMsg: ChatMessage = { id: nextId(), role: 'user', content: text.trim() };
    const assistantId = nextId();
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      actions: [],
      isStreaming: true,
    };

    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setIsLoading(true);
    setStatusText('Дэйл думает...');

    try {
      let collectedActions: ChatAction[] = [];
      let activeConvId = conversationId;

      for await (const event of streamChat(text, conversationId || undefined, controller.signal)) {
        if (event.type === 'meta' && event.conversation_id) {
          activeConvId = event.conversation_id;
          setConversationId(event.conversation_id);
          sessionStorage.setItem(CONVERSATION_STORAGE_KEY, event.conversation_id);
        }
        if (event.type === 'status' && event.text) {
          setStatusText(event.text);
        }
        if (event.type === 'token' && event.text) {
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantId ? { ...m, content: m.content + event.text } : m,
            ),
          );
        }
        if (event.type === 'replace' && event.text !== undefined) {
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantId ? { ...m, content: event.text! } : m,
            ),
          );
        }
        if (event.type === 'action' && event.action) {
          if (event.action.type === 'escalate') setIsEscalated(true);
          collectedActions = [...collectedActions, event.action];
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantId ? { ...m, actions: collectedActions } : m,
            ),
          );
        }
      }

      if (activeConvId) syncOperatorMessages(activeConvId);
    } catch (err) {
      const aborted = err instanceof DOMException && err.name === 'AbortError';
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? {
                ...m,
                content: aborted
                  ? (m.content ? `${m.content}\n\n— Генерация прервана.` : '— Генерация прервана.')
                  : 'Не удалось связаться с сервером. Проверьте, что backend запущен.',
                isStreaming: false,
              }
            : m,
        ),
      );
      if (aborted) return;
    } finally {
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId ? { ...m, isStreaming: false } : m,
        ),
      );
      setIsLoading(false);
      setStatusText('');
      if (abortRef.current === controller) {
        abortRef.current = null;
      }
    }
  }, [conversationId, isLoading, syncOperatorMessages]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        statusText,
        conversationId,
        isEscalated,
        drafts,
        sendMessage,
        stopGeneration,
        loadDrafts,
        dismissDraft,
        openChat,
        startNewConversation,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
};
