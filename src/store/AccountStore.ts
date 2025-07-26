import { defineStore } from "pinia";
import type { Account, AccountType } from "../types/account";

import { v4 as uuidv4 } from "uuid";

import { saveData, loadData } from "./localStorage";
const STORAGE_KEY = "accountStore";

export const useAccountStore = defineStore("accountStore", {
  state: () => {
    const data = loadData(STORAGE_KEY);

    if (data) {
      return {
        accounts: data as Account[],
      };
    }

    return {
      accounts: [] as Account[],
    };
  },

  getters: {
    getAccounts: (state) => state.accounts,
  },

  actions: {
    addAccount(account: Account) {
      this.accounts.push(account);
      saveData(STORAGE_KEY, this.accounts);
    },

    updateAccount(id: string, updatedFields: Partial<Account>) {
      const accountId = this.accounts.findIndex((a) => a.id === id);
      if (accountId !== -1) {
        this.accounts[accountId] = {
          ...this.accounts[accountId],
          ...updatedFields,
        };
        saveData(STORAGE_KEY, this.accounts);
      }
    },

    updateAccountType(id: string, newType: AccountType) {
      const accountId = this.accounts.findIndex((a) => a.id === id);
      if (accountId !== -1) {
        const current = this.accounts[accountId];

        this.accounts[accountId] = {
          ...current,
          type: newType,
          password: newType === "LDAP" ? null : current.password ?? "",
        };

        saveData(STORAGE_KEY, this.accounts);
      }
    },

    deleteAccount(id: string) {
      this.accounts = this.accounts.filter((a) => a.id !== id);
      saveData(STORAGE_KEY, this.accounts);
    },

    addEmptyAccount() {
      this.accounts.push({
        id: uuidv4(),
        label: [],
        type: "Локальная",
        login: "sample",
        password: "123",
      });

      saveData(STORAGE_KEY, this.accounts);
    },
  },
});
