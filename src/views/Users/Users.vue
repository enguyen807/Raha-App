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
                  :success="createUserSuccess"
                  :success-messages="createUserSuccessMsg"
                  :error="createUserError"
                  :error-messages="createUserErrorMsg"
                  @input="handleInputChanges"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="3">
                <BaseButton
                  title="Check Username"
                  btn-small
                  btn-block
                  :btn-color="['info']"
                  :btn-disabled="!formIsValid || !username"
                  @click.native="checkIfUsernameIsAvailable"
                />
              </v-col>
            </v-row>
            <BaseButton
              title="Create Account"
              btn-small
              btn-block
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
import Request from "../../api/index";
import { mapActions, mapGetters } from "vuex";

import BaseDataTable from "../../components/BaseDataTable/BaseDataTable";
import BaseButton from "../../components/BaseButton/BaseButton";

export default {
  name: "Users",
  components: {
    BaseDataTable,
    BaseButton,
  },
  data: () => ({
    req: new Request(),
    username: null,
    isUsernameAvailable: false,
    createUserSuccess: false,
    createUserError: false,
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
    ...mapActions("alert", ["error", "success"]),
    async checkIfUsernameIsAvailable() {
      if (!this.formIsValid) return;

      const data = JSON.stringify({ data: { name: this.username } });

      try {
        const response = await this.req.make(
          "POST",
          "/api/v1/accounts/search",
          data
        );

        if (response.data.data.length === 0) {
          this.isUsernameAvailable = true;
          this.createUserSuccess = true;
          this.createUserError = false;
        } else {
          this.isUsernameAvailable = false;
          this.createUserSuccess = false;
          this.createUserError = true;
        }
      } catch (error) {
        this.error(error.response.statusText);
      }
    },
    handleInputChanges() {
      this.isUsernameAvailable = false;
      this.createUserSuccess = false;
      this.createUserError = false;
    },
    async createAccount() {
      if (!this.formIsValid) return;

      const data = JSON.stringify({ data: { name: this.username } });

      try {
        const response = await this.req.make("POST", "/api/v1/accounts", data);

        if (response.status === 201) {
          this.success("User created successfully!");
          this.handleInputChanges();
          this.$refs.createAccountForm.reset();
          this.$refs.createAccountForm.resetValidation();
        }
      } catch (error) {
        this.error(error.response.statusText);
      }
    },
  },
  computed: {
    ...mapGetters("user", ["getUsers"]),
    users() {
      return this.getUsers;
    },
    createUserSuccessMsg() {
      return this.createUserSuccess ? ["Username is available."] : [];
    },
    createUserErrorMsg() {
      return this.createUserError ? ["Username is taken."] : [];
    },
    getDataTableHeaders() {
      return this.$store.getters.getDataTableHeaders;
    },
  },
};
</script>
