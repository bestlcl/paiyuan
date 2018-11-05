import axios from 'axios'
import {Toast} from 'mint-ui'
import ERR_CODE from './errorCode'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000

// 请求拦截器
axios.interceptors.request.use(function (config) {
  console.log(config)
  return config
}, function (error) {
  Toast({
    message: ERR_CODE.TIME_OUT.MSG,
    position: 'bottom',
    duration: 800
  })
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

// 封装axios的请求
export function fetch (url, method, params) {
  if (method === 'get') {
    return new Promise((resolve, reject) => {
      axios.get(url, params)
        .then(response => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  } else if (method === 'post') {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(response => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default {
  getData (url, method, params) {
    return fetch(url, method, params)
  }
}
