
import { createApp } from 'vue'
import App from './App.vue'
// import router from "./router"
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import router from "@/router";

createApp(App).use(router,ElementPlus).mount('#app');





