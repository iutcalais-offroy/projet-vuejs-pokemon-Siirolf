<template>
  <n-form @submit.prevent="handleSubmit">
    <n-form-item label="Email" for="register-email">
      <n-input id="register-email" name="email" v-model="email" type="email" placeholder="Entrez votre email" required />
    </n-form-item>
    <n-form-item label="Mot de passe" for="register-password">
      <n-input id="register-password" name="password" v-model="password" type="password" placeholder="Entrez votre mot de passe" required />
    </n-form-item>
    <n-form-item label="Confirmer le mot de passe" for="confirm-password">
      <n-input id="confirm-password" name="confirm-password" v-model="confirmPassword" type="password" placeholder="Confirmez votre mot de passe" required />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" htmlType="submit">S'inscrire</n-button>
    </n-form-item>
    <n-text type="error" v-if="errorMessage">{{ errorMessage }}</n-text>
    <n-text>Déjà inscrit ? <router-link to="/login">Se connecter</router-link></n-text>
  </n-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/login.store';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleSubmit = async () => {
  console.log('Form submitted');
  console.log('Email:', email.value);
  console.log('Password:', password.value);
  console.log('Confirm Password:', confirmPassword.value);

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Les mots de passe ne correspondent pas';
    return;
  }

  try {
    console.log('Sending registration request...');
    await authStore.register(email.value, password.value);
    console.log('Registration successful');
    router.push('/login');
  } catch (error) {
    console.error('Registration failed', error);
  }
};
</script>