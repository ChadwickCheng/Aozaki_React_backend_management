// 高阶组件
// 有token跳转 无token跳转登录
import {getToken} from '@/utils'
import { Navigate } from 'react-router-dom' 

export function AuthRoute ({children}){
  const token = getToken()
  if(token){
    return <>{children}</>
  }else{
    return <Navigate to="/login" replace/>
  }
}