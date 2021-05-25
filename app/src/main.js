import Vue from 'vue'
import App from './App.vue'

import Vuex from 'vuex'

import axios from './util/axios'
import VueAxios from 'vue-axios'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

// import VueSocketIO from 'vue-socket.io'

import store from './store'

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
//     faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
//     faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
//     faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
//     faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload);

// Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Buefy)
Vue.use(VueAxios, axios)

//const WEBSOCKET_URL = process.env.VUE_APP_WS_URL;
//
// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: `${WEBSOCKET_URL}`,
//     vuex: {
//         store,
//         actionPrefix: 'SOCKET_',
//         mutationPrefix: 'SOCKET_'
//     },
//     options: { path: "/ws/" } //Optional options
// }))

new Vue({
  store,
  render: h => h(App),

  created() {
    const timeout = process.env.VUE_APP_TIMEOUT || 1000;
    setInterval(this.setUpdates, timeout)
  },

  methods: {
    setUpdates() {
      this.$store.dispatch('periodicUpdate');
    }
  }
}).$mount('#app')
