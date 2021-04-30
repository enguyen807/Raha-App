<template>
  <v-alert
    v-if="alert.message"
    :type="`${alert.type}`"
    dismissible
    transition="scale-transition"
  >
    {{ alert.message }}
  </v-alert>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    message: "",
  }),
  watch: {
    $route() {
      this.clearAlert();
    },
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear",
    }),
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
    }),
  },
};
</script>

<style>
.v-alert {
  position: fixed !important;
  z-index: 1;
  width: 100%;
}
</style>