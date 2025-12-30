import { useEffect, useState } from 'react';
import { useBoardStore } from '@stores/board.store';
import { useUsersStore } from '@stores/users.store';
import { useDebouncedEffect } from '@hooks/use-debounced-effect';
import { UserCombobox } from '@components/user-combobox.tsx';

export default function TaskFilter() {
  const setTaskFilters = useBoardStore((s) => s.setTaskFilters);
  const { users, fetchUsers } = useUsersStore();

  const [search, setSearch] = useState('');
  const [assigneeId, setAssigneeId] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useDebouncedEffect(() => {
    setTaskFilters({ search: search || undefined });
  }, [search]);

  useEffect(() => {
    setTaskFilters({ assigneeId: assigneeId || undefined });
  }, [assigneeId, setTaskFilters]);

  return (
    <div className='flex gap-3'>
      <input className='input input-bordered w-64' placeholder='Search tasks...' value={search} onChange={(e) => setSearch(e.target.value)} />
      <UserCombobox users={users} value={assigneeId} onChange={setAssigneeId} placeholder='Select assignee...' className='w-64' />
    </div>
  );
}
