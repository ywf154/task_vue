import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router';
import kindList from '@/views/kindList.vue';
import tasks0List from '@/views/tasks0List.vue';
import tasksList from '@/views/tasksList.vue';
/******定义路由关系******/
const routes = [
    { path: '/task', component: tasks0List },
    { path: '/task/all', component: tasksList },
    { path: '/kind', component: kindList },
]
/******创建路由器******/
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')