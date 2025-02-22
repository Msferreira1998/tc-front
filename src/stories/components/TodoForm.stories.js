import TodoForm from '../../components/TodoForm.vue';

export default {
  title: 'Components/TodoForm',
  component: TodoForm,
  argTypes: {
    item: { control: 'object' },
    onSubmit: { action: 'onSubmit' },
    onCancel: { action: 'onCancel' },
  },
};

const Template = (args, { argTypes }) => ({
  components: { TodoForm },
  props: Object.keys(argTypes),
  template: `
    <TodoForm
      :item="item"
      @onSubmit="onSubmit"
      @onCancel="onCancel"
    />
  `,
});

export const EmptyForm = Template.bind({});
EmptyForm.args = {
  item: null,
};

export const EditForm = Template.bind({});
EditForm.args = {
  item: {
    id: 1,
    title: 'Comprar leite',
    userId: 5,
    completed: false,
  },
};
