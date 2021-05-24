import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const API_URL = process.env.VUE_APP_API_URL;

const state = {
  alertState: [],
  alertCounter: {},
  locks: [],
  terminals: [],
}

const getters = {}

const actions = {

  getTerminalDevices({ commit }) {
    axios.get(`${API_URL}/terminal`)
    .then(response => {
      commit('SET_TERMINALS', response.data)
    })
  },

  getLockDevices({ commit }) {
    axios.get(`${API_URL}/lock`)
    .then(response => {
      commit('SET_LOCKS', response.data)
    })
  },

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

  async setTerminal(args, { id, payload }) {
    const response = await axios.put(`${API_URL}/terminal/${id}/`, payload);
    if (200 <= response.status < 400) {
      console.log(response.data);
    }
  },

  get(args, { url }) {
    axios.get(url);
  },

  async periodicUpdate({dispatch}) {
    const awaitUpdate = [
      'getAlertState',
      'getAlertCounter',
      'getTerminalDevices',
      'getLockDevices',
    ];
    for await(const item of awaitUpdate) {
      dispatch(item);
    }
  }

}

const mutations = {

  SET_ALERT_STATE(state, alert) {
    state.alertState = alert;
    Vue.prototype.$socket.send({'test': 'test'});
  },

  SET_ALERT_COUNTER(state, counter) {
    state.alertCounter = counter;
  },

  SET_TERMINALS(state, terminals) {
    state.terminals = terminals
  },

  SET_LOCKS(state, locks) {
    state.locks = locks
  },

}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
