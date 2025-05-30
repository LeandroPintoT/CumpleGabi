import './assets/main.css'
import App from './App.vue'

import {createApp} from 'vue'
import {createBootstrap} from 'bootstrap-vue-next'

// Add the necessary CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const app = createApp(App)
app.use(createBootstrap({components: true, directives: true}))
app.mount('#app')
