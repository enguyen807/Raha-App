<template>
  <v-col>
    <v-tabs v-model="selectedTab" fixed-tabs>
      <v-tabs-slider></v-tabs-slider>
      <v-tab
        class="primary--text"
        v-for="(tab, i) in tabs"
        :key="`tabs-${i}`"
        :href="`#tabs-${i}`"
      >
        {{ tab.title }}
      </v-tab>
    </v-tabs>

    <form>
      <v-tabs-items v-model="selectedTab">
        <v-tab-item value="tabs-0">
          <v-card flat>
            <v-card-text>In Add Funds</v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tabs-1">
          <v-card flat>
            <v-card-text>In Send Funds</v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tabs-2">
          <v-card flat>
            <v-card-text>In Remove Funds</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </form>
  </v-col>
</template>

<script>
export default {
  name: "Finance",
  components: {},
  data: () => ({
    selectedTab: null,
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
  }),
  methods: {
    handleTabSelection(value) {
      console.log(value);
      this.selectedTab = value;
    },
  },
};
</script>
