<template>
  <v-app>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <TodoForm :item="todoItem" @onSubmit="onSubmit" @onCancel="onCancel" />
    </v-dialog>

    <DataTable
      :headers="headers"
      :items="todoList"
      :loading="tableLoading"
      @onEdit="onEdit"
      @onSearch="onSearch"
      @onAdd="onAdd"
    />
  </v-app>
</template>

<script>
import DataTable from '../components/DataTable.vue';
import TodoForm from '../components/TodoForm.vue';
export default {
  name: 'ListagemData',
  components: {
    DataTable,
    TodoForm,
  },
  data() {
    return {
      dialog: false,
      tableLoading: false,
      headers: [
        { title: 'Title', align: 'start', key: 'title', width: 350 },
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
    onSubmit(todo) {
      if (todo.id) {
        this.$store.dispatch('updateTodo', todo);
        this.$swal('Atualizado!', 'Seu arquivo foi atualizado.', 'success');
      } else {
        todo.id = this.$store.getters.todoList.length + 1;
        this.$store.dispatch('createTodo', todo);
        this.$swal('Criado!', 'Seu arquivo foi criado.', 'success');
      }

      this.$store.dispatch('cleanTodoItem');
      this.dialog = false;
    },
    onSearch(value) {
      this.$store.dispatch('searchTodo', value);
    },
    onAdd() {
      this.$store.dispatch('cleanTodoItem');
      this.dialog = true;
    },
    onCancel() {
      this.$store.dispatch('cleanTodoItem');
      this.dialog = false;
    },
    onEdit({ id }) {
      this.$store.dispatch('fetchTodoItem', id);
      this.dialog = true;
    },
    onDelete({ id }) {
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
          this.$store.dispatch('deleteTodo', id);
          this.$swal('Excluído!', 'Seu arquivo foi excluído.', 'success');
        }
      });
    },
    onComplete({ completed, id, title, userId }) {
      this.$swal({
        title: 'Você tem certeza?',
        icon: completed ? 'warning' : 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: completed ? 'Sim, desmarcar!' : 'Sim, marcar!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          completed = !completed;
          this.$store.dispatch('updateTodo', { id, title, completed, userId });
          this.$swal('Concluído!', 'Seu arquivo foi concluído.', 'success');
        }
      });
    },
  },
  computed: {
    todoList() {
      const todoList = this.$store.getters.filteredList;
      if (!todoList.length) {
        return [];
      }
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
    todoItem() {
      return this.$store.getters.todoItem;
    },
  },
  mounted() {
    this.setTableLoading(async () => {
      await this.$store.dispatch('fetchTodos');
    });
  },
};
</script>
