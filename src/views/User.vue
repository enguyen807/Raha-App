<template>
  <v-col>
    <v-row>
      <v-col cols="4">
        <v-card class="pa-2" outlined tile>
          <h2>Create Account</h2>
          <v-spacer></v-spacer>
          <v-flex>
            <v-text-field
              v-model="username"
              label="Username"
              :rules="rules"
              :success-messages="
                isUsernameAvailable ? checkIfUsernameIsAvailable() : null
              "
              :error-messages="
                isUsernameAvailable ? null : checkIfUsernameIsAvailable()
              "
            ></v-text-field>
            <v-btn
              class="mt-2"
              light
              color="accent"
              elevation="2"
              @click="toggle"
              >Check Username</v-btn
            >
          </v-flex>
        </v-card>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="8">
        <v-card class="pa-2" outlined tile>
          .col-12 .col-sm-6 .col-md-8
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "User",
  data: () => ({
    username: null,
    isUsernameAvailable: false,
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 5) || "Min 5 characters",
    ],
  }),
  methods: {
    toggle() {
      this.isUsernameAvailable = !this.isUsernameAvailable;
    },
    checkIfUsernameIsAvailable() {
      if (this.isUsernameAvailable) {
        return "Username is available.";
      }

      return "Username isn't available.";
    },
  },
};
</script>
