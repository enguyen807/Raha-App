import Vue from "vue";
import Vuex, { Store } from "vuex";

import { user } from "./modules/user.module";
import { finance } from "./modules/finance.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
  },
  getters: {
    getDataTableHeaders: (state) => {
      return state.dataTableHeaders;
    },
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    finance,
  },
});
