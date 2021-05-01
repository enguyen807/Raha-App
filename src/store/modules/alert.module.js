// Sets success or error alert messages

const state = {
  type: null,
  message: null,
  showAlert: false,
};

const actions = {
  success({ commit }, message) {
    commit("success", message);
  },
  error({ commit }, message) {
    commit("error", message);
  },
  clear({ commit }) {
    commit("clear");
  },
};

const mutations = {
  success(state, message) {
    state.showAlert = true;
    state.type = "success";
    state.message = message;
  },
  error(state, message) {
    state.showAlert = true;
    state.type = "error";
    state.message = message;
  },
  clear(state) {
    state.showAlert = false;
    state.type = null;
    state.message = null;
  },
};

export const alert = {
  namespaced: true,
  state,
  actions,
  mutations,
};
