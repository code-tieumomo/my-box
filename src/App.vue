<script>
import { createToast } from "mosha-vue-toastify";

export default {
  created() {
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
};
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
