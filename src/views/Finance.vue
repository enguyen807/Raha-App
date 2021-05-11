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
            <h2 v-if="selectedUserData.length === 0" class="mt-6">
              Please select a user from the table below
            </h2>
            <div v-else class="d-flex flex-column mt-5 justify-space-between">
              <v-text-field
                label="Account Number"
                disabled
                v-model="selectedUserData[0]['id']"
              ></v-text-field>
              <v-text-field
                label="Username"
                disabled
                v-model="selectedUserData[0]['name']"
              ></v-text-field>
              <v-text-field
                label="Description (optional)"
                v-model="description"
              ></v-text-field>
              <v-text-field
                type="text"
                label="Amount to Add"
                v-model.lazy="addAmount"
                v-money="money"
                ref="selectedUser1Amount"
                :rules="currentTab === 'tabs-0' ? rules : []"
              ></v-text-field>

              <BaseButton
                title="Add Funds to Account"
                btn-block
                :btn-color="['accent', 'black--text']"
                :btn-disabled="!formIsValid"
                @click.native="handleAddFunds"
              />
            </div>
          </BaseTabItem>
          <BaseTabItem value="tabs-1">
            <h2 v-if="selectedUserData.length < 2" class="mt-6">
              Please select two users from the table below
            </h2>
            <div v-else class="d-flex flex-column mt-5 justify-space-between">
              <div>
                <h3>Transfer Funds from {{ selectedUserData[0]["name"] }}</h3>
                <v-text-field
                  label="Account Number"
                  disabled
                  v-model="selectedUserData[0]['id']"
                ></v-text-field>
                <v-text-field
                  label="Username"
                  disabled
                  v-model="selectedUserData[0]['name']"
                ></v-text-field>
                <v-text-field
                  type="text"
                  disabled
                  label="Current Balance"
                  v-model="selectedUserData[0]['balance']"
                  min="0"
                ></v-text-field>
                <v-text-field
                  label="Description (optional)"
                  v-model="description"
                ></v-text-field>
                <v-text-field
                  type="text"
                  label="Amount to Send"
                  v-model.lazy="transferAmount"
                  v-money="money"
                  ref="selectedUser1Amount"
                  :rules="currentTab === 'tabs-1' ? rules : []"
                ></v-text-field>
              </div>

              <div>
                <h3>
                  {{ selectedUserData[1]["name"] }} receives the following:
                </h3>
                <v-text-field
                  label="Account Number"
                  disabled
                  v-model="selectedUserData[1]['id']"
                ></v-text-field>
                <v-text-field
                  label="Username"
                  disabled
                  v-model="selectedUserData[1]['name']"
                ></v-text-field>
                <v-text-field
                  type="text"
                  disabled
                  label="Amount to recieve"
                  v-model="transferAmount"
                ></v-text-field>
              </div>

              <BaseButton
                title="Send Funds"
                btn-block
                :btn-color="['accent', 'black--text']"
                :btn-disabled="!formIsValid"
                @click.native="handleTransferFunds"
              />
            </div>
          </BaseTabItem>
          <BaseTabItem value="tabs-2">
            <h2 v-if="selectedUserData.length === 0" class="mt-6">
              Please select a user from the table below
            </h2>
            <div v-else class="d-flex flex-column mt-5 justify-space-between">
              <v-text-field
                label="Account Number"
                disabled
                v-model="selectedUserData[0]['id']"
              ></v-text-field>
              <v-text-field
                label="Username"
                disabled
                v-model="selectedUserData[0]['name']"
              ></v-text-field>
              <v-text-field
                type="number"
                disabled
                label="Current Balance"
                v-model.number="selectedUserData[0]['balance']"
                min="0"
              ></v-text-field>
              <v-text-field
                label="Description (optional)"
                v-model="description"
              ></v-text-field>

              <v-text-field
                type="text"
                label="Amount to Remove from Account"
                v-model.lazy="deductAmount"
                v-money="money"
                ref="selectedUser1Amount"
                :rules="currentTab === 'tabs-2' ? rules : []"
              ></v-text-field>

              <BaseButton
                title="Remove Funds from Account"
                btn-block
                :btn-color="['accent', 'black--text']"
                :btn-disabled="!formIsValid"
                @click.native="handleRemoveFunds"
              />
            </div>
          </BaseTabItem>
        </v-form>
      </BaseTabs>
    </v-col>
    <v-col cols="12">
      <!-- 
        if current tab equals 'send funds' tab set max selectable checkboxes to 2
        otherwise set max selectable checkboxes to 1
       -->
      <BaseDataTable
        :data-table-headers="getDataTableHeaders"
        :max-selected-items="currentTab !== 'tabs-1' ? 1 : 2"
        :items="users"
        :single-select="false"
        @input="handleUserSelection"
        :show-select="true"
        :key="componentKey"
      />
    </v-col>
  </div>
</template>

<script>
import Request from "../api/index";
import { mapState, mapActions } from "vuex";

