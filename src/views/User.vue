<template>
  <v-col>
    <v-layout row>
      <v-col cols="12" md="4">
        <v-card class="pa-5" outlined tile>
          <h2>Create Account</h2>
          <v-spacer></v-spacer>
          <v-row align-md="baseline" no-gutters>
            <v-col cols="12" lg="7">
              <v-text-field
                v-model="username"
                label="Username"
                :rules="rules"
                :success="success"
                :success-messages="successMsg"
                :error="error"
                :error-messages="errorMsg"
                @input="handleInputChanges"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="3">
              <v-btn
                block
                small
                light
                color="info"
                elevation="2"
                @click="checkIfUsernameIsAvailable"
                >Check Username</v-btn
              >
            </v-col>
          </v-row>
          <v-btn
            :disabled="username && isUsernameAvailable ? false : true"
            block
            small
            light
            color="accent"
            elevation="2"
            class="mt-lg-0 mt-md-3 mt-3"
            >Create Account</v-btn
          >
        </v-card>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" md="8">
        <v-card class="pa-2" outlined tile>
          .col-12 .col-sm-6 .col-md-8
        </v-card>
      </v-col>
    </v-layout>
  </v-col>
</template>

<script>
import Request from "../api/index";

export default {
  name: "User",
  data: () => ({
    req: new Request(),
    username: null,
    isUsernameAvailable: false,
    success: false,
    error: false,
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 5) || "Min 5 characters",
    ],
  }),
  methods: {
    async checkIfUsernameIsAvailable() {
      const data = JSON.stringify({ data: { name: this.username } });

      const response = await this.req.make(
        "POST",
        "/api/v1/accounts/search",
        data
      );

      if (response.data.data.length === 0) {
        this.isUsernameAvailable = true;
        this.success = true;
        this.error = false;
      } else {
        this.isUsernameAvailable = false;
        this.success = false;
        this.error = true;
      }
    },
    handleInputChanges() {
      this.success = false;
      this.error = false;
    },
  },
  computed: {
    successMsg() {
      return this.success ? ["Username is available."] : [];
    },
    errorMsg() {
      return this.error ? ["Username is taken."] : [];
    },
  },
};
</script>
