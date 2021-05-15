require('dotenv').config()

import Vue from 'vue'
import App from './App.vue'

import Vuex from 'vuex'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
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

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
