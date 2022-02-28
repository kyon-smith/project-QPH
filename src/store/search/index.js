import {reqSearchList} from "@/api";

export default {
  namespaced: true,
  state: {searchList: {}},
  actions: {
    async searchList(context, params = {}) {
      let result = await reqSearchList(params)
      if (result.code === 200) {
        context.commit('SEARCHLIST', result.data)
      }
    }
  },
  mutations: {
    SEARCHLIST(state, searchList) {
      state.searchList = searchList
    }
  },
  getters: {
    goodsList(state) {
      return state.searchList.goodsList || []
    }
  }
}