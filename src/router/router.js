import { createRouter, createWebHistory } from 'vue-router';
import AdminView from '../views/AdminView.vue';
import UserView from '../views/UserView.vue';
const routes = [
    {
        path: '/',
        name: 'admin',
        component: AdminView,
    },
    {
        path: '/user',
        name: 'user',
        component: UserView
    }
]
const router = createRouter({
    history: createWebHistory('/newit/'),
    routes
})

export default router