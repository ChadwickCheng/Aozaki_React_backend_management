import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createArticleAPI, getArticleById, updateArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {
  // 获取频道
  const {channelList} = useChannel()
  // 表单提交
  const onFinish = formValue => {
    // console.log('表单提交:', formValue)
    // 校验图片数量是否符合要求
    if(imageList.length!==imageType) return message.warning('请上传正确数量的图片')
    const { title, content, channel_id } = formValue
    // 1. 按照文档二次处理数据
    const reqData = {
      title,
      content,
      cover:{
        type: imageType,// 0 无图 1 单图 3 三图
        // 编辑模式需要特别处理
        images:imageList.map(item =>{
          if(item.response){
            return item.response.data.url
          }else{
            return item.url
          }
      }) // 图片地址
      },
      channel_id
    }
    // 2. 调用接口 编辑状态使用不同接口 有无id
    if(articleId){
      updateArticleAPI({...reqData, id: articleId})
    }else{
      createArticleAPI(reqData)
    }
  }
  // 上传图片
  const [imageList,setImageList] = useState([])
  const onChange = (val) => {
    // console.log('上传图片')
    setImageList(val.fileList)
  }
  // 切换图片封面类型
  const [imageType, setImageType] = useState(0)
  const onTypeChange = (e) => {
    // console.log('切换图片封面类型:', e.target.value)
    setImageType(e.target.value)
  }
  // 回填数据
  const [SearchParams] = useSearchParams()
  const articleId = SearchParams.get('id')
  // 获取实例
  const [form] = Form.useForm()
  useEffect(()=>{
    // 1. 通过id获取数据
    async function getArticleDetail(){
      const res = await getArticleById(articleId)
      const data = res.data
      const {cover} = data
      form.setFieldsValue({
        ...data,
        type: cover.type //回填封面直接传type
      })
      // 回填图片列表
      setImageType(cover.type)
      // 显示图片
      setImageList(cover.images.map(url => {
        return {url}
      }))
    }
    // 有id才调用
    articleId && getArticleDetail()
    // 2. 调用组件实例方法
  },[articleId, form])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: `${articleId ? '编辑' : '发布'}文章` },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/* value作为接口提交字段 */}
              {channelList.map(item=><Option value={item.id} key={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
            listType选择文件框样式
            showUploadList显示上传列表
             */}
            {
              imageType > 0 &&
              <Upload
                name='image'
                listType="picture-card"
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                onChange={onChange}
                maxCount={imageType}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            }
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish