// 用户相关请求
import { request } from "@/utils";


// 1. login
export function loginAPI(formData){
  return request({
    url:'/authorizations',
    method:'POST',
    data: formData
  })
}

// 2. 获取用户信息
export function getProfileAPI(){
  return request({
    url:'/user/profile',
    method:'GET'
  })
}