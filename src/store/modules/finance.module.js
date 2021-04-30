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
  UPDATE_USER(state, updatedUser) {
    const index = state.users.findIndex(
      (user) => user.id === updatedUser.beneficiary_account_id
    );
    Vue.set(state.users, index, updatedUser);
  },
};
const actions = {
  async getUsers({ commit }) {
    console.log(state.users);
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
  saveUser({ commit }, payload) {
    console.log(payload);
    commit("UPDATE_USER", payload);
    store.dispatch("SET_USERS");
  },
};

export const finance = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
