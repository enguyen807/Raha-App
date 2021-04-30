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
  computed: {},
};
</script>
