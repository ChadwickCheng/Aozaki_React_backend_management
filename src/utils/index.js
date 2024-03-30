// 中转文件，用于导出所有的工具函数，方便统一导入
// import {request} from '@/utils'
import {request} from './request'
import {getToken, setToken, removeToken} from './token'

export {
  request,
  getToken,
  setToken,
  removeToken
}