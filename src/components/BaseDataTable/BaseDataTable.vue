<template>
  <v-card class="pa-2" outlined tile>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="dataTableHeaders"
      :items="items"
      :single-select="singleSelect"
      item-key="id"
      show-select
      :search="search"
    >
      <template
        v-slot:[`item.data-table-select`]="{ isSelected, select, item }"
      >
        <v-simple-checkbox
          :value="isSelected"
          :readonly="
            selected.length >= maxSelectedItems && selected.indexOf(item) == -1
          "
          :disabled="
            selected.length >= maxSelectedItems && selected.indexOf(item) == -1
          "
          @input="select($event)"
          v-ripple
        ></v-simple-checkbox>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    dataTableHeaders: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
    },
    singleSelect: {
      type: Boolean,
      default: true,
    },
    maxSelectedItems: {
      type: Number,
      default: 1,
    },
    currentTab: {
      type: String,
    },
  },
  data: () => ({
    selected: [],
    search: "",
  }),
  watch: {
    selected() {
      this.$emit("selected-items", this.selected);
    },
    currentTab() {
      this.selected = [];
    },
  },
};
</script>

<style lang="scss">
th {
  div.v-simple-checkbox {
    display: none;
  }
}

.v-simple-checkbox--disabled {
  cursor: not-allowed !important;
}
</style>