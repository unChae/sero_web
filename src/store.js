import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

import { getAdminData } from './api/authApi'

export default new Vuex.Store({
  state: {
    adminData: {},
  },
  getters: {
    getAdminData: state => {
      return state.adminData
    }
  },
  mutations: {
    setAdminData(state, payload) {
      state.adminData = payload 
    }
  },
  actions: {
    async getAdminData({commit}) {
      let adToken = localStorage.getItem("adToken")
      let adId = localStorage.getItem("adId")
      let payload = {
        adToken,
        adId
      }
      let res = await getAdminData(payload)
      commit('setAdminData', res.data.data)
    }
  }
});