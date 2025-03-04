import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import { createPinia } from 'pinia'
import axios from 'axios'

const app = createApp(App)
app.use(createPinia())
app.config.globalProperties.$axios = axios
app.use(router)
app.mount('#app')
