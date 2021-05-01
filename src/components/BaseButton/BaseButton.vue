<template>
  <span class="baseButton__wrapper">
    <span v-if="links">
      <v-btn v-for="link in links" :to="link['href']" :key="link['title']" text>
        <v-icon>{{ link["icon"] }}</v-icon>
        <span class="ml-2">{{ link["title"] }}</span>
      </v-btn>
    </span>
    <span v-else>
      <v-btn
        :block="btnBlock"
        :small="btnSmall"
        elevation="2"
        :color="btnColor.join(' ')"
        :disabled="btnDisabled"
        :to="href"
      >
        <v-icon v-if="icon" right>{{ icon }}</v-icon>
        <span class="ml-2">{{ title }}</span>
      </v-btn>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      required: false,
    },
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
    href: {
      type: String,
    },
    btnBlock: {
      type: Boolean,
      default: false,
    },
    btnSmall: {
      type: Boolean,
    },
    btnColor: {
      type: Array,
    },
    btnClass: {
      type: Array,
    },
    btnDisabled: {
      type: Boolean,
    },
  },
};
</script>

<style>
</style>