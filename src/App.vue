<script setup lang="ts">
import Row from "./components/Row.vue";
import { useAccountsStore } from "@/store.ts";
import { computed } from "vue";
import Hint from "@/components/Hint.vue";
import type { Account } from "@/types.ts";

const store = useAccountsStore();
const accounts = computed<Account[]>(() => store.accounts);
const { addAccount } = store;
const hasPassword = computed(() =>
  accounts.value.some((acc) => acc.entryType === "local"),
);
</script>

<template>
  <div class="container-xxl d-flex min-vh-100">
    <div
      class="app d-flex flex-column gap-4 gap-md-3 bg-white rounded-3 flex-grow-1"
    >
      <div
        class="d-flex gap-3 align-items-center justify-content-center position-sticky bg-white p-3 top-0 z-1 border-bottom"
      >
        <h1 class="fs-2">Учетные записи</h1>
        <button
          class="btn btn-primary"
          @click="addAccount"
          aria-label="Добавить учетную запись"
        >
          <i class="bi bi-plus"></i>
        </button>
      </div>
      <Hint>
        Для указания нескольких меток для одной пары логин/пароль используйте
        разделитель ";"
      </Hint>
      <p v-if="!accounts.length" class="text-center">
        Нет ни одной учетной записи.
      </p>
      <div
        class="d-none d-md-flex justify-content-between gap-3 t-head opacity-50"
        v-else
      >
        <div class="row w-100 g-3">
          <div class="col-3">Метки</div>
          <div class="col-3">Тип записи</div>
          <div class="col-3">Логин</div>
          <div class="col-3" :class="{ 'opacity-0': !hasPassword }">Пароль</div>
        </div>
        <div style="width: 42px"></div>
      </div>
      <Row v-for="account in accounts" :key="account.id" :account="account" />
    </div>
  </div>
</template>

<style>
body {
  --bs-body-bg: var(--bs-tertiary-bg);
}

.app {
  margin: 50px auto;
  padding: 50px;
}

.t-head {
  font-size: 12px;
}

@media (max-width: 768px) {
  .app {
    margin: 16px auto;
    padding: 16px;
  }
}
</style>
