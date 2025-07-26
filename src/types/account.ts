export type AccountType = "LDAP" | "Локальная";

export interface Account {
  id: string;
  label?: string[];
  type: AccountType;
  login: string;
  password: string | null;
}
