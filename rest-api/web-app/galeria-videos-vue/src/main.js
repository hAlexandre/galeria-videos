import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import ManterGaleria from './components/galeria/ManterGaleria.vue'
import Home from './components/home/Home.vue'

Vue.use(VueRouter);

Vue.config.productionTip = false

const routes = [
  {
    name: 'ManterGaleria',
    path: '/manterGaleria',
    component: ManterGaleria
  },
  {
    name: 'Home',
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({mod: 'history', routes: routes});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
