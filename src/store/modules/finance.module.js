import Request from "../../api/index";

const state = {
  req: new Request(),
};
const getters = {};
const mutations = {};
const actions = {
  getUsers({ dispatch, commit, getters, rootGetters }) {
    dispatch("user/getUsers", null, { root: true });
  },
  async addPayment({ dispatch, commit, rootState }, payload) {
    const localUserState = rootState.user.users;
    try {
      const response = await state.req.make(
        "POST",
        "/api/v1/payments",
        payload
      );

      const user = response.data.data;

      const index = localUserState.findIndex(
        (u) => u.id === user.beneficiary_account_id
      );
      const userObj = {
        ...localUserState[index],
      };

      userObj.balance += user.amount;

      commit("user/UPDATE_BALANCE", { index, userObj }, { root: true });
      dispatch(
        "alert/success",
        `$${user.amount} successfully added to ${user.beneficiary_name}'s account!`,
        { root: true }
      );

      setTimeout(() => {
        dispatch("alert/clear", null, { root: true });
      }, 3000);
      return response;
    } catch (error) {
      const errorMsg = error;
      dispatch("alert/error", errorMsg, { root: true });
    }
  },
  async transferPayment({ dispatch, commit, rootState }, payload) {
    const localUserState = rootState.user.users;
    try {
      const response = await this.state.req.make(
        "POST",
        "/api/v1/payments",
        payload
      );

      const user = response.data.data;

      console.log(user);

      // Get beneficiary index and object
      let index = localUserState.findIndex(
        (u) => u.id === user.beneficiary_account_id
      );
      let userObj = {
        ...localUserState[index],
      };
      userObj.balance += user.amount;
      commit("user/UPDATE_BALANCE", { index, userObj }, { root: true });

      // Get remitter index and object
      index = localUserState.findIndex(
        (u) => u.id === user.remitter_account_id
      );
      userObj = {
        ...localUserState[index],
      };
      userObj.balance -= user.amount;
      commit("user/UPDATE_BALANCE", { index, userObj }, { root: true });

      dispatch(
        "alert/success",
        `${user.amount} transfered from ${user.remitter_name} to ${user.beneficiary_name} successfully!`,
        {
          root: true,
        }
      );
      setTimeout(() => {
        dispatch("alert/clear", null, { root: true });
      }, 3000);
      return response;
    } catch (error) {
      const errorMsg = error;
      dispatch("alert/error", errorMsg, { root: true });
    }
  },
  async deductPayment({ dispatch, commit, rootState }, payload) {
    const localUserState = rootState.user.users;
    try {
      const response = await this.state.req.make(
        "POST",
        "/api/v1/payments",
        payload
      );

      const user = response.data.data;

      console.log(user);
      const index = localUserState.findIndex(
        (u) => u.id === user.remitter_account_id
      );
      const userObj = {
        ...localUserState[index],
      };

      userObj.balance -= user.amount;

      commit("user/UPDATE_BALANCE", { index, userObj }, { root: true });
      dispatch(
        "alert/success",
        `${user.amount} has been deducted from ${user.beneficiary_name}'s account successfully!`,
        {
          root: true,
        }
      );
      setTimeout(() => {
        dispatch("alert/clear", null, { root: true });
      }, 3000);
      return response;
      return response;
    } catch (error) {
      const errorMsg = error;
      dispatch("alert/error", errorMsg, { root: true });
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
