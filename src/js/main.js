import { createApp } from 'vue'
import App from '../../App.vue'
import router from './router.js' 
import store from './store.js'

// Create the Vue application instance
const app = createApp(App)

// Use the router and store
app.use(router)
app.use(store)

// Mount the app to the #app div in index.html
app.mount('#app')