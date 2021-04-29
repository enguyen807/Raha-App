<template>
  <v-tab-item :value="value">
    <v-card flat>
      <slot />
    </v-card>
  </v-tab-item>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
  },
};
</script>

<style>
</style>