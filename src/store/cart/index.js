import {reqCartList, reqCheckCart, reqDeleteCartById} from "@/api";

export default {
  namespaced: true,
  state: {cartListObj: {}},
  actions: {
    async getCartList({commit}) {
      let result = await reqCartList()
      if (result.code === 200) {
        commit('GETCARTLIST', result.data)
      }
    },
    async deleteCartById({commit}, skuId) {
      let result = await reqDeleteCartById(skuId)
      if (result.code === 200) {
        return '删除购物车成功'
      } else {
        return Promise.reject(new Error('删除购物车失败'))
      }
    },
    async deleteCart({dispatch, getters}) {
      let promiseAll = []
      getters.cartList.cartInfoList.forEach((cartInfo) => {
        if (cartInfo.isChecked == 1)
          promiseAll.push(dispatch('deleteCartById', cartInfo.skuId))
      })
      return Promise.all(promiseAll)
    },
    async CheckCart({commit}, {skuId, isChecked}) {
      let result = await reqCheckCart(skuId, isChecked)
      if (result.code === 200) {
        return '勾选/取消勾选成功'
      } else {
        return Promise.reject(new Error('勾选/取消勾选失败'))
      }

    },
    async updateAllcheck({dispatch, getters}, isChecked) {
      let promiseAll = []
      getters.cartList.cartInfoList.forEach((cartInfo) => {
        promiseAll.push(dispatch('CheckCart', {skuId: cartInfo.skuId, isChecked}))
      })
      return Promise.all(promiseAll)
    }
  },
  mutations: {
    GETCARTLIST(state, data) {
      state.cartListObj = data
    },
  },
  getters: {
    cartList(state) {
      return state.cartListObj[0] || {}
    }
  }
}