import requests from './request'
import mockRequest from './mockRequest'

//获取三级导航
export const reqCategoryList = () => requests({
  url: '/product/getBaseCategoryList',
  method: 'get',
})

//获取搜索列表
export const reqSearchList = (data) => requests({
  url: '/list',
  method: 'post',
  data
})

//获取物品详情
export const reqGoodsInfo = (skuid) => requests({
  url: `/item/${skuid}`,
  method: 'get'
})

//添加/修改购物车
export const reqAddToCart = (skuid, skuNum) => requests({
  url: `/cart/addToCart/${skuid}/${skuNum}`,
  method: 'post'
})

//请求购物车
export const reqCartList = () => requests({
  url: `/cart/cartList`,
  method: 'get'
})

//删除购物车
export const reqDeleteCartById = (skuId) => requests({
  url: `/cart/deleteCart/${skuId}`,
  method: 'delete'
})

//修改购物车勾选
export const reqCheckCart = (skuId, isChecked) => requests({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})

//获取验证码
export const reqCode = (phone) => requests({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
})

//注册用户
export const reqRegister = (data) => requests({
  url: '/user/passport/register',
  data,
  method: 'post'
})

//登录
export const reqLogin = (data) => requests({
  url: '/user/passport/login',
  data,
  method: 'post'
})

//校验token
export const reqUserInfo = () => requests({
  url: '/user/passport/auth/getUserInfo',
  method: 'get'
})

//退出登录
export const reqLogout = () => requests({
  url: '/user/passport/logout',
  method: 'get'
})

//获取订单地址
export const reqAddressInfo = () => requests({
  url: '/user/userAddress/auth/findUserAddressList',
  method: 'get'
})

//获取商品清单
export const reqTradeInfo = () => requests({
  url: '/order/auth/trade',
  method: 'get'
})

//提交订单
export const reqOrder = (tradeNo, data) => requests({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  data,
  method: 'post'
})

//获取订单支付信息
export const reqOrderInfo = (orderId) => requests({
  url: `/payment/weixin/createNative/${orderId}`,
  method: 'get'
})

//获取订单支付状态
export const reqOrderStatus = (orderId) => requests({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  method: 'get'
})

//获取我的订单
export const reqMyOrder = (page,limit) => requests({
  url: `/order/auth/${page}/${limit}`,
  method: 'get'
})

export const reqBannerList = () => mockRequest({
  url: '/banners',
  method: 'get',
})

export const reqFloorList = () => mockRequest({
  url: '/floors',
  method: 'get',
})