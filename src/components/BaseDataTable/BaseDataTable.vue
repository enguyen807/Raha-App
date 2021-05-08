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
    sortBy: null,
    descending: false,
    selected: [],
    expanded: [],
    search: "",
  }),
  methods: {
    handleSort(column) {
      this.descending = !this.descending;

      if (this.sortBy === column) {
        this.sortItems();
      } else {
        this.sortBy = column;
        this.descending = false;
        this.sortItems();
      }
    },
    sortItems() {
      const { sortBy, descending } = this;
      let items = this.items;

      if (sortBy) {
        items.sort((a, b) => {
          const sortA =
            typeof a[sortBy] === "number"
              ? a[sortBy]
              : a[sortBy].toString().toLowerCase();
          const sortB =
            typeof b[sortBy] === "number"
              ? b[sortBy]
              : b[sortBy].toString().toLowerCase();

          if (descending) {
            if (sortA < sortB) return 1;
            if (sortA > sortB) return -1;
            return 0;
          } else {
            if (sortA < sortB) return -1;
            if (sortA > sortB) return 1;
            return 0;
          }
        });
      }
    },
  },
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