<
<template>
  <v-app>
    <v-main>
      <v-container>
        <DataTable
          :headers="headers"
          :items="todoList"
          :loading="tableLoading"
          @onEdit="onEdit"
        />
      </v-container>
    </v-main>
  </v-app>
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
        { title: 'Title', align: 'start', key: 'title' },
        {
          title: 'Completed',
          align: 'center',
          key: 'completed',
        },
        { title: 'User', align: 'center', key: 'userId', maxWidth: 40 },
        { title: 'Actions', align: 'start', key: 'actions', minWidth: 120 },
      ],
    };
  },
  methods: {
    async setTableLoading(fn) {
      this.tableLoading = true;
      await fn();
      this.tableLoading = false;
    },
    onEdit(item) {
      //
    },
    onDelete(item) {
      this.$swal({
        title: 'Você tem certeza?',
        text: 'Você não poderá reverter isso!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('deleteTodo', item.id);
          this.$swal('Excluído!', 'Seu arquivo foi excluído.', 'success');
        }
      });
    },
    onComplete(item) {
      this.$swal({
        title: 'Você tem certeza?',
        icon: item.completed ? 'warning' : 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: item.completed ? 'Sim, desmarcar!' : 'Sim, marcar!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          item.completed = !item.completed;
          this.$store.dispatch('updateTodo', item);
          this.$swal('Concluído!', 'Seu arquivo foi concluído.', 'success');
        }
      });
    },
  },
  computed: {
    todoList() {
      const todoList = this.$store.getters.todoList;
      todoList.forEach((item) => {
        item.actions = [
          {
            text: 'Editar',
            icon: 'mdi-pencil',
            color: 'primary',
            disabled: item.completed,
            onClick: () => this.onEdit(item),
          },
          {
            text: 'Excluir',
            icon: 'mdi-delete',
            disabled: item.completed,
            color: 'error',
            onClick: () => this.onDelete(item),
          },
          {
            text: 'Concluir',
            icon: item.completed ? 'mdi-close' : 'mdi-check',
            disabled: false,
            color: item.completed ? 'error' : 'success',
            onClick: () => this.onComplete(item),
          },
        ];
      });

      return todoList;
    },
  },
  mounted() {
    this.setTableLoading(async () => {
      await this.$store.dispatch('fetchTodos');
    });
  },
};
</script>

<style></style>
