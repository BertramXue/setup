// import 'virtual:windi.css'
// import 'virtual:windi-devtools'
import '@/theme/index.less'

import { createApp } from 'vue'
import { idux, iduxChart } from './plugins'
import router from './router'
import store from './store'
import App from './App.vue'

createApp(App).use(idux).use(iduxChart).use(store).use(router).mount('#app')
