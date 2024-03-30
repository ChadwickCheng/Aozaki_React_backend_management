// 封装axios
import axios from "axios";
import {getToken} from '@/utils'
// 1. 根域名配置
// 2. 超时时间
const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})
// 3. 请求拦截器/响应拦截器
// 添加请求拦截器
// 请求发送前拦截，插入自定义配置，比如参数处理
request.interceptors.request.use((config)=> {
  // 在发送请求之前做些什么 例如加入token
  // 1. 获取token
  const token = getToken()
  // 2. 按照后端要求做token拼接
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error)=> {
  return Promise.reject(error)
})

// 添加响应拦截器
// 响应返回客户端前做拦截处理返回的数据
request.interceptors.response.use((response)=> {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, (error)=> {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export {
  request
}