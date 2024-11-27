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
  completed: boolean | null;
  title: string | null;
  userId: string | null;
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
  activeFilters: {
    completed: boolean | null;
    title: string | null;
    userId: string | null;
  };
};

type value = string | number | boolean | null;

export type renderFilterType = {
  label: string;
  name: string;
  type: string;
  value: value;
  options?: {}[] | undefined;
  onChange: (e: unknown) => void;
};

export type initialState = {
  completed?: boolean | null;
  title?: string | null;
  userId?: number | null;
};
