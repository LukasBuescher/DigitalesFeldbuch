import '@ionic/core/css/core.css'
import '@ionic/core/css/ionic.bundle.css'

import Vue from 'vue'
import IonicVue from '@ionic/vue'
import App from './App'
import router from './router'
import VueCookies from 'vue-cookies'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(IonicVue)
Vue.use(VueCookies)
VueCookies.config('7d')
//Vue.use(require('vue-babylonjs'));
import vb from 'vue-babylonjs';
Vue.use(vb);
import { plugin, Scene, Box, Cannon } from 'vue-babylonjs';
Vue.use(plugin, { components: { Scene, Box, Physics: Cannon } });
// set global cookie
VueCookies.set('theme', 'default')
VueCookies.set('hover-time', '1s')



new Vue({
  el: '#app',
  vuetify,
  router,
  render: h => h(App)
})
