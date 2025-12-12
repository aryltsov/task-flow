export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Status = 'todo' | 'in-progress' | 'in-review' | 'done' | 'blocked';

export type Assignee = {
  name: string;
  avatarUrl?: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  priority?: Priority;
  status: Status;
  assignee?: Assignee | null;
  dueDate?: string;
};

export type TaskCardProps = {
  id?: string;
  title: string;
  description?: string;
  priority?: Priority;
  status?: Status;
  assignee?: Assignee | null;
  dueDate?: string;
  onStatusChange?: (id: string | undefined, status: Status) => void;
  onClick?: (id: string | undefined) => void;
};
