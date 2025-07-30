<script setup lang="ts">
import { computed, reactive } from "vue";
import InputPassword from "@/components/InputPassword.vue";
import { useAccountsStore } from "@/store.ts";
import type { Account, Errors } from "@/types.ts";
import { validateField } from "@/utils/validate";

const props = defineProps<{
  account: Account;
}>();

const store = useAccountsStore();
const { removeAccount, changeAccount } = store;

const errors: Errors = reactive({
  login: null,
  password: null,
  tags: null,
});

const tagsString = computed(
  () => props.account.tags?.map((tag) => tag.text).join(";") ?? "",
);

const updateTags = (val: string) => {
  props.account.tags = val
    .split(";")
    .map((tag) => ({ text: tag.trim() }))
    .filter((tag) => tag.text);
};

const handleTagsBlur = () => {
  const isValid = validateField(
    "tags",
    tagsString.value,
    errors,
    props.account.entryType,
  );
  if (isValid) {
    changeAccount(props.account.id, { tags: props.account.tags });
  }
};

const handleChange = () => {
  const isLoginValid = validateField(
    "login",
    props.account.login,
    errors,
    props.account.entryType,
  );
  const isPasswordValid = validateField(
    "password",
    props.account.password ?? "",
    errors,
    props.account.entryType,
  );

  if (!isLoginValid || !isPasswordValid) return;

  if (props.account.entryType !== "local") {
    props.account.password = null;
  }

  changeAccount(props.account.id, {
    login: props.account.login,
    password: props.account.password,
    entryType: props.account.entryType,
    tags: props.account.tags,
  });
};
const passwordForInput = computed<string | undefined>({
  get() {
    return props.account.password === null ? undefined : props.account.password;
  },
  set(value) {
    props.account.password = value === undefined ? null : value;
  },
});
</script>

<template>
  <form
    class="d-flex flex-md-row flex-column justify-content-between align-items-stretch align-items-md-start gap-3 rounded-3 p-md-0 p-3"
  >
    <div class="row w-100 gap-3 gap-md-0 g-0 g-md-3">
      <div class="col-12 col-md-3">
        <label :for="account.id + 'tags'" class="d-inline d-md-none opacity-50"
          >Метки</label
        >
        <input
          type="text"
          :id="account.id + 'tags'"
          name="tags"
          class="form-control bg-white"
          :value="tagsString"
          @input="(e) => updateTags((e.target as HTMLInputElement).value)"
          @blur="handleTagsBlur"
          placeholder="Метки"
          :class="{ 'is-invalid': errors.tags }"
        />
        <div class="invalid-feedback" v-if="errors.tags">{{ errors.tags }}</div>
      </div>
      <div class="col-12 col-md-3">
        <label
          :for="account.id + 'entry-type'"
          class="d-inline d-md-none opacity-50"
          >Тип записи</label
        >
        <select
          class="form-select bg-white"
          name="entryType"
          v-model="account.entryType"
          @blur="handleChange"
          :id="account.id + 'entry-type'"
        >
          <option value="local">Локальная</option>
          <option value="ldap">LDAP</option>
        </select>
      </div>
      <div
        :class="account.entryType === 'local' ? 'col-md-3' : 'col-md-6'"
        class="col-12"
      >
        <label :for="account.id + 'login'" class="d-inline d-md-none opacity-50"
          >Логин</label
        >
        <input
          type="email"
          name="login"
          class="form-control bg-white"
          v-model="account.login"
          @blur="handleChange"
          :id="account.id + 'login'"
          placeholder="Логин"
          :class="{ 'is-invalid': errors.login }"
          autocomplete="username"
        />
        <div class="invalid-feedback" v-if="errors.login">
          {{ errors.login }}
        </div>
      </div>
      <div class="col-12 col-md-3" v-if="account.entryType === 'local'">
        <label
          :for="account.id + 'password'"
          class="d-inline d-md-none opacity-50"
          >Пароль</label
        >
        <InputPassword
          v-model="passwordForInput"
          @blur="handleChange"
          :error="errors.password ?? undefined"
        />
      </div>
    </div>
    <button
      class="btn btn-primary"
      @click="() => removeAccount(account.id)"
      type="button"
      aria-label="Удалить учетную запись"
    >
      <i class="bi bi-trash3"></i>
    </button>
  </form>
</template>

<style scoped>
label {
  font-size: 12px;
}

form {
  border: 1px solid transparent;
}

@media (max-width: 768px) {
  form {
    border: 1px solid #dee2e6;
    background-color: var(--bs-tertiary-bg);
  }
}
</style>
