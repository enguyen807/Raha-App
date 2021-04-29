<template>
  <div>
    <BaseTabs
      :tabsArray="tabs"
      :currentTab="currentTab"
      @selected-tab="handleTabSelection"
    >
      <form>
        <BaseTabItem value="tabs-0">
          <v-card-text>Add Funds</v-card-text>
          <v-card-text>Description</v-card-text>
          <v-card-text>Amount</v-card-text>
        </BaseTabItem>
        <BaseTabItem value="tabs-1">
          <v-card-text>In Send Funds</v-card-text>
          <v-card-text>Description</v-card-text>
          <v-card-text>Amount</v-card-text>
        </BaseTabItem>
        <BaseTabItem value="tabs-2">
          <v-card-text>In Remove Funds</v-card-text>
          <v-card-text>Description</v-card-text>
          <v-card-text>Amount</v-card-text>
        </BaseTabItem>
      </form>
    </BaseTabs>
    dsafsdf
  </div>
</template>

<script>
import BaseTabs from "../components/BaseTabs/BaseTabs";
import BaseTabItem from "../components/BaseTabs/BaseTabItems/BaseTabItem/BaseTabItem";

export default {
  name: "Finance",
  components: {
    BaseTabs,
    BaseTabItem,
  },
  data: () => ({
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
  }),
  methods: {
    handleTabSelection(value) {
      this.currentTab = value;
    },
  },
};
</script>
