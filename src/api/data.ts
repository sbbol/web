import { API_BASE, USER_ID } from './config';
import type { Account } from '../store/AppContext';

export interface Employee {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  position: string;
  account: string;
  phone: string;
  fullName: string;
  initials: string;
}

export interface Card {
  id: string;
  label: string;
  name: string;
  status: 'active' | 'blocked';
  holder: string;
  account_number: string;
  expiry: string;
  doc_date: string;
}

export interface CardListItem {
  id: string;
  number: string;
  date: string;
  status: string;
  statusType: 'signed' | 'draft';
}

export interface StatementTransaction {
  date: string;
  accountNumber: string;
  accountName: string;
  description: string;
  debit: string;
  credit: string;
  balance: string;
}

export interface StatementResult {
  period: string;
  periodLabel: string;
  account: string;
  openingBalance: string;
  closingBalance: string;
  turnoverDebit: string;
  turnoverCredit: string;
  transactionCount: number;
  transactions: StatementTransaction[];
  generatedAt: string;
}

export interface StatementReference {
  tabs: string[];
  periods: { key: string; label: string }[];
  accountOptions: { key: string; label: string }[];
}

export interface AccountOperation {
  date: string;
  description: string;
  debit: string;
  credit: string;
  balance: string;
}

export interface AccountOperationsReference {
  periods: { key: string; label: string }[];
  operationTypes: { key: string; label: string }[];
}

export interface AccountOperationsResult {
  account: Account;
  transactions: AccountOperation[];
  count: number;
}

async function apiGet<T>(path: string): Promise<T> {
  const separator = path.includes('?') ? '&' : '?';
  const res = await fetch(`${API_BASE}/data${path}${separator}user_id=${USER_ID}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}/data${path}?user_id=${USER_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: USER_ID, ...body as object }),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}/data${path}?user_id=${USER_ID}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function apiDelete(path: string): Promise<void> {
  const res = await fetch(`${API_BASE}/data${path}?user_id=${USER_ID}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
}

export async function fetchProfile(): Promise<{ name: string; avatar: string; totalBalance: string }> {
  return apiGet('/profile');
}

export async function fetchAccounts(): Promise<Account[]> {
  const data = await apiGet<{ accounts: Account[] }>('/accounts');
  return data.accounts;
}

export async function fetchEmployees(): Promise<Employee[]> {
  const data = await apiGet<{ employees: Employee[] }>('/employees');
  return data.employees;
}

export async function createEmployee(employee: Omit<Employee, 'id' | 'fullName' | 'initials'>): Promise<Employee> {
  const data = await apiPost<{ employee: Employee }>('/employees', employee);
  return data.employee;
}

export async function deleteEmployee(id: string): Promise<void> {
  await apiDelete(`/employees/${id}`);
}

export async function fetchCards(): Promise<{ cards: Card[]; items: CardListItem[] }> {
  return apiGet('/cards');
}

export async function fetchCard(id: string): Promise<Card> {
  const data = await apiGet<{ card: Card }>(`/cards/${id}`);
  return data.card;
}

export async function updateCardStatus(id: string, status: 'active' | 'blocked'): Promise<Card> {
  const data = await apiPatch<{ card: Card }>(`/cards/${id}/status`, { status });
  return data.card;
}

export async function fetchStatementReference(): Promise<StatementReference> {
  return apiGet('/statement/reference');
}

export async function generateStatement(filters: {
  account: string;
  period: string;
  zero_turnover: boolean;
  daily: boolean;
  revaluation: boolean;
}): Promise<StatementResult> {
  return apiPost('/statements/generate', filters);
}

export async function fetchAccountOperationsReference(
  accountId: string,
): Promise<AccountOperationsReference> {
  return apiGet(`/accounts/${accountId}/operations/reference`);
}

export async function fetchAccountOperations(
  accountId: string,
  filters: { period: string; operation_type: string },
): Promise<AccountOperationsResult> {
  const params = new URLSearchParams({
    period: filters.period,
    operation_type: filters.operation_type,
  });
  return apiGet(`/accounts/${accountId}/operations?${params.toString()}`);
}
