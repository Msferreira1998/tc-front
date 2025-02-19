<template>
  <div>
    <v-data-table-virtual
      :headers="headers"
      :items="items"
      height="400"
      item-value="name"
      :loading="loading"
    >
      <template #item.actions="{ item }">
        <div>
          <v-btn
            v-for="(action, index) in item.actions"
            :key="index"
            :icon="action.icon"
            :color="action.color"
            :disabled="action.disabled"
            size="small"
            @click="action.onClick(item)"
            class="mx-1"
          >
          </v-btn>
        </div>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    tableActions() {
      if (this.actions.length > 0) {
        return this.actions;
      }
    },
  },
};
</script>

<style></style>
