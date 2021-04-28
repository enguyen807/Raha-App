<template>
  <v-list>
    <v-list-item v-for="link in links" :to="link['href']" :key="link['title']">
      <v-list-item-icon
        ><v-icon>{{ link["icon"] }}</v-icon></v-list-item-icon
      >
      <v-list-item-content>{{ link["title"] }}</v-list-item-content>
    </v-list-item>
  </v-list>
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