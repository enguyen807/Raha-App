<template>
  <div>
    <BaseTabs
      :tabs-array="tabs"
      :current-tab="currentTab"
      @selected-tab="handleTabSelection"
    >
      <!-- Add table for list all transaction -->
      <BaseTabItem value="tabs-0">
        <BaseDataTable :data-table-headers="tableHeaders" :items="dataArray" />
      </BaseTabItem>
      <!-- Add line chart that list transactions -->
      <BaseTabItem value="tabs-1">
        <v-card class="mx-auto text-center" color="white">
          <v-card-text>
            <v-sheet>
              <LineChart
                :chart-data="this.handleChartData()"
                :chart-options="this.handleChartOptions()"
              />
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
import LineChart from "../../../components/BaseCharts/BaseLineChart/BaseLineChart";

import Request from "../../../api/index";

import { mapActions } from "vuex";

export default {
  name: "User",
  props: {
    id: {
      type: String,
    },
  },
  components: {
    BaseTabs,
    BaseTabItem,
    BaseDataTable,
    LineChart,
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
    payments: [],
  }),
  async beforeRouteEnter(to, from, next) {
    const req = new Request();

    console.log(to.params.id);
    const id = to.params.id;

    const data = JSON.stringify({
      data: {
        account_id: id,
      },
    });

    try {
      const response = await req.make("POST", "/api/v1/payments/search", data);
      next((vm) => vm.handleSetPaymentsArray(null, response));
    } catch (error) {
      next((vm) => vm.handleSetPaymentsArray(error, response));
    }
  },
  beforeRouteUpdate(to, from, next) {
    // Clear out payment array when user leaves the page
    // Usually used to over write array with new data
    this.payments = [];
    next();
  },
  methods: {
    ...mapActions("alert", ["error"]),
    handleTabSelection(value) {
      this.currentTab = value;
    },
    handleChartData() {
      const data = {
        labels: this.amountArray,
        datasets: [
          {
            label: "Payment History Trend",
            data: this.amountArray,
            fill: false,
            borderColor: "rgb(0, 230, 118)",
            tension: 0.1,
          },
        ],
      };
      return data;
    },
    handleChartOptions() {
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                callback: function (value, index, values) {
                  return "$" + value;
                },
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Transactions",
                fontColor: "#8E24AA",
                fontSize: "16",
              },
              ticks: {
                beginAtZero: false,
                callback: function (value, index, values) {
                  return "$" + value;
                },
              },
              gridLines: {
                display: true,
              },
            },
          ],
        },
        xLabels: {
          title: {
            color: "red",
            display: true,
            text: "Transactions",
          },
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 2000,
          easing: "easeInOutQuart",
        },
      };
      return options;
    },
    handleSetPaymentsArray(err = null, response) {
      if (err) {
        const error = err.toString();
        this.error(error);
      } else {
        this.payments = response.data.data;
      }
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
    dataArray() {
      const payments = this.payments.map((obj) => {
        const amount =
          obj["type_key"] === "incoming" ||
          obj["remitter_account_id"] !== this.id
            ? "+" + obj.amount
            : -Math.abs(obj.amount);

        const data = {
          type_key: obj["type_key"],
          amount: amount,
          remitter_name: obj["remitter_name"],
          beneficiary_name: obj["beneficiary_name"],
          beneficiary_account_id: obj["beneficiary_account_id"] || null,
          remitter_account_id: obj["remitter_account_id"] || null,
        };
        return data;
      });
      return payments;
    },
  },
};
</script>

<style>
</style>