import BaseTabs from "../components/BaseTabs/BaseTabs";
import BaseTabItem from "../components/BaseTabs/BaseTabItems/BaseTabItem/BaseTabItem";
import BaseButton from "../components/BaseButton/BaseButton";
import BaseDataTable from "../components/BaseDataTable/BaseDataTable";

import { VMoney } from "v-money";

export default {
  name: "Finance",
  components: {
    BaseTabs,
    BaseTabItem,
    BaseDataTable,
    BaseButton,
  },
  data: () => ({
    req: new Request(),
    currentTab: "tabs-0",
    tabs: [
      {
        title: "Add Funds",
        icon: "mdi-plus",
      },
      {
        title: "Send Funds",
        icon: "mdi-swap-horizontal",
      },
      {
        title: "Remove Funds",
        icon: "mdi-minus",
      },
    ],
    money: {
      prefix: "$ ",
      precision: 2,
      masked: false /* doesn't work with directive */,
    },
    formIsValid: true,
    selectedUserData: [],
    addAmount: "",
    transferAmount: "",
    deductAmount: "",
    description: "",
    selectedUser2Data: null,
    componentKey: 0,
    description2: "",
    rules: [(value) => !!value || "Required."],
  }),
  mounted() {},
  directives: { money: VMoney },
  methods: {
    ...mapActions("finance", [
      "addPayment",
      "transferPayment",
      "deductPayment",
    ]),
    getIndex(id) {
      const remitterIndex = this.users.findIndex((u) => {
        return u.id === id;
      });
      return remitterIndex;
    },
    resetForm() {
      // Rerenders data table by changing key of component
      this.componentKey += 1;
      // Reset amount form field
      this.description = "";
      this.addAmount = "";
      this.transferAmount = "";
      this.deductAmount = "";
      // Sets both array to empty on tab change
      this.selectedUserData = [];
    },
    handleTabSelection(value) {
      this.currentTab = value;
      this.resetForm();
    },
    handleUserSelection(value) {
      this.selectedUserData = value;
      this.$refs.paymentForm.validate();
      return value;
    },
    convertToNumber(string) {
      let number = Number(string.replace(/[^0-9.-]+/g, ""));
      return number;
    },
    async handleAddFunds() {
      if (!this.formIsValid) return;

      const { selectedUserData, addAmount, description } = this;
      const { id, name, number } = selectedUserData[0];

      const convertedAmount = this.convertToNumber(addAmount);

      const data = JSON.stringify({
        data: {
          amount: convertedAmount,
          type_key: "incoming",
          beneficiary_account_id: id,
          remitter_name: name,
          remitter_account_number: number,
          description: description,
        },
      });

      const response = await this.addPayment(data);
      if (response) {
        this.resetForm();
      }
    },
    async handleTransferFunds() {
      if (!this.formIsValid) return;

      const { selectedUserData, transferAmount, description } = this;
      const { id: user1Id } = selectedUserData[0];
      const { id: user2Id } = selectedUserData[1];

      const convertedAmount = this.convertToNumber(transferAmount);

      console.log(convertedAmount);

      const data = JSON.stringify({
        data: {
          amount: convertedAmount,
          description: description,
          type_key: "internal",
          remitter_account_id: user1Id,
          beneficiary_account_id: user2Id,
        },
      });

      const response = await this.transferPayment(data);
      if (response) {
        this.resetForm();
      }
    },
    async handleRemoveFunds() {
      if (!this.formIsValid) return;

      const { selectedUserData, deductAmount, description } = this;
      const { id, name, number } = selectedUserData[0];

      const convertedAmount = this.convertToNumber(deductAmount);

      const data = JSON.stringify({
        data: {
          amount: convertedAmount,
          type_key: "outgoing",
          remitter_account_id: id,
          beneficiary_name: name,
          beneficiary_account_number: number,
          description: description,
        },
      });

      const response = await this.deductPayment(data);
      if (response) {
        this.resetForm();
      }
    },
    onlyNumbers(e) {
      // console.log(e);
      // Get value from input field and convert value from Number to String
      const amount = this.$refs.selectedUser1Amount.value.toString();
      // console.log(balance);
      let keyCode = e.keyCode ? e.keyCode : e.which;
      // console.log(keyCode);
      // Prevent all non number characters
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        e.preventDefault();
      }
      // Limits decimal field to two decimal points
      if (amount.indexOf(".") > -1 && amount.split(".")[1].length > 1) {
        e.preventDefault();
      }
    },
  },
  computed: {
    ...mapState("user", ["users"]),
    getDataTableHeaders() {
      return this.$store.getters.getDataTableHeaders;
    },
    test() {
      return this.transferAmount;
    },
    balanceFieldRules() {
      const rules = [(v) => !!v || "Required."];
      if (this.selectedUserData.length === 0) return;
      // balance doesn't exist
      const rule = (v) =>
        (v || "") <= this.selectedUserData[0]["balance"] ||
        "You do not have enough funds to do this action!";
      rules.push(rule);
      return rules;
    },
  },
};
</script>
