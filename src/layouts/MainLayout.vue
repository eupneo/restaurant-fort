<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar :class="loggedIn ? 'justify-between' : 'justify-end'">
        <q-btn
          v-if="loggedIn"
          :label="!loggedIn ? '' : this.$store.getters.details.username"
          color="secondary"
        />
        <q-btn
          :label="!loggedIn ? 'Login' : 'Logout'"
          color="primary"
          @click="!loggedIn ? login() : logout()"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import LoginModal from "src/components/LoginModal.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { computed } from "vue";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const route = useRoute();
    const store = useStore();
    const $q = useQuasar();

    const login = () => {
      $q.dialog({
        component: LoginModal,

        // props forwarded to your custom component
      }).onOk((data) => {
        // console.log('>>>> OK, received', data)
      });
    };

    const logout = () => {
      store.commit("updateToken", null);
      store.commit("updateDetails", null);
    };

    const loggedIn = computed(() => !!store.getters.token);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      login,
      logout,
      loggedIn,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
