import { createApp } from 'vue'
import App from './App.vue'
// router
import router from '@web/routes'
// pinia
import { createPinia } from 'pinia'
// ant-design-vue
import 'ant-design-vue/dist/antd.css'
// fect-ui
import { FectUIRegister } from './utils/third-ui/fect-ui'
// hightlight.js css
import 'highlight.js/styles/github.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
FectUIRegister(app)

app.mount('#app')
