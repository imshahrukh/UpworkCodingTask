import { useMemo, useState } from 'react';
import { TaskDoc } from '../db/schema';
import { filterTasks, sortTasks } from '../utils/taskHelpers';

export type FilterType = 'all' | 'blocked' | 'completed' | 'in-progress';
export type SortType = 'title' | 'created' | 'status';

export const useTaskFiltering = (tasks: TaskDoc[]) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('created');

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filter);
    return sortTasks(filtered, sortBy);
  }, [tasks, filter, sortBy]);

  return {
    filter,
    setFilter,
    sortBy,
    setSortBy,
    filteredAndSortedTasks
  };
};

