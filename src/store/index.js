import { createStore } from 'vuex';
import api from '../api/api';

// Create a new store instance.
export default createStore({
  state() {
    return {
      todoList: [],
      todoItem: {},
    };
  },
  getters: {
    todoList: (state) => state.todoList,
  },
  mutations: {
    SET_TODO_LIST(state, list) {
      state.todoList = list;
    },
    SET_TODO_ITEM(state, item) {
      state.todoItem = item;
    },
    UPDATE_TODO_ITEM(state, item) {
      const index = state.todoList.findIndex(
        (todoItem) => todoItem.id === item.id
      );
      if (index !== -1) {
        state.todoList[index] = item;
      }
    },
    DELETE_TODO_ITEM(state, id) {
      const index = state.todoList.findIndex((todoItem) => todoItem.id === id);
      if (index !== -1) {
        state.todoList.splice(index, 1);
      }
    },
  },
  actions: {
    async fetchTodos({ commit }) {
      try {
        const response = await api.get('/todos');
        const itensDt = response.data;

        commit('SET_TODO_LIST', itensDt);
      } catch (error) {
        console.error('Erro ao buscar a lista de tarefas:', error);
      }
    },
    async fetchTodoItem({ commit }, id) {
      try {
        const response = await api.get(`/todos/${id}`);
        const itemDt = response.data;
        commit('SET_TODO_ITEM', itemDt);
      } catch (error) {
        console.error('Erro ao buscar a lista de tarefas:', error);
      }
    },
    async createTodo({ commit }, todoItem) {
      try {
        // await api.post('/todos', todoItem);
        commit('SET_TODO_ITEM', response.data);
      } catch (error) {
        console.error('Erro ao criar a tarefa:', error);
      }
    },
    async updateTodo({ commit }, todoItem) {
      try {
        // await api.put(`/todos/${todoItem.id}`, todoItem);
        commit('UPDATE_TODO_ITEM', todoItem);
      } catch (error) {
        console.error('Erro ao atualizar a tarefa:', error);
      }
    },
    async deleteTodo({ commit }, id) {
      try {
        // await api.delete(`/todos/${id}`);
        commit('DELETE_TODO_ITEM', id);
      } catch (error) {
        console.error('Erro ao excluir a tarefa:', error);
      }
    },
  },
});
