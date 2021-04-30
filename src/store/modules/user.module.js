const state = {};
const getters = {
  getUsers(state, getters, rootState) {
    return rootState.users;
  },
};
const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
};
const actions = {};

export const user = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
