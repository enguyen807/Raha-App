import Vue from "vue";
import Vuex from "vuex";
import Request from "../api/index";

import { user } from "./modules/user.module";
import { finance } from "./modules/finance.module";
import { alert } from "./modules/alert.module";

Vue.use(Vuex);

const state = {
  req: new Request(),
  dataTableHeaders: [
    {
      text: "Account No.",
      value: "number",
      sortable: true,
    },
    {
      text: "Name",
      value: "name",
      sortable: true,
    },
    {
      text: "Balance",
      value: "balance",
      sortable: true,
    },
    { text: "Actions", value: "actions", sortable: false },
  ],
};

export const getters = {
  getDataTableHeaders: (state) => {
    return state.dataTableHeaders;
  },
};

export const mutations = {};

export const actions = {};

const modules = {
  user,
  finance,
  alert,
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
});
