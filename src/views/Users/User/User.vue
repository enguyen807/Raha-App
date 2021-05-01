<template>
  <div>
    <!-- User {{ id }} -->
    <BaseTabs
      :tabs-array="tabs"
      :current-tab="currentTab"
      @selected-tab="handleTabSelection"
    >
      <!-- Add table for list all transaction -->
      <BaseTabItem value="tabs-0">
        <BaseDataTable :data-table-headers="tableHeaders" :items="payments" />
      </BaseTabItem>
      <!-- Add line chart that list transactions -->
      <BaseTabItem value="tabs-1">
        <v-card class="mx-auto text-center" color="white">
          <v-card-text>
            <v-sheet>
              <v-sparkline
                :value="amountArray"
                color="secondary"
                height="100"
                padding="24"
                stroke-linecap="round"
                line-width="2"
                label-size="4"
                smooth
              >
                <template v-slot:label="item"> ${{ item.value }} </template>
              </v-sparkline>
            </v-sheet>
          </v-card-text>
        </v-card>
      </BaseTabItem>
    </BaseTabs>
  </div>
</template>

<script>
import BaseTabs from "../../../components/BaseTabs/BaseTabs";
import BaseTabItem from "../../../components/BaseTabs/BaseTabItems/BaseTabItem/BaseTabItem";
import BaseDataTable from "../../../components/BaseDataTable/BaseDataTable";

