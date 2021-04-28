<template>
  <v-navigation-drawer
    disable-resize-watcher
    app
    :value="value"
    @input="$emit('input', $event)"
    clipped
    :style="`margin-top: ${$vuetify.application.top}px`"
  >
    <slot name="drawer-items"></slot>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
    },
  },
};
</script>

<style>
</style>