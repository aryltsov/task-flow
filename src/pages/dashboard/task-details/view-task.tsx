import type { Task } from '../../../utils/types.ts';
import PriorityBadge from '../../../components/priority-badge.tsx';
import StatusBadge from '../../../components/status-badge.tsx';
import AssigneeInfo from '../../../components/assignee-info.tsx';
import DueDate from '../../../components/date.tsx';
import TaskComments from './task-comments.tsx';

type TaskViewProps = {
  task: Task;
  comments: any[];
  onClose: () => void;
};

export default function ViewTask({ task, comments, onClose }: TaskViewProps) {
  return (
    <div className='w-full max-w-lg mx-auto'>
      <h2 className='text-2xl font-bold mb-2'>{task.title}</h2>

      <p className='text-gray-700 mb-4'>{task.description || '-'}</p>

      <div className='grid grid-cols-2 gap-4 mb-4'>
        <PriorityBadge priority={task.priority} />
        <StatusBadge status={task.status} />
      </div>

      <div className='grid grid-cols-2 gap-4 text-gray-700 mb-4'>
        <AssigneeInfo assignee={task.assignee} />
        <DueDate date={task.dueDate} />
      </div>

      <TaskComments comments={comments} />

      <div className='flex justify-end mt-5'>
        <button className='btn btn-neutral' onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
