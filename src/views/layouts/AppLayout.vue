<template>
  <Header />
  <router-view></router-view>
</template>

<script>
import Header from "../../components/Header.vue";

export default {
  name: "AppLayout",
  components: {
    Header
  }
};
</script>

<style scoped>
</style>