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
            <h2 v-if="!selectedUser1Data" class="mt-6">
              Please select a user from the table below
            </h2>
            <div v-else class="d-flex flex-column mt-5 justify-space-between">
              <v-text-field
                label="Username"
                disabled
                v-model="selectedUser1Data['name']"
              ></v-text-field>
              <v-text-field
                label="Description (optional)"
                v-model="selectedUser1FormData['description']"
              ></v-text-field>
              <v-text-field
                type="number"
                label="Amount to Add"
                v-model.number="selectedUser1FormData['amount']"
                ref="selectedUser1Amount"
                :rules="currentTab === 'tabs-0' ? rules : []"
                min="0"
                @keypress="onlyNumbers"
              ></v-text-field>

              <BaseButton
                title="Add Funds to Account"
                :btn-color="['accent', 'black--text']"
                :btn-disabled="!formIsValid"
                @click.native="handleAddFunds"
              />
            </div>
          </BaseTabItem>
          <BaseTabItem value="tabs-1">
            <h2 v-if="!selectedUser2Data" class="mt-6">
              Please select two users from the table below
            </h2>
            <div v-else class="d-flex flex-column mt-5 justify-space-between">
              <div>
                <h3>Transfer Funds from {{ selectedUser1Data["name"] }}</h3>
                <v-text-field
                  label="Username"
                  disabled
                  v-model="selectedUser1Data['name']"
                ></v-text-field>
                <v-text-field
                  label="Description (optional)"
                  v-model="selectedUser1FormData['description']"
                ></v-text-field>
                <v-text-field
                  type="number"
                  disabled
                  label="Current Balance"
                  v-model.number="selectedUser1Data['balance']"
                  min="0"
                ></v-text-field>
                <v-text-field
                  type="number"
                  label="Amount to send"
                  v-model.number="selectedUser1FormData['amount']"
                  ref="selectedUser1Amount"
                  :rules="
                    currentTab === 'tabs-1' && selectedUser1FormData
                      ? balanceFieldRules
                      : []
                  "
                  min="0"
                  :max="selectedUser1Data['balance']"
                  @keypress="onlyNumbers"
                ></v-text-field>
              </div>

              <div>
                <h3>{{ selectedUser2Data["name"] }} receives the following:</h3>
                <v-text-field
                  label="Username"
                  disabled
                  v-model="selectedUser2Data['name']"
                ></v-text-field>
                <v-text-field
                  type="number"
                  disabled
                  label="Amount to recieve"
                  v-model.number="selectedUser1FormData['amount']"
                  min="0"
                ></v-text-field>
              </div>

              <BaseButton
                title="Send Funds"
                :btn-color="['accent', 'black--text']"
                :btn-disabled="!formIsValid"
                @click.native="handleSendFunds"
              />
            </div>
          </BaseTabItem>
          <BaseTabItem value="tabs-2">
            <h2 v-if="!selectedUser1Data" class="mt-6">
              Please select a user from the table below
            </h2>
            <div v-else class="d-flex flex-column mt-5 justify-space-between">
              <v-text-field
                label="Username"
                disabled
                v-model="selectedUser1Data['name']"
              ></v-text-field>
              <v-text-field
                label="Description (optional)"
                v-model="selectedUser1FormData['description']"
              ></v-text-field>
              <v-text-field
                type="number"
                disabled
                label="Current Balance"
                v-model.number="selectedUser1Data['balance']"
                min="0"
              ></v-text-field>
              <v-text-field
                type="number"
                label="Amount to Remove from Account"
                v-model.number="selectedUser1FormData['amount']"
                ref="selectedUser1Amount"
                :rules="
                  currentTab === 'tabs-2' && selectedUser1FormData
                    ? balanceFieldRules
                    : []
                "
                min="0"
                :max="selectedUser1Data['balance']"
                @keypress="onlyNumbers"
              ></v-text-field>

              <BaseButton
                title="Remove Funds from Account"
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
        :current-tab="currentTab"
        @selected-items="handleUserSelection"
        :show-select="true"
      />
    </v-col>
  </div>
</template>

<script>
import Request from "../api/index";
import { mapGetters, mapActions } from "vuex";

import BaseTabs from "../components/BaseTabs/BaseTabs";
import BaseTabItem from "../components/BaseTabs/BaseTabItems/BaseTabItem/BaseTabItem";
import BaseButton from "../components/BaseButton/BaseButton";

