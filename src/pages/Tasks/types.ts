export type Task = {
  userId: string;
  id: string;
  title: string;
  completed: boolean;
};

export type TasksState = {
  tasksState: Task[];
  isLoading: boolean;
};

export type filters = {
  completed?: boolean;
  title?: string;
  userId?: string;
};

export type paginationOptions = {
  page: number;
  pageSize: number;
  total: number;
};

export type initialTasksSliceState = {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  paginationState: {
    page: number;
    pageSize: number;
    total: number;
  };
  activeFilters: {};
};

export interface IRenderFilterType {
  name: string;
}

export interface ISelectFilterType extends IRenderFilterType {
  value: boolean | undefined | null;
  type: 'select';
  options?: { value: boolean; label: string }[] | undefined;
  onChange: (e: boolean) => void;
}

export interface ITextInputFilterType extends IRenderFilterType {
  value: string | undefined;
  type: 'text';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface INumberInputFilterType extends IRenderFilterType {
  value: number | undefined | null;
  type: 'number';
  onChange: (e: number | null) => void;
}

export type FilterOptions = {
  completed?: boolean;
  title?: string;
  userId?: number | null;
  status?: boolean;
};
