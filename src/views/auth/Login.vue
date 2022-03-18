<template>
  <div>
    <router-link :to="{name: 'home'}">
      <img class="mx-auto h-12 w-auto" src="../../assets/box.png"
           alt="Workflow" />
    </router-link>
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      Or
      <router-link :to="{name: 'register'}" class="font-medium text-indigo-600 hover:text-indigo-500">
        Register new account
      </router-link>
    </p>
  </div>
  <form class="mt-8 space-y-6" @submit.prevent="login">
    <input type="hidden" name="remember" value="true" />
    <div class="rounded-md shadow-sm -space-y-px">
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input id="email-address" name="email" type="email" autocomplete="email" required=""
               class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
               placeholder="Email address" v-model="user.email" />
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required=""
               class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
               placeholder="Password" v-model="user.password" />
      </div>
    </div>

    <div>
      <button type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
        Log in
      </button>
    </div>
  </form>
</template>

<script>
import { LockClosedIcon } from "@heroicons/vue/solid";
import store from "../../store";

export default {
  name: "Login",
  components: {
    LockClosedIcon
  },
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      store
          .dispatch("login", this.user)
          .then(() => {
            this.$router.push({
              name: "dashboard"
            });
          })
          .catch(error => {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message
            });
          });
    }
  }
};
</script>

<style scoped>

</style>