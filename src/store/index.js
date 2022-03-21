import { createStore } from "vuex";
import axiosClient from "../../axios";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  plugins: [createPersistedState()],
  state: {
    user: {
      data: null,
      token: sessionStorage.getItem("TOKEN")
    },
    events: null,
    currentSession: {
      events: null,
      event: null
    },
    settings: null
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getEvents(state) {
      return state.events;
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
    },
    changePassword({ commit }, data) {
      return axiosClient.post("user/change-password", data)
          .then(({ data }) => {
            return {
              message: "Updated success"
            };
          });
    },
    getEvents({ commit }) {
      return axiosClient.get("events")
          .then(({ data }) => {
            commit("setEvents", data.events);

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
      state.user.data.avatar = user.avatar + "?" + new Date().getTime();
    },
    setEvents: (state, events) => {
      state.events = events;
      state.currentSession.events = events;
    }
  },
  modules: {}
});

export default store;
