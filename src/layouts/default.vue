<template>
  <v-app
    id="main"
    :style="{ background: this.$vuetify.theme.themes[theme].background }"
  >
    <BaseNavigationDrawer v-model="drawer">
      <template #drawer-items>
        <BaseList :links="links" />
      </template>
    </BaseNavigationDrawer>

    <BaseToolbar
      @toggle-drawer="handleDrawer"
      :is-mobile="isMobile"
      title="Raha App"
    >
      <template #toolbar-items>
        <BaseButton :links="links" v-show="!isMobile" />
      </template>
    </BaseToolbar>

    <v-main>
      <BaseAlert />
      <v-container>
        <v-layout row wrap>
          <v-col class="fill-height">
            <v-sheet min-height="70vh" rounded="lg" elevation="12">
              <slot></slot>
            </v-sheet>
          </v-col>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BaseNavigationDrawer from "../components/BaseNavigationDrawer/BaseNavigationDrawer";
import BaseToolbar from "../components/BaseToolbar/BaseToolbar";
import BaseList from "../components/BaseList/BaseList";
import BaseButton from "../components/BaseButton/BaseButton";
import BaseAlert from "../components/BaseAlert/BaseAlert";

export default {
  data: () => ({
    drawer: false,
    links: [
      {
        title: "User Management",
        icon: "mdi-account",
        href: "/",
      },
      {
        title: "Manage Finance",
        icon: "mdi-finance",
        href: "/finance",
      },
    ],
  }),
  components: {
    BaseNavigationDrawer,
    BaseToolbar,
    BaseList,
    BaseButton,
    BaseAlert,
  },
  methods: {
    handleDrawer() {
      this.drawer = !this.drawer;
    },
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>

<style>
</style>