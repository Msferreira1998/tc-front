import { createApp } from 'vue';
import './assets/main.css';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';

import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'; // Importa o CSS do MDI

createApp(App).use(vuetify).use(store).mount('#app');
