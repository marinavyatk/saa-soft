import type { Field, Errors } from "../types";

export const validateField = (
  field: Field,
  value: string | null,
  errors: Errors,
  entryType: "local" | "ldap",
): boolean => {
  switch (field) {
    case "tags":
      if (value && value.length > 50) {
        errors.tags = "Максимум 50 символов";
        return false;
      }
      errors.tags = null;
      return true;

    case "login":
      if (!value) {
        errors.login = "Логин обязателен";
        return false;
      }
      if (value.length > 100) {
        errors.login = "Максимум 100 символов";
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors.login = "Введите корректный email";
        return false;
      }
      errors.login = null;
      return true;

    case "password":
      if (entryType === "local") {
        if (!value) {
          errors.password = "Пароль обязателен";
          return false;
        }
        if (value.length > 100) {
          errors.password = "Максимум 100 символов";
          return false;
        }
      }
      errors.password = null;
      return true;

    default:
      return true;
  }
};
