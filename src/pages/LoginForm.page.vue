<template>
  <n-tabs v-model:value="activeTab">
    <n-tab-pane name="login" tab="Connexion">
      <Login />
    </n-tab-pane>
    <n-tab-pane name="register" tab="Inscription">
      <Register />
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Login from '../components/Login.component.vue';
import Register from '../components/Register.component.vue';

const activeTab = ref('login');
</script>