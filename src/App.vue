<script>
export default {
  mounted() {
    console.log(import.meta.env.VITE_SOME_KEY);
    // fetch(`${ import.meta.env.VITE_API_BASE_URL }`).then(res => {
    //   console.log(res);
    // });
  }
};
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
