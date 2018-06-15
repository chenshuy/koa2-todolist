import http from './http';

// 接口
export default {
  // 用户注册
  userRegister(data) {
    return http.post('/api/register', data);
  },
  // 用户登录
  userLogin(data) {
    return http.post('/api/login', data);
  },
  // 获取用户信息
  getUserInfo() {
    return http.get('/api/userInfo');
  },
  // 删除用户
  delUser(data) {
    return http.post('/api/delUser', data);
  },
  // 获取用户信息
  getList(data) {
    return http.get('/api/getList', data);
  }
};
