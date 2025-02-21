<template>
  <v-data-table
    :headers="headers"
    :items="items"
    item-value="name"
    :loading="dataLoading"
    loading-text="Loading... Please wait"
    class="elevation-1"
    density="compact"
    :items-per-page="10"
    :items-per-page-options="[10, 25, 50, 100]"
    style="height: 100vh"
    data-cy="todo-table"
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Todo:</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          data-cy="search-input"
          v-model="search"
          append-inner-icon="mdi-magnify"
          label="Search"
          density="compact"
          hide-details
          single-line
          class="mt-4"
        ></v-text-field>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn
          color="primary"
          dark
          class="mb-2"
          @click="onAdd"
          data-cy="add-button"
        >
          <v-icon left>mdi-plus</v-icon>
          Add
        </v-btn>
      </v-toolbar>
    </template>

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
          @click="action.onClick(item)"
          :data-cy="`${action.text}-button-${item.id}`"
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
    return {
      search: '',
    };
  },
  methods: {
    onAdd() {
      this.$emit('onAdd');
    },
  },
  computed: {
    dataLoading() {
      return this.loading;
    },
  },
  watch: {
    search(value) {
      this.$emit('onSearch', value);
    },
  },
};
</script>
