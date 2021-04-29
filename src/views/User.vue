<template>
  <v-col>
    <v-layout row>
      <v-col cols="12" md="4">
        <v-card class="pa-5" outlined tile>
          <v-form ref="createAccountForm" v-model="formIsValid" lazy-validation>
            <v-card-title class="pa-0"><h2>Create Account</h2></v-card-title>
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
                  :disabled="!formIsValid || !username"
                  @click="saveUser"
                  >Check Username</v-btn
                >
              </v-col>
            </v-row>
            <v-btn
              :disabled="!formIsValid || !isUsernameAvailable ? true : false"
              block
              small
              light
              color="accent"
              elevation="2"
              class="mt-lg-0 mt-md-3 mt-3"
              @click="createAccount"
              >Create Account</v-btn
            >
          </v-form>
        </v-card>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" md="8">
        <!-- Todo: Add ability to change user's name or delete users -->
        <v-card class="pa-2" outlined tile>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="users"
            item-key="id"
            single-select
            show-select
            :search="search"
          >
          </v-data-table>
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
    formIsValid: true,
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 5) || "Min 5 characters",
    ],
    headers: [
      {
        text: "User",
        value: "name",
      },
      {
        text: "Balance",
        value: "balance",
      },
    ],
    selected: [],
    search: "",
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
      this.isUsernameAvailable = false;
      this.success = false;
      this.error = false;
    },
    saveUser() {},
    async createAccount() {
      const data = JSON.stringify({ data: { name: this.username } });

      const response = await this.req.make("POST", "/api/v1/accounts", data);

      if (response.status === 201) {
        this.handleInputChanges();
        this.$refs.createAccountForm.reset();
        this.$refs.createAccountForm.resetValidation();
      }
    },
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    successMsg() {
      return this.success ? ["Username is available."] : [];
    },
    errorMsg() {
      return this.error ? ["Username is taken."] : [];
    },
  },
};
</script>
