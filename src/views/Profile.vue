<template>
  <div>
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
          <p class="mt-1 text-sm text-gray-600">This information will be displayed publicly so be careful what you share.</p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form @submit.prevent="updateUser">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3">
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <span
                        class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">Name</span>
                    <input type="text" name="name" id="name"
                           class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                           placeholder="John Doe" v-model="user.data.name" />
                  </div>
                </div>
              </div>

              <div>
                <label for="about" class="block text-sm font-medium text-gray-700"> About </label>
                <div class="mt-1">
                  <textarea id="about" name="about" rows="3"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="you@example.com" v-model="user.data.about" />
                </div>
                <p class="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700"> Avatar </label>
                <div class="mt-1 flex items-center">
                  <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <img :src="this.previewAvatar != null ? this.previewAvatar : '404-in-48.png'"
                         class="h-full w-full text-gray-300 object-cover" />
                  </span>
                  <input type="file"
                         ref="avatar"
                         accept="image/*"
                         @change="handleAvatarChange"
                         class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
                </div>
                <p class="mt-2 text-sm text-gray-500">Refresh app to see new avatar!</p>
              </div>

              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3">
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <span
                        class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">Phone number</span>
                    <input type="text" name="phone-number" id="phone-number"
                           class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                           placeholder="012345789" v-model="user.data.phone_number" />
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3">
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <span
                        class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">Date of birth</span>
                    <input type="date" name="dob" id="dob"
                           class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                           placeholder="John Doe" v-model="user.data.dob" />
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3">
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <span
                        class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">URL</span>
                    <input type="text" name="url" id="url"
                           class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                           placeholder="https://mybox.netlify.com" v-model="user.data.url" />
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button type="submit"
                      class="flex items-center justify-center ml-auto mr-0 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      :disabled="isSaving"
                      v-html="isSaving ? 'Saving <i class=\'ml-2 align-middle fa-solid fa-spinner  fa-pulse\'></i>' : 'Save'">
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "Profile",
  data() {
    return {
      user: store.getters.getUser,
      previewAvatar: store.getters.getUser.data.avatar,
      changedAvatar: null,
      isSaving: false
    };
  },
  methods: {
    handleAvatarChange() {
      this.changedAvatar = this.$refs.avatar.files[0];
      if (this.changedAvatar.size < 1 || this.changedAvatar.size > 10000000) {
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: `File size is invalid. (${ this.changedAvatar.size })`
        });

        return;
      }
      this.previewAvatar = URL.createObjectURL(this.changedAvatar);
    },
    updateUser() {
      this.isSaving = true;

      let formData = new FormData();
      formData.append("name", this.user.data.name !== undefined ? this.user.data.name : null);
      formData.append("about", this.user.data.about);
      formData.append("phone_number", this.user.data.phone_number);
      formData.append("dob", this.user.data.dob);
      formData.append("url", this.user.data.url);
      formData.append("avatar", this.changedAvatar);

      store
          .dispatch("updateProfile", formData)
          .then((res) => {
            createToast({
              title: "Success",
              description: "Updated profile"
            }, {
              type: "success",
              timeout: 1500,
              transition: "zoom"
            });
          })
          .catch((err) => {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: err.response.data.message
            });
          })
          .finally(() => {
            this.isSaving = false;
          });
    }
  }
};
</script>

<style scoped>

</style>