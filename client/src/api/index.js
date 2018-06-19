import http from './http';

// 接口
export default {
  // 用户注册
  userRegister(data) {
    return http.post('regist', data);
  },
  // 用户登录
  userLogin(data) {
    return http.post('login', data);
  },
  // 获取用户信息
  userInfo() {
    return http.get('userInfo');
  },
  // 获取列表
  getList() {
    return http.get('getList');
  },
  // 创建列表
  createList(data) {
    return http.post('createList', data);
  },
  // 删除列表
  delList(data) {
    return http.post('delList', data);
  },
  // 更新列表状态
  updateList(data) {
    return http.post('updateList', data);
  }
};
