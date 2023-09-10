import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as VueRouter from 'vue-router';
import routes from './routes'
import { createPinia } from 'pinia';
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')

