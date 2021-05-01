<template>
  <v-col>
    <v-tabs fixed-tabs class="mb-6">
      <v-tabs-slider></v-tabs-slider>
      <v-tab
        class="primary--text"
        v-for="(tab, i) in tabsArray"
        :key="`tabs-${i}`"
        :value="`tabs-${i}`"
        @click="$emit('selected-tab', `tabs-${i}`)"
      >
        <v-icon class="primary--text">{{ tab.icon }}</v-icon>
        <span class="ml-2">{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

    <BaseTabItems :currentTab="currentTab">
      <slot />
    </BaseTabItems>
  </v-col>
</template>

<script>
import BaseTabItems from "./BaseTabItems/BaseTabItems";

export default {
  components: {
    BaseTabItems,
  },
  props: {
    tabsArray: {
      type: Array,
    },
    currentTab: {
      type: String,
      default: "tabs-0",
    },
  },
};
</script>

<style>
</style>