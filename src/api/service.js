import axios from 'axios'
import {ElMessage} from 'element-plus'// 假设使用了 Element UI 组件库
import {config} from '@/../config'
// 创建 Axios 实例
const service = axios.create({
baseURL: config.serverUrl,// 修改为正确的 URL
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在这里可以添加一些请求拦截逻辑
    return config
  },
  error => {
    // 处理请求错误
    ElMessage.error('服务异常')
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { data } = response
    if (data.code === 0) {
      // 请求成功,返回数据
      return data
    } else {
      // 请求失败,显示错误消息
      ElMessage.error(data.msg || '服务异常')
      return Promise.reject(new Error(data.msg || 'Error'))
    }
  },
  error => {
    // 处理响应错误
    ElMessage.error('服务异常')
    return Promise.reject(error)
  }
)

export default service
