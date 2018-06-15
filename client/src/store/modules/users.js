import * as types from '../types';

const users = {
  state: {
    token: localStorage.getItem('token') || null,
    userName: ''
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
    [types.USERNAME]: (state, data) => {
      state.userName = data;
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
    UserName({ commit }, data) {
      commit(types.USERNAME, data);
    }
  }
};
export default users;
