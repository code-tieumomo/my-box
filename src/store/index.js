import { createStore } from "vuex";
import axiosClient from "../../axios";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN")
    }
  },
  getters: {},
  actions: {
    register({ commit }, user) {
      return axiosClient.post("/api/register", user)
          .then(({ data }) => {
            commit("setUser", data);

            return data;
          });
    },
    login({ commit }, user) {
      return axiosClient.post("/api/login", user)
          .then(({ data }) => {
            commit("setUser", data);

            return data;
          });
    },
    logout({ commit }) {
      return axiosClient.post("/api/logout")
          .then(({ data }) => {
            commit("logout");

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
    }
  },
  modules: {}
});

export default store;
