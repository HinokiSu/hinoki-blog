import { createApp } from 'vue'
import App from './App.vue'
// router
import router from '@web/routes'
// pinia
import { createPinia } from 'pinia'
// fect-ui
import Fect from '@fect-ui/vue'
import '@fect-ui/vue/lib/main.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(Fect)
app.mount('#app')
