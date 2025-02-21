import { createStore } from 'vuex';
import api from '../api/api';

export default createStore({
  state() {
    return {
      todoList: [],
      todoItem: {},
      filteredList: [],
    };
  },
  getters: {
    todoList: (state) => state.todoList,
    todoItem: (state) => state.todoItem,
    filteredList: (state) => state.filteredList,
  },
  mutations: {
    SET_TODO_LIST(state, list) {
      state.todoList = list;
    },
    SET_FILTERED_LIST(state, list) {
      state.filteredList = list;
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
    CREATE_TODO_ITEM(state, item) {
      state.todoList.unshift(item);
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
        commit('SET_FILTERED_LIST', itensDt);
      } catch (error) {
        console.error('Erro ao buscar a lista de tarefas:', error);
      }
    },
    fetchTodoItem({ commit }, id) {
      try {
        const index = this.state.todoList.findIndex(
          (todoItem) => todoItem.id === id
        );
        // const response = api.get(`/todos/${id}`);
        // const responseDt = response.data;
        const itemDt = this.state.todoList[index];
        commit('SET_TODO_ITEM', itemDt);
      } catch (error) {
        console.error('Erro ao buscar a lista de tarefas:', error);
      }
    },
    cleanTodoItem({ commit }) {
      commit('SET_TODO_ITEM', {});
    },
    searchTodo({ commit }, searchTerm) {
      if (!searchTerm) {
        commit('SET_FILTERED_LIST', this.state.todoList);
        return;
      }
      const filteredList = this.state.todoList.filter((todoItem) =>
        todoItem.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      commit('SET_FILTERED_LIST', filteredList);
    },
    createTodo({ commit }, todoItem) {
      try {
        // const response = api.post('/todos', todoItem);
        // const responseDt = response.data;
        commit('CREATE_TODO_ITEM', todoItem);
      } catch (error) {
        console.error('Erro ao criar a tarefa:', error);
      }
    },
    updateTodo({ commit }, todoItem) {
      try {
        // const response = api.put(`/todos/${todoItem.id}`, todoItem);
        // const responseDt = response.data;
        commit('UPDATE_TODO_ITEM', todoItem);
      } catch (error) {
        console.error('Erro ao atualizar a tarefa:', error);
      }
    },
    deleteTodo({ commit }, id) {
      try {
        // await api.delete(`/todos/${id}`);
        commit('DELETE_TODO_ITEM', id);
      } catch (error) {
        console.error('Erro ao excluir a tarefa:', error);
      }
    },
  },
});
