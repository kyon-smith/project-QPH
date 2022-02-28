import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const requests = axios.create({
  // 在域名端口后加基础路径
  baseURL: '/mock',
  // 请求超时
  timeout: 5000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {
  nprogress.start()
  return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  nprogress.done()
  return res.data
}, (error) => {
  console.log(error)
  return Promise.reject(new Error('失败！！'))
})

export default requests