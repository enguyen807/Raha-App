<template>
  <v-app-bar app color="primary" dark clipped-left>
    <v-app-bar-nav-icon
      v-show="isMobile"
      @click="$emit('toggle-drawer')"
    ></v-app-bar-nav-icon>

    <v-toolbar-title
      ><a color="white--text" href="/">{{ title }}</a></v-toolbar-title
    >

    <v-spacer></v-spacer>

    <slot name="toolbar-items"></slot>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    isMobile: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
    },
    href: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
.v-toolbar__title {
  a {
    color: white !important;
    text-decoration: none;
  }
}
</style>