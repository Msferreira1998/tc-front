<
<template>
  <div>
    <DataTable
      :headers="headers"
      :items="todoList"
      :loading="tableLoading"
      @onEdit="onEdit"
    />
    {{ teste }}
  </div>
</template>

<script>
import DataTable from '../components/DataTable.vue';
export default {
  name: 'ListagemData',
  components: {
    DataTable,
  },
  data() {
    return {
      tableLoading: false,
      headers: [
        { title: 'id', align: 'start', key: 'id' },
        { title: 'Title', align: 'start', key: 'title' },
        { title: 'Completed', align: 'start', key: 'completed' },
        { title: 'User id', align: 'start', key: 'userId' },
        { title: 'Actions', align: 'start', key: 'actions' },
      ],
      teste: {},
    };
  },
  methods: {
    controlTableLoading(fn) {
      this.tableLoading = true;
      fn();
      this.tableLoading = false;
    },
    onEdit(item) {
      this.teste = item;
    },
    onDelete(item) {
      this.teste = item;
    },
  },
  computed: {
    todoList() {
      return this.$store.state.todoList;
    },
  },
  mounted() {
    this.controlTableLoading(async () => {
      this.$store.dispatch('fetchTodoList');
    });
  },
};
</script>

<style></style>
