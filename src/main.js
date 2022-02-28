import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import Carsouel from '@/components/Carsouel'
import Pagination from '@/components/Pagination'
import store from '@/store'
import '@/mock/mockServe'
import 'swiper/css/swiper.min.css'
import * as API from '@/api'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.jpg'

import {MessageBox} from 'element-ui'

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsouel.name, Carsouel)
Vue.component(Pagination.name, Pagination)


Vue.config.productionTip = false


Vue.use(VueLazyload, {
  loading,
})
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`
  },
  //显示别名
  attributes: {
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password1: '确认密码',
    agree: '协议'
  }
})
//自定义校验规则
VeeValidate.Validator.extend('agreeRule', {
  validate: value => value,
  getMessage(field, params, data) {
    return field + '必须同意'
  }
})


API.reqCategoryList()

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$api = API
  }
}).$mount('#app')
