import type { Task } from '../utils/types.ts';

export const INITIAL_TASKS: Task[] = [
  // ===========================
  // BACKLOG
  // ===========================
  {
    id: 'a1b2c3d4-1111-4444-8888-000000000001',
    title: 'Set up logging system, add notification center, onboarding flow',
    description: 'Configure Winston logger and add HTTP request logging.',
    priority: 'medium',
    assignee: { id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', name: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
    creator: { id: 'a1b2c3d4-1111-4444-8888-000000000111', name: 'Ryltsov Anton', avatarUrl: '' },
    dueDate: '2025-12-15',
    status: 'backlog',
  },
  {
    id: 'a1b2c3d4-1111-4444-8888-000000000002',
    title: 'Add notification center',
    description: 'Implement inbox-style notification feed inside UI.',
    priority: 'low',
    assignee: { id: '1c6b147e-0c66-4de8-b5a1-3b3490ed6d14', name: 'Emma Thompson', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
    creator: { id: 'a1b2c3d4-1111-4444-8888-000000000111', name: 'Ryltsov Anton', avatarUrl: '' },
    dueDate: '2025-12-20',
    status: 'backlog',
  },
  {
    id: 'a1b2c3d4-1111-4444-8888-000000000003',
    title: 'Design onboarding flow',
    description: 'Create interactive onboarding screens for new users.',
    priority: 'high',
    assignee: { id: 'b1a7d7c8-fb66-4fa7-9b3a-2f38490b3f6c', name: 'Daniel Green', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
    creator: { id: 'a1b2c3d4-1111-4444-8888-000000000111', name: 'Ryltsov Anton', avatarUrl: '' },
    dueDate: '2025-12-18',
    status: 'backlog',
  },

  // ===========================
  // TODO
  // ===========================
  {
    id: 'a1b2c3d4-2222-4444-8888-000000000005',
    title: 'Implement email verification',
    description: 'Send verification email after registration.',
    priority: 'medium',
    assignee: { id: '7c9e6679-7425-40de-944b-e07fc1f90ae7', name: 'Liam Carter', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    creator: { id: '2a1c3d7f-e8d6-4ece-b2f2-12b6c91c8bfa', name: 'Eve Creator', avatarUrl: 'https://i.pravatar.cc/150?img=14' },
    dueDate: '2025-12-08',
    status: 'todo',
  },
  {
    id: 'a1b2c3d4-2222-4444-8888-000000000006',
    title: 'Create user settings page',
    description: 'Allow editing profile, password, and notifications.',
    priority: 'high',
    assignee: { id: '9a4d8f48-3c28-4d92-8bfa-5d9e0d4bf7f3', name: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
    creator: { id: '92f7d6ab-6882-4f08-8a3d-117c2e0d1a56', name: 'Frank Creator', avatarUrl: 'https://i.pravatar.cc/150?img=15' },
    dueDate: '2025-12-12',
    status: 'todo',
  },

  // ===========================
  // IN PROGRESS
  // ===========================
  {
    id: 'a1b2c3d4-3333-4444-8888-000000000009',
    title: 'Improve performance in dashboard',
    description: 'Use memo and virtualization for large lists.',
    priority: 'high',
    assignee: { id: 'f5c8b0e0-5c1b-4c48-9c06-3d4a61e2b8a7', name: 'Sophia Miller', avatarUrl: 'https://i.pravatar.cc/150?img=4' },
    creator: { id: 'e3b0c442-98fc-1c14-9afb-4c6b8f2b5b7d', name: 'Ivy Creator', avatarUrl: 'https://i.pravatar.cc/150?img=18' },
    dueDate: '2025-11-30',
    status: 'progress',
  },

  // ===========================
  // DONE
  // ===========================
  {
    id: 'a1b2c3d4-4444-4444-8888-000000000013',
    title: 'Add global loading spinner',
    description: 'Create reusable loading indicator using DaisyUI.',
    priority: 'low',
    assignee: { id: '4509d5a2-361b-4c23-8afb-a0659a9b1bc1', name: 'Daniel Green', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
    creator: { id: 'a381821b-8b6e-4df9-b295-b2e6e4bf26ad', name: 'Mia Creator', avatarUrl: 'https://i.pravatar.cc/150?img=22' },
    dueDate: '2025-11-20',
    status: 'done',
  },
  {
    id: 'a1b2c3d4-4444-4444-8888-000000000014',
    title: 'Fix mobile layout bugs',
    description: 'Adjust spacing and grid layout for iPhone Safari.',
    priority: 'urgent',
    assignee: { id: 'f5c8b0e0-5c1b-4c48-9c06-3d4a61e2b8a7', name: 'Sophia Miller', avatarUrl: 'https://i.pravatar.cc/150?img=4' },
    creator: { id: 'e3b0c442-98fc-1c14-9afb-4c6b8f2b5b7d', name: 'Nina Creator', avatarUrl: 'https://i.pravatar.cc/150?img=23' },
    dueDate: '2025-11-22',
    status: 'done',
  },
  {
    id: 'a1b2c3d4-4444-4444-8888-000000000015',
    title: 'Implement dark/light theme switcher',
    description: 'Use Tailwind theme toggling and persistence.',
    priority: 'medium',
    assignee: { id: '0f8fad5b-d9cb-469f-a165-70867728950e', name: 'Liam Carter', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    creator: { id: '7d444840-9dc0-11d1-b245-5ffdce74fad2', name: 'Oscar Creator', avatarUrl: 'https://i.pravatar.cc/150?img=24' },
    dueDate: '2025-11-18',
    status: 'done',
  },
  {
    id: 'a1b2c3d4-4444-4444-8888-000000000016',
    title: 'Add avatars to task cards',
    description: 'Implement Avatar component and caching.',
    priority: 'low',
    assignee: { id: '16fd2706-8baf-433b-82eb-8c7fada847da', name: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
    creator: { id: '550e8400-e29b-41d4-a716-446655440000', name: 'Paula Creator', avatarUrl: 'https://i.pravatar.cc/150?img=25' },
    dueDate: '2025-11-15',
    status: 'done',
  },

  // ===========================
  // BLOCKED
  // ===========================
  {
    id: 'a1b2c3d4-5555-4444-8888-000000000017',
    title: 'Integrate payment gateway',
    description: 'Stripe integration pending company approval.',
    priority: 'high',
    assignee: { id: '3ddc4bac-f7a8-4dbb-9b82-fa2f7fb9cfa2', name: 'Emma Thompson', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
    creator: { id: '74f3e341-84b1-4b79-b3c2-9edc99acc3bd', name: 'Quentin Creator', avatarUrl: 'https://i.pravatar.cc/150?img=26' },
    dueDate: '2025-12-22',
    status: 'blocked',
  },
  {
    id: 'a1b2c3d4-5555-4444-8888-000000000018',
    title: 'Add AI suggestions module',
    description: 'Waiting for API quota upgrade.',
    priority: 'medium',
    assignee: { id: '4509d5a2-361b-4c23-8afb-a0659a9b1bc1', name: 'Daniel Green', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
    creator: { id: 'a381821b-8b6e-4df9-b295-b2e6e4bf26ad', name: 'Rita Creator', avatarUrl: 'https://i.pravatar.cc/150?img=27' },
    dueDate: '2025-12-19',
    status: 'blocked',
  },
];
