<template>
  <v-tabs-items :value="currentTab">
    <slot />
  </v-tabs-items>
</template>

<script>
export default {
  props: {
    currentTab: {
      type: String,
    },
  },
};
</script>

<style>
</style>