import axios from 'axios'
import ElementUI from 'element-ui'
import routerIndex from '../router/index'

let token = ''

axios.defaults.withCredentials = false;
// 不在这里放token
// axios.defaults.headers.common['token'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'// 配置请求头

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  let user = JSON.parse(localStorage.getItem('access-user'));
  if (user) {
    token = user.token;
  }
  if (token) {
    config.headers.common['Authorization'] = 'Bearer ' + token;
  }
  // console.dir(config);
  return config
}, function (error) {
  // Do something with request error
  console.info("error: ");
  console.info(error);
  return Promise.reject(error);
});

// 添加一个响应拦截器
// axios.interceptors.response.use(function (response) {
//   if (response.data && response.data.code) {
//     if (parseInt(response.data.code) === 108 || parseInt(response.data.code) === 109 || response.data.msg === '鉴权失败，Token 超时' || response.data.msg === '鉴权失败，Token 错误') {
//       //未登录
//       response.data.msg = "登录信息已失效，请重新登录";
//       ElementUI.Message.error(response.data.msg);
//       routerIndex.push('/login');
//     }
//     if (parseInt(response.data.code) === -1) {
//       ElementUI.Message.error("请求失败");
//     }
//   }
//   return response;
// }, function (error) {
//   // Do something with response error
//   console.dir(error);
//   ElementUI.Message.error("服务器连接失败");
//   return Promise.reject(error);
// })

//基地址
let base = process.env.BASE_API;

//测试使用
export const ISDEV = process.env.isDev;

//通用方法
export const POST = (url, params) => {
  const getTimestamp = new Date().getTime();
  return axios.post(`${base}${url}?timer=${getTimestamp}`, params).then(res => res.data)
}

export const GET = (url, params) => {
  const getTimestamp = new Date().getTime();
  return axios.get(`${base}${url}?timer=${getTimestamp}`, { params: params }).then(res => res.data)
}

export const PUT = (url, params) => {
  return axios.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return axios.delete(`${base}${url}`, { params: params }).then(res => res.data)
}

export const PATCH = (url, params) => {
  return axios.patch(`${base}${url}`, params).then(res => res.data)
}

export const POSTIMAGE = (url, params, config) => {
  const getTimestamp = new Date().getTime();
  return axios.post(`${base}${url}?timer=${getTimestamp}`, params, config).then(res => res.data)
}