export default {
  props: {
    id: {
      type: String,
    },
  },
  components: {
    BaseTabs,
    BaseTabItem,
    BaseDataTable,
  },
  data: () => ({
    currentTab: "tabs-0",
    tableHeaders: [
      {
        text: "Remitter",
        value: "remitter_name",
        sortable: true,
      },
      {
        text: "Type",
        value: "type_key",
        sortable: true,
      },
      {
        text: "Amount",
        value: "amount",
        sortable: true,
      },
      {
        text: "Beneficiary",
        value: "beneficiary_name",
        sortable: true,
      },
    ],
    tabs: [
      {
        title: "Payment History",
        icon: "mdi-table",
      },
      {
        title: "Payment Trend",
        icon: "mdi-chart-line",
      },
    ],
    payments: [
      {
        id: "1fbc784a-82fb-4005-a08a-b0104b2d5a31",
        type_key: "outgoing",
        amount: 2000,
        remitter_account_number: "J0K2IZG1DCD89BRA",
        remitter_name: "enguyen807",
        beneficiary_account_number: "J0K2IZG1DCD89BRA",
        beneficiary_name: "enguyen807",
        beneficiary_account_id: null,
        remitter_account_id: "5ad5b5e0-c7e0-47d9-a9f5-fd02dbc8214b",
        description: "",
      },
      {
        id: "e34eff8e-f8ce-452e-88a8-e4cc5881dc2e",
        type_key: "incoming",
        amount: 100,
        remitter_account_number: "J0K2IZG1DCD89BRA",
        remitter_name: "enguyen807",
        beneficiary_account_number: "J0K2IZG1DCD89BRA",
        beneficiary_name: "enguyen807",
        beneficiary_account_id: "5ad5b5e0-c7e0-47d9-a9f5-fd02dbc8214b",
        remitter_account_id: null,
        description: "",
      },
      {
        id: "9aa85b55-7768-4bc5-a999-572a7dc1e830",
        type_key: "internal",
        amount: 680,
        remitter_account_number: "J0K2IZG1DCD89BRA",
        remitter_name: "enguyen807",
        beneficiary_account_number: "V5DOJKNKSZANO4UE",
        beneficiary_name: "LHV",
        beneficiary_account_id: "5abdcb0c-c628-487b-b1b5-d055e2934acf",
        remitter_account_id: "5ad5b5e0-c7e0-47d9-a9f5-fd02dbc8214b",
        description: "",
      },
      {
        id: "5083052a-e4e9-4cc9-8201-c0a20f96aea3",
        type_key: "internal",
        amount: 500,
        remitter_account_number: "PGENQDXQCBZWMD73",
        remitter_name: "Tullu15",
        beneficiary_account_number: "J0K2IZG1DCD89BRA",
        beneficiary_name: "enguyen807",
        beneficiary_account_id: "5ad5b5e0-c7e0-47d9-a9f5-fd02dbc8214b",
        remitter_account_id: "ae38e7fe-5cf7-415a-8c39-ebcda46ccc5d",
        description: "",
      },
      {
        id: "6ad0c53b-c15e-4d4b-b5b9-707a532a78a5",
        type_key: "internal",
        amount: 121,
        remitter_account_number: "PGENQDXQCBZWMD73",
        remitter_name: "Tullu15",
        beneficiary_account_number: "J0K2IZG1DCD89BRA",
        beneficiary_name: "enguyen807",
        beneficiary_account_id: "5ad5b5e0-c7e0-47d9-a9f5-fd02dbc8214b",
        remitter_account_id: "ae38e7fe-5cf7-415a-8c39-ebcda46ccc5d",
        description: "",
      },
      {
        id: "431101ce-dca8-4e36-a626-c62f6710e83d",
        type_key: "internal",
        amount: 1,
        remitter_account_number: "PGENQDXQCBZWMD73",
        remitter_name: "Tullu15",
        beneficiary_account_number: "J0K2IZG1DCD89BRA",
        beneficiary_name: "enguyen807",
        beneficiary_account_id: "5ad5b5e0-c7e0-47d9-a9f5-fd02dbc8214b",
        remitter_account_id: "ae38e7fe-5cf7-415a-8c39-ebcda46ccc5d",
        description: "",
      },
      {
        id: "3f35ba58-1f71-4b5e-af1a-752f546524c5",
        type_key: "internal",
        amount: 878,
        remitter_account_number: "PGENQDXQCBZWMD73",
        remitter_name: "Tullu15",
        beneficiary_account_number: "J0K2IZG1DCD89BRA",
        beneficiary_name: "enguyen807",
        beneficiary_account_id: "5ad5b5e0-c7e0-47d9-a9f5-fd02dbc8214b",
        remitter_account_id: "ae38e7fe-5cf7-415a-8c39-ebcda46ccc5d",
        description: "",
      },
      {
        id: "cd0b0dbb-bc77-4ef2-b73a-c0a273c05cda",
        type_key: "internal",
        amount: 878,
        remitter_account_number: "PGENQDXQCBZWMD73",
        remitter_name: "Tullu15",
        beneficiary_account_number: "J0K2IZG1DCD89BRA",
        beneficiary_name: "enguyen807",
        beneficiary_account_id: "5ad5b5e0-c7e0-47d9-a9f5-fd02dbc8214b",
        remitter_account_id: "ae38e7fe-5cf7-415a-8c39-ebcda46ccc5d",
        description: "",
      },
      {
        id: "dff6b471-6148-442f-ab47-9ee42e29dced",
        type_key: "incoming",
        amount: 201,
        remitter_account_number: "J0K2IZG1DCD89BRA",
        remitter_name: "enguyen807",
        beneficiary_account_number: "J0K2IZG1DCD89BRA",
        beneficiary_name: "enguyen807",
        beneficiary_account_id: "5ad5b5e0-c7e0-47d9-a9f5-fd02dbc8214b",
        remitter_account_id: null,
        description: "Adding Funds",
      },
      {
        id: "8f83a04f-b904-4e48-8f60-5c3715697836",
        type_key: "incoming",
        amount: 101,
        remitter_account_number: "J0K2IZG1DCD89BRA",
        remitter_name: "enguyen807",
        beneficiary_account_number: "J0K2IZG1DCD89BRA",
        beneficiary_name: "enguyen807",
        beneficiary_account_id: "5ad5b5e0-c7e0-47d9-a9f5-fd02dbc8214b",
        remitter_account_id: null,
        description: null,
      },
    ],
  }),
  methods: {
    handleTabSelection(value) {
      this.currentTab = value;
    },
  },
  computed: {
    amountArray() {
      return this.payments
        .map((payment) =>
          payment["type_key"] === "incoming" ||
          payment["remitter_account_id"] !== this.id
            ? payment.amount
            : -Math.abs(payment.amount)
        )
        .reverse();
    },
  },
};
</script>

<style>
</style>