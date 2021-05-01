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
                <BaseButton
                  title="Check Username"
                  btn-small
                  :btn-color="['info']"
                  :btn-disabled="!formIsValid || !username"
                  @click.native="checkIfUsernameIsAvailable"
                />
              </v-col>
            </v-row>
            <BaseButton
              title="Create Account"
              btn-small
              :btn-color="['accent', 'black--text']"
              :btn-class="['mt-lg-0', 'mt-md-3', 'mt-3']"
              :btn-disabled="
                !formIsValid || !isUsernameAvailable ? true : false
              "
              @click.native="createAccount"
            />
          </v-form>
        </v-card>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" md="8">
        <!-- Todo: Add ability to change user's name or delete users -->
        <BaseDataTable
          :data-table-headers="getDataTableHeaders"
          :items="users"
        />
      </v-col>
    </v-layout>
  </v-col>
</template>

<script>
import Request from "../api/index";
import { mapGetters } from "vuex";

import BaseDataTable from "../components/BaseDataTable/BaseDataTable";
import BaseButton from "../components/BaseButton/BaseButton";

export default {
  name: "User",
  components: {
    BaseDataTable,
    BaseButton,
  },
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
  }),
  mounted() {
    this.$store.dispatch("getUsers");
  },
  methods: {
    async checkIfUsernameIsAvailable() {
      // Variable generated from Postman
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
    ...mapGetters("user", ["getUsers"]),
    users() {
      return this.getUsers;
    },
    successMsg() {
      return this.success ? ["Username is available."] : [];
    },
    errorMsg() {
      return this.error ? ["Username is taken."] : [];
    },
    getDataTableHeaders() {
      return this.$store.getters.getDataTableHeaders;
    },
  },
};
</script>
