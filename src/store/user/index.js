import {reqCode, reqLogin, reqLogout, reqRegister, reqUserInfo} from "@/api";
import {setToken, getToken, removeToken} from "@/utils/token";

export default {
  namespaced: true,
  state: {
    code: '',
    token: getToken(),
    userInfo: {}
  },
  actions: {
    async getCode({commit}, phone) {
      let result = await reqCode(phone)
      if (result.code === 200) {
        commit('GETCODE', result.data)
        return result.message
      } else {
        return Promise.reject(new Error('获取验证码失败'))
      }
    },
    async userRegister({commit}, user) {
      let result = await reqRegister(user)
      if (result.code === 200) {
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogin({commit}, user) {
      let result = await reqLogin(user)
      if (result.code === 200) {
        commit('USERLOGIN', result.data.token)
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogout({commit}) {
      let result = await reqLogout()
      if (result.code === 200) {
        commit('USERLOGOUT')
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async getUserInfo({commit}) {
      let result = await reqUserInfo()
      if (result.code === 200) {
        commit('GETUSERINFO', result.data)
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    }
  },
  mutations: {
    GETCODE(state, code) {
      state.code = code
    },
    USERLOGIN(state, token) {
      state.token = token
      setToken(token)
    },
    USERLOGOUT(state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
    },
    GETUSERINFO(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  getters: {}
}