import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import NaiveUI from 'naive-ui';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(NaiveUI);
app.mount('#app');