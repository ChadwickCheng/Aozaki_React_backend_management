// 封装获取频道列表逻辑
import { useState, useEffect } from 'react'
import { getChannelAPI } from '@/apis/article'

function useChannel(){
  // 1. 获取频道列表逻辑
  // 获取频道
  const [channelList, setChannelList] = useState([])
  useEffect(()=>{
    // 1. 封装函数调用接口 2. 调用
    const getChannelList = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    getChannelList()
  },[])
  // 2. 返回频道列表数据
  return {channelList}
}

export {
  useChannel
}