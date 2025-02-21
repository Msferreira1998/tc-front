import { mount } from '@vue/test-utils';
import ListagemData from '../src/views/ListagemData.vue';
import { describe, it, expect } from 'vitest';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createStore } from 'vuex';

const vuetify = createVuetify({
  components,
  directives,
});

global.ResizeObserver = require('resize-observer-polyfill');

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(() =>
      Promise.resolve({
        isConfirmed: true,
        isDenied: false,
        isDismissed: false,
      })
    ),
    close: vi.fn(),
  },
}));

describe('ListagemData', () => {
  let store;
  beforeEach(() => {
    store = createStore({
      state() {
        return {
          todoList: [
            { id: 1, title: 'Test Todo', userId: 123, completed: false },
          ],
          todoItem: {},
          filteredList: [
            { id: 1, title: 'Test Todo', userId: 123, completed: false },
          ],
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
        SET_TODO_ITEM(state, item) {
          state.todoItem = item;
        },
        SET_FILTERED_LIST(state, list) {
          state.filteredList = list;
        },
        CREATE_TODO_ITEM(state, item) {
          state.todoList.unshift(item);
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
          const index = state.todoList.findIndex(
            (todoItem) => todoItem.id === id
          );
          if (index !== -1) {
            state.todoList.splice(index, 1);
          }
        },
      },
      actions: {
        async fetchTodos({ commit }) {
          commit('SET_TODO_LIST', [
            { id: 1, title: 'Test Todo', userId: 123, completed: false },
          ]);
        },
        fetchTodoItem({ commit }, id) {
          const item = {
            id: 1,
            title: 'Test Todo',
            userId: 123,
            completed: false,
          };
          commit('SET_TODO_ITEM', item);
        },
        cleanTodoItem({ commit }) {
          commit('SET_TODO_ITEM', {});
        },
        createTodo({ commit }, todoItem) {
          commit('CREATE_TODO_ITEM', todoItem);
        },
        updateTodo({ commit }, todoItem) {
          commit('UPDATE_TODO_ITEM', todoItem);
        },
        deleteTodo({ commit }, id) {
          commit('DELETE_TODO_ITEM', id);
        },
      },
    });
  });

  it('renders the DataTable and TodoForm components correctly', async () => {
    const wrapper = await mount(ListagemData, {
      global: {
        plugins: [vuetify, store],
      },
    });

    await wrapper.setData({ dialog: true });

    wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'DataTable' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TodoForm' }).exists()).toBe(true);
  });

  it('opens dialog when "onAdd" is called', async () => {
    const wrapper = mount(ListagemData, {
      global: {
        plugins: [vuetify, store],
      },
    });

    await wrapper.setData({ dialog: true });
    await wrapper.vm.$nextTick();

    await wrapper.find('[data-cy="add-button"]').trigger('click');

    expect(wrapper.vm.dialog).toBe(true);
  });

  it('closes dialog when "onCancel" is called', async () => {
    const wrapper = mount(ListagemData, {
      global: {
        plugins: [vuetify, store],
      },
    });

    await wrapper.setData({ dialog: true });
    await wrapper.vm.$nextTick();

    const form = wrapper.findComponent({ name: 'TodoForm' });
    await wrapper.vm.$nextTick();
    await form.find('[data-cy="cancel-button"]').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.dialog).toBe(false);
  });

  it('calls onSubmit when the form is submitted in the dialog', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const swalMock = vi.fn(() => Promise.resolve({ isConfirmed: true }));
    const wrapper = mount(ListagemData, {
      global: {
        plugins: [vuetify, store],
        mocks: {
          $swal: swalMock,
        },
      },
    });

    await wrapper.setData({ dialog: true });
    await wrapper.vm.$nextTick();

    const form = wrapper.findComponent({ name: 'TodoForm' });
    await form
      .find('[data-cy="title-input"]')
      .find('input')
      .setValue('New Todo');
    await form.find('[data-cy="user-id-input"]').find('input').setValue(123);
    await form.find('[data-cy="submit-button"]').trigger('click');
    await wrapper.vm.$nextTick();

    expect(dispatchSpy).toHaveBeenNthCalledWith(2, 'createTodo', {
      title: 'New Todo',
      userId: 123,
      completed: false,
      id: 2,
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.todoItem).toEqual({});
    expect(dispatchSpy).toHaveBeenNthCalledWith(3, 'cleanTodoItem');

    dispatchSpy.mockRestore();
  });

  it('calls correct actions when item is edited', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const wrapper = await mount(ListagemData, {
      global: {
        plugins: [vuetify, store],
      },
    });
    await wrapper.vm.$nextTick();

    const table = await wrapper.findComponent({ name: 'DataTable' });
    await table.find('[data-cy="Editar-button-1"]').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.dialog).toBe(true);

    const form = wrapper.findComponent({ name: 'TodoForm' });
    await form
      .find('[data-cy="title-input"]')
      .find('input')
      .setValue('Edited Todo');
    await form.find('[data-cy="submit-button"]').trigger('click');
    await wrapper.vm.$nextTick();
    expect(dispatchSpy).toHaveBeenNthCalledWith(3, 'updateTodo', {
      id: 1,
      title: 'Edited Todo',
      userId: 123,
      completed: false,
    });

    dispatchSpy.mockRestore();
  });

  it('calls correct actions when item is completed', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const swalMock = vi.fn(() => Promise.resolve({ isConfirmed: true }));

    const wrapper = await mount(ListagemData, {
      global: {
        plugins: [vuetify, store],
        mocks: {
          $swal: swalMock,
        },
      },
    });
    await wrapper.vm.$nextTick();

    const table = await wrapper.findComponent({ name: 'DataTable' });
    await table.find('[data-cy="Concluir-button-1"]').trigger('click');
    await wrapper.vm.$nextTick();

    expect(dispatchSpy).toHaveBeenNthCalledWith(2, 'updateTodo', {
      id: 1,
      title: 'Test Todo',
      userId: 123,
      completed: true,
    });

    dispatchSpy.mockRestore();
  });

  it('calls correct actions when item is not completed', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const swalMock = vi.fn(() => Promise.resolve({ isConfirmed: true }));

    const wrapper = await mount(ListagemData, {
      global: {
        plugins: [vuetify, store],
        mocks: {
          $swal: swalMock,
        },
      },
    });
    wrapper.vm.todoList[0].completed = true;
    await wrapper.vm.$nextTick();

    const table = await wrapper.findComponent({ name: 'DataTable' });
    await table.find('[data-cy="Concluir-button-1"]').trigger('click');
    await wrapper.vm.$nextTick();

    expect(dispatchSpy).toHaveBeenNthCalledWith(2, 'updateTodo', {
      id: 1,
      title: 'Test Todo',
      userId: 123,
      completed: false,
    });

    dispatchSpy.mockRestore();
  });

  it('calls correct actions when item is deleted', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const swalMock = vi.fn(() => Promise.resolve({ isConfirmed: true }));

    const wrapper = await mount(ListagemData, {
      global: {
        plugins: [vuetify, store],
        mocks: {
          $swal: swalMock,
        },
      },
    });
    await wrapper.vm.$nextTick();

    const table = await wrapper.findComponent({ name: 'DataTable' });
    await table.find('[data-cy="Excluir-button-1"]').trigger('click');
    await wrapper.vm.$nextTick();

    expect(dispatchSpy).toHaveBeenNthCalledWith(2, 'deleteTodo', 1);
  });

  it('checks if todoItem are clear when dialog is closed', async () => {
    const spyDispatch = vi.spyOn(store, 'dispatch');
    const wrapper = mount(ListagemData, {
      global: {
        plugins: [vuetify, store],
      },
    });
    await wrapper.setData({ dialog: true });
    await wrapper.vm.$nextTick();

    const form = wrapper.findComponent({ name: 'TodoForm' });
    await form
      .find('[data-cy="title-input"]')
      .find('input')
      .setValue('New Todo');
    await form.find('[data-cy="user-id-input"]').find('input').setValue(123);
    await form.find('[data-cy="cancel-button"]').trigger('click');

    expect(wrapper.vm.dialog).toBe(false);
    expect(wrapper.vm.todoItem).toEqual({});
    expect(spyDispatch).toHaveBeenNthCalledWith(2, 'cleanTodoItem');
  });

  it('checks search is working', async () => {
    const spyDispatch = vi.spyOn(store, 'dispatch');
    const wrapper = mount(ListagemData, {
      global: {
        plugins: [vuetify, store],
      },
    });

    await wrapper.vm.$nextTick();

    const table = await wrapper.findComponent({ name: 'DataTable' });
    await table.find('[data-cy="search-input"]').find('input').setValue('Test');
    await wrapper.vm.$nextTick();

    expect(spyDispatch).toHaveBeenNthCalledWith(2, 'searchTodo', 'Test');
  });

  it('checks search if has no data', async () => {
    const store2 = createStore({
      modules: {
        todo: {
          state: {
            filteredList: [],
          },
          getters: {
            filteredList: (state) => state.filteredList,
          },
        },
      },
    });
    const wrapper = mount(ListagemData, {
      global: {
        plugins: [vuetify, store2],
      },
    });
    wrapper.vm.filteredList = [];
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.todoList).toEqual([]);
  });
});
