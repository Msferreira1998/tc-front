import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import DataTable from '../src/components/DataTable.vue';

const vuetify = createVuetify({
  components,
  directives,
});

global.ResizeObserver = require('resize-observer-polyfill');

describe('DataTable.vue', () => {
  it('renders the table with headers and items', () => {
    const headers = [
      { title: 'Name', key: 'name' },
      { title: 'Completed', key: 'completed' },
      { title: 'Actions', key: 'actions' },
    ];

    const items = [
      { id: 1, name: 'Task 1', completed: true, actions: [] },
      { id: 2, name: 'Task 2', completed: false, actions: [] },
    ];

    const wrapper = mount(DataTable, {
      global: {
        plugins: [vuetify],
      },
      props: {
        headers,
        items,
        loading: false,
      },
    });

    expect(wrapper.text()).toContain('Name');
    expect(wrapper.text()).toContain('Completed');
    expect(wrapper.text()).toContain('Actions');

    expect(wrapper.text()).toContain('Task 1');
    expect(wrapper.text()).toContain('Task 2');
  });

  it('emits onAdd event when the add button is clicked', async () => {
    const headers = [
      { title: 'Name', key: 'name' },
      { title: 'Completed', key: 'completed' },
      { title: 'Actions', key: 'actions' },
    ];

    const items = [{ id: 1, name: 'Task 1', completed: true, actions: [] }];

    const wrapper = mount(DataTable, {
      global: {
        plugins: [vuetify],
      },
      props: {
        headers,
        items,
        loading: false,
      },
    });

    const addButton = wrapper.find('[data-cy="add-button"]');
    await addButton.trigger('click');

    expect(wrapper.emitted('onAdd')).toBeTruthy();
  });

  it('emits onSearch event when the search input changes', async () => {
    const headers = [
      { title: 'Name', key: 'name' },
      { title: 'Completed', key: 'completed' },
      { title: 'Actions', key: 'actions' },
    ];

    const items = [{ id: 1, name: 'Task 1', completed: true, actions: [] }];

    const wrapper = mount(DataTable, {
      global: {
        plugins: [vuetify],
      },
      props: {
        headers,
        items,
        loading: false,
      },
    });

    const vSearchInput = wrapper.find('[data-cy="search-input"]');
    const searchInput = vSearchInput.find('input');
    await searchInput.setValue('Task 1');

    expect(wrapper.emitted('onSearch')).toBeTruthy();
    expect(wrapper.emitted('onSearch')[0]).toEqual(['Task 1']);
  });

  it('displays loading text when loading is true', async () => {
    const headers = [
      { title: 'Name', key: 'name' },
      { title: 'Completed', key: 'completed' },
      { title: 'Actions', key: 'actions' },
    ];

    const items = [];

    const wrapper = mount(DataTable, {
      global: {
        plugins: [vuetify],
      },
      props: {
        headers,
        items,
        loading: true,
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Loading... Please wait');
  });
});
