import auth from "./auth-core";

export const state = () => ({
  bill: {},
});

export const mutations = {
  SET_BILL_DATA(state, data) {
    state.bill = data;
  },
};

export const actions = {
  setBillData({ commit }, data) {
    commit('SET_BILL_DATA', data);
  },
};

export const getters = {
  getBillData: (state) => state.bill,
};

export const modules = {
  auth,
}
