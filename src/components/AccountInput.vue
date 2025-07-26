<template>
  <div class="container">
    <el-form-item class="account-row__item">
      <el-input
        v-model="labels"
        placeholder="Введите метки через ;"
        maxlength="50"
        show-word-limit
        @blur="validateLabels"
      />
    </el-form-item>

    <el-form-item class="account-row__item">
      <el-select
        class="select-area"
        v-model="localAccount.type"
        placeholder="Выберите тип"
        @change="onTypeChange"
      >
        <el-option value="LDAP" />
        <el-option value="Локальная" />
      </el-select>
    </el-form-item>

    <el-form-item class="account-row__item" :error="loginError">
      <el-input
        v-model="localAccount.login"
        placeholder="Введите логин"
        maxlength="100"
        show-word-limit
        @blur="validateData"
      />
    </el-form-item>

    <el-form-item
      v-if="localAccount.type === 'Локальная'"
      class="account-row__item"
      :error="passwordError"
    >
      <el-input
        v-model="localAccount.password"
        type="password"
        placeholder="Введите пароль"
        maxlength="100"
        show-word-limit
        show-password
        @blur="validateData"
      />
    </el-form-item>

    <el-button type="danger" @click="deleteAccount">Удалить</el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import type { AccountType } from "../types/account";
import type { Account } from "../types/account";

import { useAccountStore } from "../store/AccountStore";

const accountStore = useAccountStore();

const loginError = ref("");
const passwordError = ref("");

const props = defineProps<{
  account: Account;
}>();

const localAccount = reactive({ ...props.account });
const labels = ref(
  localAccount.label ? labelsToString(localAccount.label) : ""
);

onMounted(() => {
  validateLogin();
  validatePassword();
});

// при смене типа ("локальная" или "LDAP")
function onTypeChange(value: AccountType) {
  if (value === "LDAP") {
    localAccount.password = null;
    accountStore.updateAccount(localAccount.id, { ...localAccount });
  } else if (value === "Локальная") {
    localAccount.password = "";
    validatePassword();
    accountStore.updateAccount(localAccount.id, { ...localAccount });
  }
}

// валидация пароля и логина
function validateData() {
  validateLogin();
  validatePassword();
  if (!loginError.value && !passwordError.value) {
    accountStore.updateAccount(localAccount.id, { ...localAccount });
  }
}

function validateLogin() {
  if (!localAccount.login.trim()) {
    loginError.value = "Логин обязателен";
  } else {
    loginError.value = "";
  }
}

function validatePassword() {
  if (localAccount.type == "LDAP") return;

  if (!localAccount.password!.trim()) {
    passwordError.value = "Пароль обязателен";
  } else {
    passwordError.value = "";
  }
}

function deleteAccount() {
  accountStore.deleteAccount(localAccount.id);
}

// сохранение и парсинг меток
function validateLabels() {
  const parsedLabels = parseLabels(labels.value);
  localAccount.label = parsedLabels;
  accountStore.updateAccount(localAccount.id, { ...localAccount });
}

function parseLabels(input: string): string[] {
  return input
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function labelsToString(labels: string[]): string {
  return labels.join("; ");
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  max-width: 1200px;
  padding: 24px;
  border: 1px solid rgb(180, 180, 180);
  border-radius: 8px;
}

.account-row__item {
  flex: 1 1 200px;
  min-width: 200px;
  box-sizing: border-box;
  margin: 0;
}

.el-input,
.el-select {
  width: 100%;
}

.el-button {
  flex-shrink: 0;
}
</style>
