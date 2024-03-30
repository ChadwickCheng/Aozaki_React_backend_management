// 封装文章接口
import {request} from '@/utils/request'

// 1.  获取频道列表
export function getChannelAPI(){
  return request({
    url:'/channels',
    method:'GET'
  })
}