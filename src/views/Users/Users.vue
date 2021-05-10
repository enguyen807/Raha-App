<template>
  <v-col>
    <v-layout row>
      <v-col cols="12" md="4">
        <v-card class="pa-5" outlined tile>
          <v-form ref="createAccountForm" v-model="formIsValid">
            <v-card-title class="pa-0"><h2>Create Account</h2></v-card-title>
            <v-row align-md="baseline" no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="username"
                  label="Username"
                  :rules="rules"
                ></v-text-field>
              </v-col>
            </v-row>
            <BaseButton
              title="Create Account"
              btn-small
              btn-block
              :btn-color="['accent', 'black--text']"
              :btn-class="['mt-lg-0', 'mt-md-3', 'mt-3']"
              :btn-disabled="!formIsValid"
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
    formIsValid: true,
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 5) || "Min 5 characters",
    ],
  }),
  mounted() {
    this.$store.dispatch("user/getUsers");
  },
  methods: {
    ...mapActions("user", ["createUser"]),
    async createAccount() {
      if (!this.formIsValid) return;

      const data = JSON.stringify({ data: { name: this.username } });

      const response = this.createUser(data);
      if (response) {
        this.$refs.createAccountForm.reset();
      }
    },
  },
  computed: {
    ...mapGetters("finance", ["getUsers"]),
    users() {
      return this.getUsers;
    },
    getDataTableHeaders() {
      return this.$store.getters.getDataTableHeaders;
    },
  },
};
</script>
