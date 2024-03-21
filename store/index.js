import auth from "./auth-core";

export const state = () => ({
  toy: {},
});

export const mutations = {
  SET_EXAMPLE_ONE(state, data) {
    state.toy = data;
  },
};

export const actions = {
  setExampleOne({ commit }, data) {
    commit('SET_EXAMPLE_ONE', data);
  },
};

export const getters = {
  getExampleOne: (state) => state.toy,
};

export const modules = {
  auth,
}
