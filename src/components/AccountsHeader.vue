<script setup lang="ts">
import { useAccountStore } from "../store/AccountStore";
import { QuestionFilled } from "@element-plus/icons-vue";

const store = useAccountStore();

function handleAddAccount() {
  store.addEmptyAccount();
}
</script>

<template>
  <div class="header">
    <h2>Учетные записи</h2>
    <el-button
      class="button"
      type="primary"
      size="medium"
      @click="handleAddAccount"
    >
      +
    </el-button>
  </div>
  <div class="hint-block">
    <el-icon color="#409EFF" style="font-size: 36px">
      <QuestionFilled />
    </el-icon>
    <span>
      Для указания нескольких меток для одной пары логин/пароль используйте
      разделитель ;
    </span>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  gap: 12px;
  align-items: center;
}

.button {
  height: 50px;
  width: 50px; /* чтобы кнопка была квадратной */
  font-size: 24px;
  line-height: 1;
}

.hint-block {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  background-color: rgb(240, 237, 237);
  border-radius: 8px;
  margin-top: 8px;
  margin-bottom: 16px;
  max-width: 800px;
}
</style>
