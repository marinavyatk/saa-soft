import { defineStore } from "pinia";
import { ref } from "vue";
import { v4 as uuid } from "uuid";
import type { Account } from "@/types.ts";

export const useAccountsStore = defineStore("accounts", () => {
  const saved = localStorage.getItem("accounts");
  const accounts = ref<Account[]>(saved ? JSON.parse(saved) : []);

  function addAccount() {
    accounts.value.push({
      id: uuid(),
      tags: [],
      entryType: "local",
      login: null,
      password: null,
    });
    localStorage.setItem("accounts", JSON.stringify(accounts.value));
  }

  function removeAccount(accountId: string) {
    accounts.value = accounts.value.filter((acc) => acc.id !== accountId);
    localStorage.setItem("accounts", JSON.stringify(accounts.value));
  }

  function changeAccount(
    accountId: string,
    field: Partial<Omit<Account, "id">>,
  ) {
    const index = accounts.value.findIndex((acc) => acc.id === accountId);
    if (index !== -1) {
      accounts.value[index] = { ...accounts.value[index], ...field };
      localStorage.setItem("accounts", JSON.stringify(accounts.value));
    }
  }

  return { accounts, addAccount, removeAccount, changeAccount };
});
