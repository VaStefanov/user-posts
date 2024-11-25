export const tasksFilters = () => [
  {
    label: 'Task Status',
    name: 'status',
    type: 'select',
    options: [{ value: 'Completed' }, { value: 'Not completed' }],
  },
  {
    label: 'Title',
    name: 'title',
    type: 'text',
    value: '',
  },
  {
    label: 'Owner',
    name: 'userId',
    type: 'number',
    value: '',
  },
];
