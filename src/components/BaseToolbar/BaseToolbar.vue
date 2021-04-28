<template>
  <v-app-bar app color="primary" dark clipped-left>
    <v-app-bar-nav-icon
      v-show="isMobile"
      @click="$emit('toggle-drawer')"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>{{ title }}</v-toolbar-title>

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
  },
};
</script>

<style>
</style>