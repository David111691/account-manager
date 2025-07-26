<script setup lang="ts">
import { useAccountStore } from "../store/AccountStore";
import { storeToRefs } from "pinia";
import AccountInput from "./AccountInput.vue";

const store = useAccountStore();
const { accounts } = storeToRefs(store);
</script>

<template>
  <div>
    <AccountInput
      class="container"
      v-for="account in accounts"
      :key="account.id"
      :account="account"
    />
  </div>
</template>

<style scoped>
.container {
  margin-bottom: 8px;
}
</style>
