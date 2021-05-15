import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

//const config = dotenv.config();
const API_URL = 'http://127.0.0.1/api';

console.log(API_URL);

//to handle state
const state = {
  alert: []
}

//to handle state
const getters = {}

//to handle actions
const actions = {

  getAlert({ commit }) {
    axios.get(`${API_URL}/alert_state`)
    .then(response => {
      commit('GET_ALERT', response.data)
    })
  },

  setAlert: ({ dispatch }, { id }) => {
    axios.get(`${API_URL}/alert_state/${id}/set_current`)
    .then(() => {
      dispatch('getAlert');
    });
  }

}

//to handle mutations
const mutations = {

  GET_ALERT(state, alert) {
    state.alert = alert
  }

}

//export store module

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
