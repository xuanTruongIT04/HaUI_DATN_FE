const state = () => ({
  namespaced: true,
  token: null,
  isLogin: false,
});

const mutations = {
  setToken(state, token) {
    state.token = token;
    state.isLogin = !!token;
  },
  removeToken(state, token) {
    state.token = null;
    state.isLogin = false;
  },
};

const actions = {
  setToken({ commit }, token) {
    commit("setToken", token);
  },
  removeToken({ commit }, token) {
    commit("removeToken", token);
  },
};

export default {
  state,
  mutations,
  actions,
};
