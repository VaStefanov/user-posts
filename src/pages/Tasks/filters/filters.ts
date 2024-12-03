import { FilterOptions } from '../types';

interface ITasksFilters {
  label: string;
  name: keyof FilterOptions;
  type: 'select' | 'number' | 'text';
  options?: { value: boolean; label: string }[];
  value: string | number | boolean;
}

export const tasksFilters = (): ITasksFilters[] => [
  {
    label: 'Task Status',
    name: 'status',
    type: 'select',
    options: [
      { value: true, label: 'Completed' },
      { value: false, label: 'Not Completed' },
    ],
    value: '',
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
