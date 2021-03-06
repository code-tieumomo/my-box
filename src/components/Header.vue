<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <img class="block lg:hidden h-8 w-auto" src="../assets/box.png"
                 alt="Workflow" />
            <img class="hidden lg:block h-8 w-auto"
                 src="../assets/box.png" alt="Workflow" />
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="navbar flex space-x-4">
              <router-link v-for="item in navigation" :key="item.name" :to="{name: item.routerName}"
                           :class="['text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']"
                           :aria-current="item.current ? 'page' : undefined">
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button type="button"
                  class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3 relative z-50">
            <div>
              <MenuButton
                  class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full object-cover"
                     :src="user.data.avatar"
                     alt="" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <router-link :to="{name: 'profile'}"
                               :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                    Your Profile
                  </router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#"
                     :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a @click="logout" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign
                    out</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link v-for="item in navigation" :key="item.name" :to="{name: item.routerName}"
                     :class="['text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']"
                     :aria-current="item.current ? 'page' : undefined">{{ item.name }}
        </router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>

  <div v-if="isLoggingOut"
       class="overlay fixed w-full h-full top-0 left-0 bottom-0 right-0 z-10 cursor-pointer select-none flex justify-center items-center">
    <img class="h-20 w-20 opacity-100 fa-pulse fa-pulse" src="../assets/box.png" alt="Logo">
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/vue/outline";
import store from "../store";
import { mapState } from "vuex";

export default {
  name: "Header",
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon
  },
  data() {
    return {
      navigation: [],
      user: store.getters.getUser,
      isLoggingOut: false
    };
  },
  mounted() {
    const currentRouteName = this.$route.name;
    this.navigation = [
      { name: "Dashboard", routerName: "dashboard", current: true },
      { name: "Calendar", routerName: "calendar", current: false }
    ].map(function (item) {
      item.current = item.routerName === currentRouteName;

      return item;
    });
  },
  methods: {
    logout() {
      this.isLoggingOut = true;
      store
          .dispatch("logout")
          .then(() => {
            this.$router.push({
              name: "login"
            });
            this.isLoggingOut = false;
          })
          .catch(error => {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message
            });
            this.isLoggingOut = false;
          });
    }
  }
};
</script>

<style scoped>

</style>