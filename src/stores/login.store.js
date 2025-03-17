import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { loginApi } from './../apis/login.api';

export const useAuthStore = defineStore('auth', () => {
  const email = ref('');
  const password = ref('');
  const confirmpassword = ref('');
  const token = ref(null);
  const errorMessage = ref('');

  // Fonction pour la connexion
  async function login() {
    try {
      localStorage.removeItem('jwt');
      const jwt = await loginApi(email.value, password.value);
      token.value = jwt;
      localStorage.setItem('jwt', token.value);
      return { success: true };
    } catch (error) {
      if (error.response && error.response.status === 401) {
        errorMessage.value = "Identifiants incorrects, veuillez réessayer.";
      } else {
        errorMessage.value = "Une erreur inconnue est survenue. Veuillez réessayer.";
      }
      return { success: false, message: errorMessage.value };
    }
  }

  // Fonction pour l'inscription
  async function register() {
    try {
      const response = await axios.post('https://pokemon-api-seyrinian-production.up.railway.app/users', {
        email: email.value,
        password: password.value,
        confirmpassword: confirmpassword.value,
      });

      console.log('Registration successful:', response.data);

      return { success: true };
    } catch (error) {
      if (error.response && error.response.status === 500) {
        errorMessage.value = "Erreur du serveur. Impossible de créer l'utilisateur.";
      } else if (error.response && error.response.status === 409) {
        errorMessage.value = "Cet email est déjà utilisé, veuillez en choisir un autre.";
      } else if (error.response && error.response.status === 400 && error.response.data.message.includes("password")) {
        errorMessage.value = "Les mots de passe ne correspondent pas, veuillez réessayer.";
      } else {
        errorMessage.value = "Une erreur s'est produite lors de l'inscription, veuillez réessayer plus tard.";
      }

      return { success: false, message: errorMessage.value };
    }
  }

  return {
    email,
    password,
    confirmpassword,
    token,
    errorMessage,
    login,
    register,
  };
});
