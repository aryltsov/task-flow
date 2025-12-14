export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Status = 'backlog' | 'todo' | 'progress' | 'done' | 'blocked';

export type Assignee = {
  id: string;
  name: string;
  avatarUrl?: string;
};

type Creator = Assignee;

export type BoardSections = {
  [name: string]: Task[];
};

export type Task = {
  id: string;
  creator: Creator;
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
