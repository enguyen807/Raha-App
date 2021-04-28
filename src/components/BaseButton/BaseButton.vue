<template>
  <div>
    <v-btn v-for="link in links" :to="link['href']" :key="link['title']" text>
      <span class="mr-2">{{ link["title"] }}</span>
      <v-icon>{{ link["icon"] }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      required: true,
      default: [],
    },
  },
};
</script>

<style>
</style>