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

export type RenderFilterType = {
  label?: string;
  name: string;
  type: string;
  value: string | number | boolean | null;
  options?: Record<string, string>[];
  onChange: (e: any) => void;
};

export type FilterOptions = {
  completed: boolean | null;
  title: string | null;
  userId: number | null;
};
