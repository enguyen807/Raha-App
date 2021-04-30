const state = {};
const getters = {
  getUsers(state, getters, rootState) {
    return rootState.users;
  },
};
const mutations = {};
const actions = {
  updatePayment({ dispatch, commit }, payload) {
    if (payload.status !== 201) {
      dispatch("alert/error", payload.statusText, { root: true });
    } else {
      commit("UPDATE_PAYMENT", payload, { root: true });
      dispatch("alert/success", "Funds added successfully!", { root: true });
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
