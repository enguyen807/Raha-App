<template>
  <div class="canvas__wrapper">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
// Had to use require because ChartJS 2.9.4 isn't using ES6^
// Latest version of ChartJS also breaks
let Chart = require("chart.js");

export default {
  props: {
    chartData: {
      type: Object,
      required: false,
    },
    chartOptions: {
      type: Object,
    },
  },
  data: () => ({}),
  mounted() {
    let { chartData, chartOptions } = this;
    this.createLineChart(chartData, chartOptions);
  },
  methods: {
    createLineChart(chartData, chartOptions) {
      const chartElement = this.$refs.chart;
      const chart = new Chart(chartElement, {
        type: "line",
        data: chartData,
        options: chartOptions,
      });
      return chart;
    },
  },
};
</script>

<style lang="scss">
.canvas__wrapper {
  height: 500px;
}
</style>