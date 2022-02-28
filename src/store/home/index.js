import {reqBannerList, reqCategoryList, reqFloorList} from '@/api'
// 生成游客身份模块
import {getUUID} from '@/utils/uuid_token';

export default {
  namespaced: true,
  state: {categoryList: [], bannerList: [], floorList: [], uuid_token: getUUID()},
  actions: {
    async categoryList({commit}) {
      let result = await reqCategoryList()
      if (result.code === 200) {
        commit('CATEGORYLIST', result.data)
      }
    },
    async bannerList({commit}) {
      let result = await reqBannerList()
      if (result.code === 200) {
        commit('BANNERLIST', result.data)
      }
    },
    async floorList({commit}) {
      let result = await reqFloorList()
      if (result.code === 200) {
        commit('FLOORLIST', result.data)
      }
    },
  },
  mutations: {
    CATEGORYLIST(state, categoryList) {
      state.categoryList = categoryList
    },
    BANNERLIST(state, bannerList) {
      state.bannerList = bannerList
    },
    FLOORLIST(state, floorList) {
      state.floorList = floorList
    }
  },
  getters: {}
}