import Vue from "vue";
import Vuex, { Store } from "vuex";
import Request from "../api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    dataTableHeaders: [
      {
        text: "User",
        value: "name",
      },
      {
        text: "Balance",
        value: "balance",
      },
    ],
    req: new Request(),
  },
  getters: {
    getDataTableHeaders: (state) => {
      return state.dataTableHeaders;
    },
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
  },
  actions: {
    async getUsers({ commit }) {
      console.log(this.state.users);
      const response = await this.state.req.make(
        "POST",
        "/api/v1/accounts/search",
        {}
      );
      commit("SET_USERS", response.data.data);
    },
  },
  modules: {},
});
