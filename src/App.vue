<template>
  <BaseLayout>
    <router-view />
  </BaseLayout>
</template>

<script>
import BaseLayout from "./layouts/default";

export default {
  name: "App",
  components: {
    BaseLayout,
  },
  data: () => ({
    //
  }),
  mounted() {
    this.$store.dispatch("user/getUsers");
  },
  computed: {},
};
</script>
