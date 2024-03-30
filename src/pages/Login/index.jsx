import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // 获取表单数据
  const onFinish = async (values) => {
    // console.log(values);
    // 触发异步请求
    await dispatch(fetchLogin(values))
    // 1. 请求成功，跳转到首页 2. 提示用户登录成功
    navigate('/')
    message.success('登录成功')
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form 
          validateTrigger='onBlur'
          onFinish={onFinish}
        >
          <Form.Item
            name="mobile"
            // 多条逻辑串行校验
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式不正确',
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
              {
                pattern: /^\d{6}$/,
                message: '验证码必须是六位数字',
              },
            ]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login