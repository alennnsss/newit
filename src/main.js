import { createApp } from 'vue'

import './style.css'
import App from './App.vue'
import router from './router/router.js'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.mount('#app')