import BaseDataTable from "../components/BaseDataTable/BaseDataTable";

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
    selectedUser1Data: null,
    selectedUser1FormData: {
      amount: 0,
      description: "",
    },
    selectedUser2Data: null,
    selectedUser2FormData: {
      amount: 0,
      description: "",
    },
    description2: "",
    rules: [(value) => !!value || "Required."],
  }),
  mounted() {
    this.$store.dispatch("getUsers");
  },
  methods: {
    ...mapActions("finance", ["addPayment", "updateBalances", "deductPayment"]),
    getIndex(id) {
      const remitterIndex = this.users.findIndex((u) => {
        return u.id === id;
      });
      return remitterIndex;
    },
    handleTabSelection(value) {
      this.currentTab = value;
      // Sets both array to empty on tab change
      this.selectedUser1Data = null;
      this.selectedUser2Data = null;
      // Reset amount form field on tab change
      this.selectedUser1FormData["amount"] = 0;
    },
    handleUserSelection(value) {
      // console.log(value);
      this.$refs.paymentForm.validate();
      this.selectedUser1Data = value[0];
      this.selectedUser2Data = value.length > 1 ? value[1] : null;
      return value;
    },
    async handleAddFunds() {
      const { selectedUser1Data, selectedUser1FormData } = this;
      const { balance, id, name, number } = selectedUser1Data;
      const { amount, description } = selectedUser1FormData;
      const beneficiaryIndex = this.getIndex(id);

      console.log(balance);

      const data = JSON.stringify({
        data: {
          amount: amount,
          type_key: "incoming",
          beneficiary_account_id: id,
          remitter_name: name,
          remitter_account_number: number,
          description: description,
        },
      });

      console.log(data);

      try {
        const response = await this.req.make("POST", "/api/v1/payments", data);

        console.log(response);
        if (response.status === 201) {
          this.addPayment(response);
          this.users[beneficiaryIndex].balance += amount;
        }
      } catch (e) {
        this.addPayment(e.response);
      }
    },
    async handleSendFunds() {
      const {
        selectedUser1Data,
        selectedUser1FormData,
        selectedUser2Data,
      } = this;
      const {
        balance: user1Balance,
        id: user1Id,
        name: user1Name,
        number: user1Number,
      } = selectedUser1Data;
      const {
        balance: user2Balance,
        id: user2Id,
        name: user2Name,
        number: user2Number,
      } = selectedUser2Data;
      const { amount, description } = selectedUser1FormData;
      const remitterIndex = this.getIndex(user1Id);
      const beneficiaryIndex = this.getIndex(user2Id);

      const data = JSON.stringify({
        data: {
          amount: amount,
          description: description,
          type_key: "internal",
          remitter_account_id: user1Id,
          beneficiary_account_id: user2Id,
        },
      });

      console.log(data);

      try {
        const response = await this.req.make("POST", "/api/v1/payments", data);

        console.log(response);
        if (response.status === 201) {
          this.updateBalances(response);
          this.users[remitterIndex].balance -= amount;
          this.users[beneficiaryIndex].balance += amount;
        }
      } catch (e) {
        this.updateBalances(e.response);
      }
    },
    async handleRemoveFunds() {
      const { selectedUser1Data, selectedUser1FormData } = this;
      const { balance, id, name, number } = selectedUser1Data;
      const { amount, description } = selectedUser1FormData;
      const remitterIndex = this.getIndex(id);

      console.log(balance);

      const data = JSON.stringify({
        data: {
          amount: amount,
          type_key: "outgoing",
          remitter_account_id: id,
          beneficiary_name: name,
          beneficiary_account_number: number,
          description: description,
        },
      });

      console.log(data);

      try {
        const response = await this.req.make("POST", "/api/v1/payments", data);

        console.log(response);
        if (response.status === 201) {
          this.deductPayment(response);
          this.users[remitterIndex].balance -= amount;
        }
      } catch (e) {
        this.deductPayment(e.response);
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
    ...mapGetters("finance", ["getUsers"]),
    users() {
      return this.getUsers;
    },
    getDataTableHeaders() {
      return this.$store.getters.getDataTableHeaders;
    },
    balanceFieldRules() {
      const rules = [(v) => !!v || "Required."];
      if (this.selectedUser1Data) return;
      // balance doesn't exist
      const rule = (v) =>
        (v || "") <= this.selectedUser1Data["balance"] ||
        "You do not have enough funds to do this action!";
      rules.push(rule);
      return rules;
    },
  },
};
</script>
