<template>
  <Header />
  <div class="md:p-10 p-5">
    <router-view></router-view>
  </div>
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