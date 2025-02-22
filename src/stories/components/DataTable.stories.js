import DataTable from '../../components/DataTable.vue';
import { fn } from '@storybook/test';

export default {
  title: 'Components/DataTable',
  component: DataTable,
};

const Template = (args) => ({
  components: { DataTable },
  setup() {
    return { args };
  },
  template: '<DataTable v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  headers: [
    { title: 'Name', key: 'name', align: 'start', width: '200px' },
    { title: 'Completed', key: 'completed', align: 'center', width: '150px' },
    { title: 'Actions', key: 'actions', align: 'end', width: '150px' },
  ],
  items: [
    {
      id: 1,
      name: 'Task 1',
      completed: true,
      actions: [
        {
          icon: 'mdi-pencil',
          color: 'primary',
          onClick: () => fn(),
          text: 'edit',
        },
        {
          icon: 'mdi-delete',
          color: 'error',
          onClick: () => console.log('Delete'),
          text: 'delete',
        },
      ],
    },
  ],
  loading: false,
  onAdd: fn(),
  onSearch: fn(),
};
