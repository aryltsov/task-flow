import { v4 as uuidv4 } from 'uuid';
import type { Task } from '../utils/types.ts';

export const INITIAL_TASKS: Task[] = [
  // ===========================
  // BACKLOG
  // ===========================
  {
    id: uuidv4(),
    title: 'Set up logging system, add notification center, onboarding flow',
    description: 'Configure Winston logger and add HTTP request logging. Configure Winston logger and add HTTP request logging.',
    priority: 'medium',
    assignee: { name: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
    dueDate: '2025-12-15',
    status: 'backlog',
  },
  {
    id: uuidv4(),
    title: 'Add notification center',
    description: 'Implement inbox-style notification feed inside UI.',
    priority: 'low',
    assignee: { name: 'Emma Thompson', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
    dueDate: '2025-12-20',
    status: 'backlog',
  },
  {
    id: uuidv4(),
    title: 'Design onboarding flow',
    description: 'Create interactive onboarding screens for new users.',
    priority: 'high',
    assignee: { name: 'Daniel Green', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
    dueDate: '2025-12-18',
    status: 'backlog',
  },
  {
    id: uuidv4(),
    title: 'Create analytics dashboard',
    description: 'Add charts with weekly and monthly activity overview.',
    priority: 'urgent',
    assignee: { name: 'Sophia Miller', avatarUrl: 'https://i.pravatar.cc/150?img=4' },
    dueDate: '2025-12-10',
    status: 'backlog',
  },

  // ===========================
  // TODO
  // ===========================
  {
    id: uuidv4(),
    title: 'Implement email verification',
    description: 'Send verification email after registration.',
    priority: 'medium',
    assignee: { name: 'Liam Carter', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    dueDate: '2025-12-08',
    status: 'todo',
  },
  {
    id: uuidv4(),
    title: 'Create user settings page',
    description: 'Allow editing profile, password, and notifications.',
    priority: 'high',
    assignee: { name: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
    dueDate: '2025-12-12',
    status: 'todo',
  },
  {
    id: uuidv4(),
    title: 'Migrate components to TypeScript',
    description: 'Convert remaining .jsx files to .tsx.',
    priority: 'medium',
    assignee: { name: 'Emma Thompson', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
    dueDate: '2025-12-14',
    status: 'todo',
  },
  {
    id: uuidv4(),
    title: 'Setup unit test coverage',
    description: 'Configure Jest and add coverage thresholds.',
    priority: 'low',
    assignee: { name: 'Daniel Green', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
    dueDate: '2025-12-16',
    status: 'todo',
  },

  // ===========================
  // IN PROGRESS
  // ===========================
  {
    id: uuidv4(),
    title: 'Improve performance in dashboard',
    description: 'Use memo and virtualization for large lists.',
    priority: 'high',
    assignee: { name: 'Sophia Miller', avatarUrl: 'https://i.pravatar.cc/150?img=4' },
    dueDate: '2025-11-30',
    status: 'progress',
  },
  {
    id: uuidv4(),
    title: 'Integrate DnD Kit sorting',
    description: 'Enable task dragging between board sections.',
    priority: 'urgent',
    assignee: { name: 'Liam Carter', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    dueDate: '2025-12-02',
    status: 'progress',
  },
  {
    id: uuidv4(),
    title: 'Refactor authentication module',
    description: 'Clean up context logic and add token refresh.',
    priority: 'medium',
    assignee: { name: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
    dueDate: '2025-12-03',
    status: 'progress',
  },
  {
    id: uuidv4(),
    title: 'Develop task filtering',
    description: 'Add filters by priority, due date, and status.',
    priority: 'high',
    assignee: { name: 'Emma Thompson', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
    dueDate: '2025-12-01',
    status: 'progress',
  },

  // ===========================
  // DONE
  // ===========================
  {
    id: uuidv4(),
    title: 'Add global loading spinner',
    description: 'Create reusable loading indicator using DaisyUI.',
    priority: 'low',
    assignee: { name: 'Daniel Green', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
    dueDate: '2025-11-20',
    status: 'done',
  },
  {
    id: uuidv4(),
    title: 'Fix mobile layout bugs',
    description: 'Adjust spacing and grid layout for iPhone Safari.',
    priority: 'urgent',
    assignee: { name: 'Sophia Miller', avatarUrl: 'https://i.pravatar.cc/150?img=4' },
    dueDate: '2025-11-22',
    status: 'done',
  },
  {
    id: uuidv4(),
    title: 'Implement dark/light theme switcher',
    description: 'Use Tailwind theme toggling and persistence.',
    priority: 'medium',
    assignee: { name: 'Liam Carter', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    dueDate: '2025-11-18',
    status: 'done',
  },
  {
    id: uuidv4(),
    title: 'Add avatars to task cards',
    description: 'Implement Avatar component and caching.',
    priority: 'low',
    assignee: { name: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
    dueDate: '2025-11-15',
    status: 'done',
  },

  // ===========================
  // BLOCKED
  // ===========================
  {
    id: uuidv4(),
    title: 'Integrate payment gateway',
    description: 'Stripe integration pending company approval.',
    priority: 'high',
    assignee: { name: 'Emma Thompson', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
    dueDate: '2025-12-22',
    status: 'blocked',
  },
  {
    id: uuidv4(),
    title: 'Add AI suggestions module',
    description: 'Waiting for API quota upgrade.',
    priority: 'medium',
    assignee: { name: 'Daniel Green', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
    dueDate: '2025-12-19',
    status: 'blocked',
  },
  {
    id: uuidv4(),
    title: 'Create export to PDF feature',
    description: 'Blocked by legal decision about document format.',
    priority: 'low',
    assignee: { name: 'Sophia Miller', avatarUrl: 'https://i.pravatar.cc/150?img=4' },
    dueDate: '2025-12-30',
    status: 'blocked',
  },
  {
    id: uuidv4(),
    title: 'Implement webhooks system',
    description: 'Backend API not ready yet.',
    priority: 'urgent',
    assignee: { name: 'Liam Carter', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    dueDate: '2025-12-25',
    status: 'blocked',
  },
];
