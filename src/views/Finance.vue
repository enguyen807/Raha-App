<template>
  <div>
    <v-col cols="12">
      <BaseTabs
        :tabs-array="tabs"
        :current-tab="currentTab"
        @selected-tab="handleTabSelection"
      >
        <v-form ref="paymentForm" v-model="formIsValid">
          <BaseTabItem value="tabs-0">
            <h2 v-if="!selectedUser1" class="mt-6">
              Please select a user from the table below
            </h2>
            <div v-else class="d-flex flex-column mt-5 justify-space-between">
              <v-text-field
                label="Username"
                disabled
                v-model="selectedUser1['name']"
              ></v-text-field>
              <v-text-field
                label="Description"
                v-model="description1"
                :rules="currentTab === 'tabs-0' ? rules : []"
              ></v-text-field>
              <v-text-field
                type="number"
                label="Balance"
                v-model.number="selectedUser1['balance']"
                ref="selectedUser1Balance"
                :rules="currentTab === 'tabs-0' ? rules : []"
                min="0"
                @keypress="onlyNumbers"
              ></v-text-field>

              <v-btn
                :disabled="!formIsValid"
                light
                color="accent"
                elevation="2"
                block
                @click="handleAddFunds"
                >Add Funds to Account</v-btn
              >
            </div>
          </BaseTabItem>
          <BaseTabItem value="tabs-1">
            <v-card-text>In Send Funds</v-card-text>
            <v-card-text>Name</v-card-text>
            <v-card-text>Description</v-card-text>
            <v-card-text>Amount</v-card-text>
          </BaseTabItem>
          <BaseTabItem value="tabs-2">
            <v-card-text>In Remove Funds</v-card-text>
            <v-card-text>Name</v-card-text>
            <v-card-text>Description</v-card-text>
            <v-card-text>Amount</v-card-text>
          </BaseTabItem>
        </v-form>
      </BaseTabs>
    </v-col>
    <v-col cols="12">
      <BaseDataTable
        :data-table-headers="getDataTableHeaders"
        :max-selected-items="currentTab !== 'tabs-0' ? 2 : 1"
        :items="users"
        :single-select="false"
        :current-tab="currentTab"
        @selected-items="handleUserSelection"
      />
    </v-col>
  </div>
</template>

<script>
import Request from "../api/index";
import { mapGetters, mapActions } from "vuex";

import BaseTabs from "../components/BaseTabs/BaseTabs";
import BaseTabItem from "../components/BaseTabs/BaseTabItems/BaseTabItem/BaseTabItem";

import BaseDataTable from "../components/BaseDataTable/BaseDataTable";

export default {
  name: "Finance",
  components: {
    BaseTabs,
    BaseTabItem,
    BaseDataTable,
  },
  data: () => ({
    req: new Request(),
    currentTab: "tabs-0",
    tabs: [
      {
        title: "Add Funds",
        icon: "",
      },
      {
        title: "Send Funds",
        icon: "",
      },
      {
        title: "Remove Funds",
        icon: "",
      },
    ],
    formIsValid: true,
    selectedUser1: null,
    description1: "",
    selectedUser2: null,
    description2: "",
    rules: [(value) => !!value || "Required."],
  }),
  mounted() {
    this.$store.dispatch("getUsers");
  },
  methods: {
    ...mapActions("finance", ["updatePayment"]),
    handleTabSelection(value) {
      this.currentTab = value;
    },
    handleUserSelection(value) {
      // console.log(value);
      this.$refs.paymentForm.validate();
      this.selectedUser1 = value[0];
      this.selectedUser2 = value.length > 1 ? value[1] : {};
    },
    async handleAddFunds() {
      const { selectedUser1 } = this;
      const { balance, id, name, number } = selectedUser1;

      const data = JSON.stringify({
        data: {
          amount: balance,
          type_key: "incoming",
          beneficiary_account_id: id,
          remitter_name: name,
          remitter_account_number: number,
        },
      });

      try {
        const response = await this.req.make("POST", "/api/v1/payments", data);
        if (response.status === 201) {
          this.updatePayment(response);
        }
      } catch (e) {
        this.updatePayment(e.response);
      }
    },
    onlyNumbers(e) {
      // console.log(e);
      // Get value from input field and convert value from Number to String
      const balance = this.$refs.selectedUser1Balance.value.toString();
      // console.log(balance);
      let keyCode = e.keyCode ? e.keyCode : e.which;
      // console.log(keyCode);
      // Prevent all non number characters
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        e.preventDefault();
      }
      // Limits decimal field to two decimal points
      if (balance.indexOf(".") > -1 && balance.split(".")[1].length > 1) {
        e.preventDefault();
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
