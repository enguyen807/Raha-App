<template>
  <v-app>
    <v-navigation-drawer
      disable-resize-watcher
      v-model="drawer"
      app
      clipped
      :style="`margin-top: ${$vuetify.application.top}px`"
    >
      <v-list>
        <v-list-item to="/">
          <v-list-item-icon><v-icon> mdi-account</v-icon></v-list-item-icon>
          <v-list-item-content>User Management</v-list-item-content>
        </v-list-item>
        <v-list-item to="/about">
          <v-list-item-icon><v-icon>mdi-finance</v-icon></v-list-item-icon>
          <v-list-item-content>Manage Finance</v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- <v-btn to="/" text>
        <span class="mr-2">User Management</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn to="/about" text>
        <span class="mr-2">Manage Finance</span>
        <v-icon>mdi-finance</v-icon>
      </v-btn> -->
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark clipped-left>
      <v-app-bar-nav-icon
        v-show="isMobile"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Raha App</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn to="/" text v-show="!isMobile">
        <span class="mr-2">User Management</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn to="/about" text v-show="!isMobile">
        <span class="mr-2">Manage Finance</span>
        <v-icon>mdi-finance</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({ drawer: false }),
  methods: {},
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
  },
};
</script>

<style>
</style>