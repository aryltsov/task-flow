// components/UserCombobox.tsx
import { useState, useMemo } from 'react';
import { Combobox } from '@headlessui/react';
import type { User } from '@models/user.interface';

interface UserComboboxProps {
  users: User[];
  value: string;
  onChange: (id: string) => void;
  placeholder?: string;
  className?: string;
}

export function UserCombobox({ users, value, onChange, placeholder = 'Select user...', className }: UserComboboxProps) {
  const [query, setQuery] = useState('');
  const filteredUsers = useMemo(() => (query ? users.filter((u) => u.name!.toLowerCase().includes(query.toLowerCase())) : users), [query, users]);
  const selectedUser = users.find((u) => u.id === value) || null;

  return (
    <Combobox value={selectedUser} onChange={(user) => onChange(user?.id || '')}>
      <div className={`relative ${className || 'w-full'}`}>
        <Combobox.Input
          className='input input-bordered w-full'
          placeholder={placeholder}
          displayValue={(user: any) => user?.name || ''}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-100 shadow-lg z-10'>
          <Combobox.Option key='' value={null}>
            {({ active }) => <div className={`cursor-pointer select-none p-2 ${active ? 'bg-primary text-primary-content' : ''}`}>All users</div>}
          </Combobox.Option>
          {filteredUsers.map((u) => (
            <Combobox.Option key={u.id} value={u}>
              {({ active }) => <div className={`cursor-pointer select-none p-2 ${active ? 'bg-primary text-primary-content' : ''}`}>{u.name}</div>}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
