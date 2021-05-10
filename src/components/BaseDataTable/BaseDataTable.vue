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
      v-model="selectedItems"
      :headers="dataTableHeaders"
      :items="items"
      :single-select="singleSelect"
      item-key="id"
      :show-select="showSelect"
      :search="search"
    >
      <template #[`header.data-table-select`]="{}"> </template>
      <!-- Custom Checkbox Named Slots -->
      <template #[`item.data-table-select`]="{ isSelected, select, item }">
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
      <!-- Custom Actions Named Slots -->
      <template #[`item.actions`]="{ item }">
        <BaseButton
          title="View Transaction History"
          icon="mdi-eye"
          :btn-color="['accent', 'black--text']"
          :btn-class="['ma-2']"
          :href="`/user/${item.id}`"
        />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import BaseButton from "../BaseButton/BaseButton";

export default {
  props: {
    dataTableHeaders: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    singleSelect: {
      type: Boolean,
      default: true,
    },
    maxSelectedItems: {
      type: Number,
      default: 1,
    },
    selectedUser: {
      type: Array,
    },
    showSelect: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BaseButton,
  },
  data: () => ({
    selected: [],
    expanded: [],
    search: "",
  }),
  methods: {},
  computed: {
    selectedItems: {
      get() {
        return this.selected;
      },
      set(v) {
        this.selected = v;
        this.$emit("input", this.selected);
      },
    },
  },
};
</script>

<style lang="scss">
.v-simple-checkbox--disabled {
  cursor: not-allowed !important;
}
</style>