import { createApp } from 'vue';
import './assets/main.css';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'; // Importa o CSS do MDI

createApp(App).use(vuetify).use(store).use(VueSweetalert2).mount('#app');
