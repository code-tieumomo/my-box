import { createStore } from "vuex";
import axiosClient from "../../axios";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  plugins: [createPersistedState()],
  state: {
    user: {
      data: null,
      token: sessionStorage.getItem("TOKEN")
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  },
  actions: {
    register({ commit }, user) {
      return axiosClient.post("register", user)
          .then(({ data }) => {
            commit("setUser", data);

            return data;
          });
    },
    login({ commit }, user) {
      return axiosClient.post("login", user)
          .then(({ data }) => {
            commit("setUser", data);

            return data;
          });
    },
    logout({ commit }) {
      return axiosClient.post("logout")
          .then(({ data }) => {
            commit("logout");

            return data;
          });
    },
    getProfile({ commit }) {
      return axiosClient.get("user")
          .then(({ data }) => {
            commit("setUserData", data);

            return data;
          });
    },
    updateProfile({ commit }, data) {
      return axiosClient.post("user/update", data)
          .then(({ data }) => {
            commit("setUserData", data.user);

            return data;
          });
    }
  },
  mutations: {
    setUser: (state, user) => {
      state.user.token = user.token;
      state.user.data = user.user;
      sessionStorage.setItem("TOKEN", user.token);
    },
    logout: (state) => {
      state.user.token = null;
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
    },
    setUserData: (state, user) => {
      state.user.data = user;
    }
  },
  modules: {}
});

export default store;
