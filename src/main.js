import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



// createApp(App).use(BootstrapVue).mount('#app');
createApp(App).use(router).mount('#app');


