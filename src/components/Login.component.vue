<template>
  <n-form @submit.prevent="handleSubmit">
    <n-form-item label="Email" for="email">
      <n-input id="email" name="email" v-model="email" type="email" placeholder="Entrez votre email" required />
    </n-form-item>
    <n-form-item label="Mot de passe" for="password">
      <n-input id="password" name="password" v-model="password" type="password" placeholder="Entrez votre mot de passe" required />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" htmlType="submit">Se connecter</n-button>
    </n-form-item>
    <n-text type="error" v-if="errorMessage">{{ errorMessage }}</n-text>
    <n-text>Pas de compte ? <router-link to="/register">S'inscrire</router-link></n-text>
  </n-form>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/login.store';

const router = useRouter();
const authStore = useAuthStore();

const { email, password, errorMessage, login } = authStore;

const handleSubmit = async () => {
  console.log('Form submitted');
  console.log('Email:', email);
  console.log('Password:', password);

  try {
    await login();
    console.log('Login successful');
    router.push('/deck-builder');
  } catch (error) {
    console.error('Login failed', error);
  }
};
</script>