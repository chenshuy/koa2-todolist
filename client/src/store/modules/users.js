import * as types from '../types';

const users = {
  state: {
    token: localStorage.getItem('token') || null,
    userInfo: ''
  },
  getters: {
    token: state => state.token
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.setItem('token', data);
      state.token = data;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      state.token = null;
    },
    [types.USERINFO]: (state, data) => {
      state.userInfo = data;
    }
  },
  actions: {
    // 登录
    UserLogin({ commit }, data) {
      commit(types.LOGIN, data);
    },
    // 退出
    UserLogout({ commit }) {
      commit(types.LOGOUT);
    },
    // 获取用户信息
    UserInfo({ commit }, data) {
      commit(types.USERINFO, data);
    }
  }
};
export default users;
