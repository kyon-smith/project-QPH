import {reqAddressInfo, reqTradeInfo} from "@/api";

export default {
  namespaced: true,
  state: {address: [], trade: {}},
  actions: {
    async getAddressInfo({commit}) {
      let result = await reqAddressInfo()
      if (result.code == 200) {
        commit('GETADDRESSINFO', result.data)
      } else {
        return new Promise.reject(new Error(result.message))
      }
    },
    async getTradeInfo({commit}) {
      let result = await reqTradeInfo()
      if (result.code == 200) {
        commit('GETTRADEINFO', result.data)
      } else {
        return new Promise.reject(new Error(result.message))
      }
    }
  },
  mutations: {
    GETADDRESSINFO(state, data) {
      state.address = data
    },
    GETTRADEINFO(state, data) {
      state.trade = data
    },
  },
  getters: {}
}