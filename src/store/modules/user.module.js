import Request from "../../api/index";

const state = {
  users: [],
  req: new Request(),
};
const getters = {
  getUsers(state) {
    return state.users;
  },
};
const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
};
const actions = {
  async getUsers({ dispatch, commit }) {
    // console.log(this.state.users);
    try {
      const response = await state.req.make(
        "POST",
        "/api/v1/accounts/search",
        {}
      );
      commit("SET_USERS", response.data.data);
    } catch (e) {
      throw e;
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
