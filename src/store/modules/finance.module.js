import Request from "../../api/index";

const state = {
  req: new Request(),
};
const getters = {
  getUsers(state, getters, rootState) {
    return rootState.users;
  },
};
const mutations = {};
const actions = {
  async addPayment({ dispatch, commit }, payload) {
    // console.log("Inside Finance Module: " + payload);

    try {
      const response = await this.state.req.make(
        "POST",
        "/api/v1/payments",
        payload
      );
      commit("ADD_PAYMENT", response.data.data, { root: true });
      setTimeout(() => {
        dispatch("alert/success", "Funds added successfully!", { root: true });
      });
      return response;
    } catch (error) {
      const errorMsg = error;
      dispatch("alert/error", errorMsg, { root: true });
    }
  },
  transferPayment({ dispatch, commit }, payload) {
    console.log(payload);
    if (payload.status !== 201) {
      setTimeout(() => {
        dispatch("alert/error", payload.statusText, { root: true });
      });
    } else {
      commit("TRANSFER_PAYMENT", payload, { root: true });
      setTimeout(() => {
        dispatch("alert/success", "Funds sent successfully!", {
          root: true,
        });
      });
    }
  },
  deductPayment({ dispatch, commit }, payload) {
    if (payload.status !== 201) {
      setTimeout(() => {
        dispatch("alert/error", payload.statusText, { root: true });
      });
    } else {
      commit("DEDUCT_PAYMENT", payload, { root: true });
      setTimeout(() => {
        dispatch("alert/success", "Funds deducted successfully!", {
          root: true,
        });
      });
    }
  },
};

export const finance = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
