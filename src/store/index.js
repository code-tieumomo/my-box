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
    },
    getUser({ commit }) {
      return axiosClient.get("/api/user")
          .then(({ data }) => {
            commit("setUserOnly", data);

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
    setUserOnly: (state, user) => {
      state.user.data = user;
    }
  },
  modules: {}
});

export default store;
