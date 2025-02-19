import { createStore } from 'vuex';
import api from '../api/api';

// Create a new store instance.
export default createStore({
  state() {
    return {
      todoList: [],
    };
  },
  getters: {
    todoList: (state) => state.todoList,
  },
  mutations: {
    SET_TODO_LIST(state, list) {
      state.todoList = list;
    },
  },
  actions: {
    async fetchTodoList({ commit }) {
      try {
        const response = await api.get('/todos');
        const itensDt = response.data;

        itensDt.forEach((item) => {
          item.actions = [
            {
              text: 'Editar',
              icon: 'mdi-pencil',
              color: 'primary',
              disabled: item.completed,
              //onClick: () => this.onEdit(item),
            },
            {
              text: 'Excluir',
              icon: 'mdi-delete',
              disabled: item.completed,
              color: 'error',
              //   onClick: () => {
              //     this.onDelete(item);
              //   },
            },
          ];
        });

        commit('SET_TODO_LIST', itensDt);
      } catch (error) {
        console.error('Erro ao buscar a lista de tarefas:', error);
      }
    },
  },
});
