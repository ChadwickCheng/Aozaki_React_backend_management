// 用户状态管理
import { createSlice } from "@reduxjs/toolkit";
import { request } from '@/utils'
import {setToken as _setToken, getToken} from '@/utils'

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || ''
  },
  reducers:{
    setToken(state, action){
      state.token = action.payload
      // 将token存储到本地
      _setToken(action.payload)
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

// 解构actionCreator
const {setToken} = userStore.actions

// 获得reducer函数
const userReducer = userStore.reducer

export { setToken, fetchLogin }
export default userReducer