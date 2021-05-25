import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../util/axios';
import axiosPure from 'axios';

const ROOT_URL = process.env.VUE_APP_ROOT_URL;

Vue.use(Vuex);

const state = {
  alertState: [],
  alertCounter: {},
  locks: [],
  terminals: [],
}

const getters = {
}

const actions = {

  getTerminalDevices({ commit }) {
    axios.get(`/terminal`)
    .then(response => {
      commit('SET_TERMINALS', response.data)
    })
  },

  getLockDevices({ commit }) {
    axios.get(`/lock`)
    .then(response => {
      commit('SET_LOCKS', response.data)
    })
  },

  getAlertState({ commit }) {
    axios.get(`/alert_state`)
    .then(response => {
      commit('SET_ALERT_STATE', response.data)
    })
  },

  getAlertCounter({ commit }) {
    axios.get(`/alert_counter/get_latest`)
    .then(response => {
      commit('SET_ALERT_COUNTER', response.data);
    })
  },

  async setAlertState({ dispatch }, { id }) {
    const response = await axios.get(`/alert_state/${id}/set_current`)
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
    const response = await axios.post(`/alert_counter/`, payload);
    if (200 <= response.status < 400) {
      await dispatch('getAlertState');
      commit('SET_ALERT_COUNTER', response.data);
    } else {
      console.error(response);
    }
  },

  async setTerminal({ dispatch }, { id, payload }) {
    const response = await axios.patch(`/terminal/${id}/`, payload);
    if (200 <= response.status < 400) {
      console.log(response.data);
      await dispatch('updateAll');
    }
  },

  async setLock({ dispatch }, { id, payload }) {
    const response = await axios.patch(`/lock/${id}/`, payload);
    if (200 <= response.status < 400) {
      console.log(response.data);
      await dispatch('updateAll');
    }
  },

  async updateAll() {
    await axiosPure.get(`${ROOT_URL}/device/update`);
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

  SET_TOKEN(state, data) {
    state.token = data.token;
  }

}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
