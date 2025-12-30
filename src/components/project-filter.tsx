import { useEffect, useState } from 'react';
import { useBoardStore } from '@stores/board.store';
import { useUsersStore } from '@stores/users.store';
import type { ProjectStatus } from '@models/project-filters.interface';
import { UserCombobox } from '@components/user-combobox';

export default function ProjectFilter() {
  const setProjectFilters = useBoardStore((s) => s.setProjectFilters);
  const { users, fetchUsers } = useUsersStore();

  const [status, setStatus] = useState<ProjectStatus | ''>('');
  const [creatorId, setCreatorId] = useState('');

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('ProjectFilter: useEffect fetchUsers called');
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setProjectFilters({ status: status || undefined });
  }, [status]);

  useEffect(() => {
    setProjectFilters({ creatorId: creatorId || undefined });
  }, [creatorId]);

  return (
    <div className='flex gap-3'>
      <select className='select select-bordered w-48' value={status} onChange={(e) => setStatus(e.target.value as ProjectStatus | '')}>
        <option value=''>All statuses</option>
        <option value='active'>Active</option>
        <option value='archived'>Archived</option>
      </select>

      <UserCombobox users={users} value={creatorId} onChange={setCreatorId} placeholder='Select creator...' className='w-56' />
    </div>
  );
}
