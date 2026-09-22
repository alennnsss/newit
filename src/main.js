import { createApp } from 'vue'

import './style.css'
import App from './App.vue'
import router from './router/router.js'
import i18n from './locales/i18n.js';
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
app.use(i18n)
app.mount('#app')