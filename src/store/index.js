import Vue from "vue";
import Vuex, { Store } from "vuex";
import Request from "../api/index";

import { user } from "./modules/user.module";
import { finance } from "./modules/finance.module";
import { alert } from "./modules/alert.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    req: new Request(),
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
    ADD_PAYMENT(state, payload) {
      const index = state.users.findIndex(
        (user) => user.id === payload.beneficiary_account_id
      );
      Vue.set(state.users, index, payload);
    },
    UPDATE_BALANCES(state, payload) {
      const remitterIndex = state.users.findIndex((u) => {
        return u.id === payload.remitter_account_id;
      });

      const beneficiaryIndex = state.users.findIndex((u) => {
        return u.id === payload.beneficiary_account_id;
      });

      const remitter = {
        ...this.state.user[remitterIndex],
      };

      const beneficiary = {
        ...this.state.user[beneficiaryIndex],
      };

      remitter.balance -= payload.amount;
      beneficiary.balance += payload.amount;

      Vue.set(state.users, remitterIndex, remitter);
      Vue.set(state.users, beneficiaryIndex, beneficiary);
    },
  },
  actions: {
    async getUsers({ dispatch, commit }) {
      // console.log(this.state.users);

      try {
        const response = await this.state.req.make(
          "POST",
          "/api/v1/accounts/search",
          {}
        );
        commit("SET_USERS", response.data.data);
      } catch (e) {
        throw e;
      }
    },
  },
  modules: {
    user,
    finance,
    alert,
  },
});
