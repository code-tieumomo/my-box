<script>
import { createToast } from "mosha-vue-toastify";

export default {
  mounted() {
    fetch(`${ import.meta.env.VITE_API_ENDPOINT }`).then(res => res.json()).then(res => {
      createToast({
        title: "Success",
        description: `Name: ${ res.name }<br>Logo: ${ res.logo }`
      }, {
        type: "success",
        timeout: 5000,
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
