import Vue from "vue";
import Vuex, { Store } from "vuex";
import Request from "../api/index";

import { user } from "./modules/user.module";
import { finance } from "./modules/finance.module";
import { alert } from "./modules/alert.module";

Vue.use(Vuex);

const state = {
  req: new Request(),
  users: [],
  dataTableHeaders: [
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

export const mutations = {
  SET_USERS(state, users) {
    state.users = [...users];
  },
  ADD_PAYMENT(state, payload) {
    const index = state.users.findIndex(
      (user) => user.id === payload.beneficiary_account_id
    );

    const beneficiary = {
      ...this.state.user[index],
    };

    Vue.set(state.users, index, beneficiary);
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
  DEDUCT_PAYMENT(state, payload) {
    const index = state.users.findIndex(
      (user) => user.id === payload.remitter_account_id
    );

    const remitter = {
      ...this.state.user[index],
    };

    remitter.balance -= payload.amount;

    Vue.set(state.users, index, remitter);
  },
};

export const actions = {
  async getUsers({ dispatch, commit }) {
    try {
      const response = await this.state.req.make(
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
};

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
