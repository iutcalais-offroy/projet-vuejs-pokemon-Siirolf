<template>
    <div style="max-width: 400px; margin: 0 auto; padding: 20px;">
      <n-tabs>
        <!-- Connexion -->
        <n-tab-pane name="login" tab="Connexion">
          <h2 style="text-align: center; margin-bottom: 20px;">Connexion</h2>
          <form @submit.prevent="handleLogin">
            <n-input
              v-model:value="store.email"
              type="email"
              placeholder="Entrez votre email"
              clearable
              required
              style="margin-bottom: 20px;"
            />
            <n-input
              v-model:value="store.password"
              type="password"
              placeholder="Entrez votre mot de passe"
              clearable
              required
              style="margin-bottom: 20px;"
            />
            <n-button type="primary" block size="large" @click="handleLogin">
              Se connecter 
            </n-button>
          </form>
          <p v-if="errorMessage" style="color: red; text-align: center; margin-top: 20px;">
            {{ errorMessage }}
          </p>
        </n-tab-pane> 
  
        <!-- Inscription -->
        <n-tab-pane name="register" tab="Inscription">
          <h2 style="text-align: center; margin-bottom: 20px;">Inscription</h2>
          <form @submit.prevent="handleRegister">
            <n-input
              v-model:value="store.email"
              type="email"
              placeholder="Entrez votre email"
              clearable
              required
              style="margin-bottom: 20px;"
            />
            <n-input
              v-model:value="store.password"
              type="password"
              placeholder="Entrez votre mot de passe"
              clearable
              required
              style="margin-bottom: 20px;"
            />
            <n-input
              v-model:value="store.confirmpassword"
              type="password"
              placeholder="Confirmez votre mot de passe"
              clearable
              required
              style="margin-bottom: 20px;"
            />
            <n-button type="primary" block size="large" @click="handleRegister">
              S'inscrire
            </n-button>
          </form>
          <p v-if="errorMessage" style="color: red; text-align: center; margin-top: 20px;">
            {{ errorMessage }}
          </p>
        </n-tab-pane>
      </n-tabs>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from "../stores/login.store.js";
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const store = useAuthStore();
      const router = useRouter();
      const errorMessage = ref('');
  
      const handleLogin = async () => {
        const result = await store.login();
        if (result.success) {
          router.push('/deck-builder');
        } else {
          errorMessage.value = result.message || 'Échec de la connexion. Veuillez vérifier vos identifiants.';
        }
      };
  
      const handleRegister = async () => {
        const result = await store.register();
        if (result.success) {
          router.push('/deck-builder');
        } else {
          errorMessage.value = result.message || 'Échec de l\'inscription. Veuillez réessayer plus tard.';
        }
      };
  
      return { store, handleLogin, handleRegister, errorMessage };
    },
  };
  </script>
  
  <style scoped>
  </style>
  