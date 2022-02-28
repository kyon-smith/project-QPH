import {reqAddToCart, reqGoodsInfo} from "@/api";

export default {
  namespaced: true,
  state: {goodsInfo: {}},
  actions: {
    async getGoodsInfo({commit}, skuid) {
      let result = await reqGoodsInfo(skuid)
      if (result.code === 200) {
        commit('GETGOODSINFO', result.data)
      } else {
        return Promise.reject(new Error('获取商品列表失败'))
      }
    },
    async AddToCart({commit}, {skuid, skuNum}) {
      let result = await reqAddToCart(skuid, skuNum)
      if (result.code === 200) {
        return '添加购物车成功'
      } else {
        return Promise.reject(new Error('添加购物车失败'))
      }
    },
  },
  mutations: {
    GETGOODSINFO(state, data) {
      state.goodsInfo = data
    }
  },
  getters: {
    categoryView(state) {
      return state.goodsInfo.categoryView || {}
    },
    skuInfo(state) {
      return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
      return state.goodsInfo.spuSaleAttrList || {}
    },
  }
}