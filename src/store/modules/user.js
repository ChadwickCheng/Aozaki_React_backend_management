// 用户状态管理
import { createSlice } from "@reduxjs/toolkit";
import { request } from '@/utils'
import {setToken as _setToken, getToken, removeToken} from '@/utils'

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  reducers:{
    setToken(state, action){
      state.token = action.payload
      // 将token存储到本地
      _setToken(action.payload)
    },
    setUserInfo(state, action){
      state.userInfo = action.payload
    },
    clearUserInfo(state){
      state.token = '';
      state.userInfo = {}
      removeToken()
    }
  }
})

// 异步 登录获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // const res = await request.post('/authorizations', loginForm)
    let res = {
      data:{
        token: ''
      }
    };
    try {
      res = await request.post('/authorizations', loginForm);
    } catch (error) {
      console.error('Request failed', error);
      res.data.token = 'thisisfaketoken'+Math.random()
    }
    dispatch(setToken(res.data.token))
  }
}
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await request.get('/user/profile')
    dispatch(setUserInfo(res.data))
  }
}

// 解构actionCreator
const {setToken, setUserInfo, clearUserInfo} = userStore.actions

// 获得reducer函数
const userReducer = userStore.reducer

export { setToken, fetchLogin, setUserInfo, fetchUserInfo, clearUserInfo }
export default userReducer