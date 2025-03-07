import { defineStore } from 'pinia';
import { ref } from 'vue';
import { loginApi } from '../api/login.api';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const email = ref<string>('');
  const password = ref<string>('');
  const token = ref<string | null>(null);
  const errorMessage = ref<string>('');

  async function login() {
    try {
      console.log('Attempting login with', email.value, password.value);
      const jwt = await loginApi(email.value, password.value);
      token.value = jwt;

      console.log('Token received:', token.value);
      localStorage.setItem('jwt', token.value);
    } catch (error: any) {
      console.error('Login error:', error);
      errorMessage.value = error.message;
    }
  }

  async function register(email: string, password: string) {
    try {
      console.log('Attempting registration with', email, password);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        email,
        password,
      });
      console.log('Registration successful:', response.data);
    } catch (error: any) {
      console.error('Registration error:', error);
      errorMessage.value = error.message;
    }
  }

  return { email, password, token, errorMessage, login, register };
});