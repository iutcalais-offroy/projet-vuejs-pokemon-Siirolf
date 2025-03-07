import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokemon-api-seyrinian-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function loginApi(email: string, password: string): Promise<string> {
  try {
    const response = await api.post('/users/login', { email, password });
    return response.data.token;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Échec de la connexion');
  }
}

export default api;