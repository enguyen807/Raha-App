const state = {};
const getters = {
  getUsers(state, getters, rootState) {
    return rootState.users;
  },
};
const mutations = {};
const actions = {
  addPayment({ dispatch, commit }, payload) {
    if (payload.status !== 201) {
      dispatch("alert/error", payload.statusText, { root: true });
    } else {
      commit("ADD_PAYMENT", payload, { root: true });
      dispatch("alert/success", "Funds added successfully!", { root: true });
    }
  },
  updateBalances({ dispatch, commit }, payload) {
    console.log(payload);
    if (payload.status !== 201) {
      dispatch("alert/error", payload.statusText, { root: true });
    } else {
      commit("UPDATE_BALANCES", payload, { root: true });
      dispatch("alert/success", "Funds added successfully!", {
        root: true,
      });
    }
  },
  deductPayment({ dispatch, commit }, payload) {
    if (payload.status !== 201) {
      dispatch("alert/error", payload.statusText, { root: true });
    } else {
      commit("DEDUCT_PAYMENT", payload, { root: true });
      dispatch("alert/success", "Funds deducted successfully!", {
        root: true,
      });
    }
  },
};

export const finance = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
