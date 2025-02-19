<template>
  <v-data-table
    :headers="headers"
    :items="items"
    item-value="name"
    :loading="dataLoading"
    loading-text="Loading... Please wait"
    :items-per-page="5"
    class="elevation-1"
    density="compact"
  >
    <template #item.completed="{ item }">
      <v-icon :color="item.completed ? 'success' : 'error'">
        {{ item.completed ? 'mdi-check-circle' : 'mdi-close-circle' }}
      </v-icon>
    </template>

    <template #item.actions="{ item }">
      <div>
        <v-icon
          v-for="(action, index) in item.actions"
          :key="index"
          :color="action.color"
          :disabled="action.disabled"
          small
          class="mr-1"
          @click="action.onClick"
        >
          {{ action.icon }}
        </v-icon>
      </div>
    </template>
  </v-data-table>
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
    dataLoading() {
      return this.loading;
    },
  },
};
</script>

<style></style>
