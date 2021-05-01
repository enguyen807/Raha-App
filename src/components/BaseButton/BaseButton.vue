<template>
  <div class="baseButton__wrapper">
    <div v-if="links">
      <v-btn v-for="link in links" :to="link['href']" :key="link['title']" text>
        <span class="mr-2">{{ link["title"] }}</span>
        <v-icon>{{ link["icon"] }}</v-icon>
      </v-btn>
    </div>
    <div v-else>
      <v-btn
        block
        :small="btnSmall"
        elevation="2"
        :color="btnColor.join(' ')"
        :disabled="btnDisabled"
      >
        <span class="mr-2">{{ title }}</span>
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </div>
  </div>
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