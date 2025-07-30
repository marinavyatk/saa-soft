<template>
  <div class="input-group rounded-3">
    <input
      :type="show ? 'text' : 'password'"
      class="form-control bg-white"
      :value="modelValue"
      @input="
        (e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)
      "
      @blur="$emit('blur')"
      placeholder="Пароль"
      :class="{ 'is-invalid': error }"
      autocomplete="new-password"
    />
    <button
      class="btn border bg-white rounded-end"
      type="button"
      @click="show = !show"
      tabindex="-1"
    >
      <i :class="show ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
    </button>
    <div class="invalid-feedback d-block" v-if="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps({
  modelValue: String,
  error: String,
});

const show = ref(false);
</script>
