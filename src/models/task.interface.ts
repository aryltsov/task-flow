import type { Assignee, Creator } from '@models/creator.ts';
import type { Comment } from '@models/comment.interface.ts';

export interface Task {
  id: string;
  projectId: string;
  creator: Creator;
  title: string;
  description?: string;
  priority?: string;
  status: string;
  assignee: Assignee | null;
  dueDate?: Date;
  comments: Comment[];
  sortIndex?: number;
}
