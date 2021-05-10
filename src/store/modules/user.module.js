import Vue from "vue";
import Request from "../../api/index";

const state = {
  req: new Request(),
  users: [],
};
const getters = {
  getUsers(state) {
    return state.users;
  },
};
const mutations = {
  SET_USERS(state, users) {
    state.users = [...users];
  },
  UPDATE_BALANCE(state, { index = null, userObj = null }) {
    Vue.set(state.users, index, userObj);
  },
  CREATE_USER(state, payload) {
    console.log(payload);
    state.users.unshift(payload);
  },
};
const actions = {
  async getUsers({ dispatch, commit }) {
    try {
      const response = await state.req.make(
        "POST",
        "/api/v1/accounts/search",
        {}
      );
      commit("SET_USERS", response.data.data);
    } catch (e) {
      setTimeout(() => {
        dispatch("alert/error", e.response.statusText, { root: true });
      });
    }
  },
  async createUser({ dispatch, commit }, payload) {
    try {
      const response = await this.state.req.make(
        "POST",
        "/api/v1/accounts",
        payload
      );
      commit("CREATE_USER", response.data.data);
      dispatch("alert/success", "User created successfully!", {
        root: true,
      });

      setTimeout(() => {
        dispatch("alert/clear", null, { root: true });
      }, 3000);
      return response;
    } catch (error) {
      const errorMsg = error;
      dispatch("alert/error", errorMsg, { root: true });
    }
  },
};

export const user = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
