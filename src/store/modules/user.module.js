import Request from "../../api/index";

const state = {
  req: new Request(),
  users: [],
};
const getters = {
  getUsers(state, getters, rootState) {
    return rootState.users;
  },
};
const mutations = {
  SET_USERS(state, users) {
    state.users = [...users];
  },
  ADD_USER(state, user) {
    state.users.push(...user);
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
