<script>
import { createToast } from "mosha-vue-toastify";
import store from "./store";

export default {
  methods: {
    checkAPI() {
      fetch(`${ import.meta.env.VITE_API_ENDPOINT }`).then(res => res.json()).then(res => {
        createToast({
          title: "Success",
          description: `Connected to API endpoint<br>Name: ${ res.name }<br>Logo: ${ res.logo }`
        }, {
          type: "success",
          timeout: 3000,
          transition: "zoom"
        });
      });
    }
  },
  created() {
    // this.checkAPI();
  }
};
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
