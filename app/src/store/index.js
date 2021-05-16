import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1/api';

const state = {
  alertState: [],
  alertCounter: {},
}

const getters = {}

const actions = {

  getAlertState({ commit }) {
    axios.get(`${API_URL}/alert_state`)
    .then(response => {
      commit('SET_ALERT_STATE', response.data)
    })
  },

  getAlertCounter({ commit }) {
    axios.get(`${API_URL}/alert_counter/get_latest`)
    .then(response => {
      commit('SET_ALERT_COUNTER', response.data);
    })
  },

  async setAlertState({ dispatch }, { id }) {
    const response = await axios.get(`${API_URL}/alert_state/${id}/set_current`)
    if (200 <= response.status < 400) {
      await dispatch('getAlertState');
      await dispatch('getAlertCounter');
    }
  },

  async setAlertCounter({ dispatch, commit }, { value }) {
    const payload = {
      value: value,
      comment: 'set by Skaben Kontrol',
    }
    const response = await axios.post(`${API_URL}/alert_counter/`, payload);
    if (200 <= response.status < 400) {
      await dispatch('getAlertState');
      commit('SET_ALERT_COUNTER', response.data);
    }
  },

  get(args, { url }) {
    axios.get(url);
  }

}

const mutations = {

  SET_ALERT_STATE(state, alert) {
    state.alertState = alert;
  },

  SET_ALERT_COUNTER(state, counter) {
    state.alertCounter = counter;
  }

}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
