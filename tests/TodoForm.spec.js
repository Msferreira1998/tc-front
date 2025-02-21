import { mount } from '@vue/test-utils';
import TodoForm from '../src/components/TodoForm.vue';
import { describe, it, expect } from 'vitest';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

global.ResizeObserver = require('resize-observer-polyfill');

describe('TodoForm', () => {
  it('renders the form with fields and buttons', () => {
    const wrapper = mount(TodoForm, {
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.find('[data-cy="title-input"]').exists()).toBe(true);
    expect(wrapper.find('[data-cy="user-id-input"]').exists()).toBe(true);
    expect(wrapper.find('[data-cy="submit-button"]').exists()).toBe(true);
    expect(wrapper.find('[data-cy="cancel-button"]').exists()).toBe(true);
  });

  it('emits "onSubmit" with form data when the form is valid', async () => {
    const wrapper = mount(TodoForm, {
      global: {
        plugins: [vuetify],
      },
    });

    const titleInput = wrapper.find('[data-cy="title-input"]').find('input');
    await titleInput.setValue('New Todo');
    const userIdInput = wrapper.find('[data-cy="user-id-input"]').find('input');
    await userIdInput.setValue(123);

    await wrapper.find('[data-cy="submit-button"]').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().onSubmit).toBeTruthy();
    expect(wrapper.emitted().onSubmit[0]).toEqual([
      {
        id: null,
        title: 'New Todo',
        userId: 123,
        completed: false,
      },
    ]);
  });

  it('does not emit "onSubmit" when the form is invalid', async () => {
    const wrapper = mount(TodoForm, {
      global: {
        plugins: [vuetify],
      },
    });

    await wrapper.setData({
      title: '',
      userId: null,
    });

    await wrapper.find('[data-cy="submit-button"]').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().onSubmit).toBeFalsy();
  });

  it('emits "onCancel" when cancel button is clicked', async () => {
    const wrapper = mount(TodoForm, {
      global: {
        plugins: [vuetify],
      },
    });

    await wrapper.find('[data-cy="cancel-button"]').trigger('click');

    expect(wrapper.emitted().onCancel).toBeTruthy();
  });

  it('fills form fields when item prop is passed', async () => {
    const item = {
      id: 1,
      title: 'Existing Todo',
      userId: 456,
    };

    const wrapper = mount(TodoForm, {
      global: {
        plugins: [vuetify],
      },
      props: {
        item,
      },
    });
  });
});
