import PriorityBadge from '@components/priority-badge';
import StatusBadge from '@components/status-badge.tsx';
import AssigneeInfo from '@components/assignee-info.tsx';
import DueDate from '@components/date.tsx';
import TaskComments from './task-comments.tsx';
import type { Task } from '@models/task.interface.ts';

type TaskViewProps = {
  task: Task;
  onClose: () => void;
};

export default function ViewTask({ task, onClose }: TaskViewProps) {
  return (
    <div className='w-full max-w-lg mx-auto'>
      <h2 className='text-2xl font-bold text-gray-800 mb-2'>{task.title}</h2>

      <p className='text-gray-600 mb-6'>{task.description || 'No description provided.'}</p>

      <div className='grid grid-cols-2 gap-4 mb-6'>
        <div className='flex flex-col'>
          <span className='text-gray-500 text-sm mb-1'>Assignee</span>
          <AssigneeInfo assignee={task.assignee} />
        </div>
        <div className='flex flex-col'>
          <span className='text-gray-500 text-sm mb-1'>Author</span>
          <AssigneeInfo assignee={task.creator} />
        </div>
        <div className='flex flex-col'>
          <span className='text-gray-500 text-sm mb-1'>Priority</span>
          <PriorityBadge priority={task.priority} />
        </div>
        <div className='flex flex-col'>
          <span className='text-gray-500 text-sm mb-1'>Status</span>
          <StatusBadge status={task.status} />
        </div>
        <div className='flex flex-col col-span-2'>
          <span className='text-gray-500 text-sm mb-1'>Due Date</span>
          <DueDate date={task.dueDate} />
        </div>
      </div>

      <div className='mb-6'>
        <TaskComments comments={task.comments} />
      </div>

      <div className='flex justify-end'>
        <button className='px-4 py-2 btn btn-neutral' onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
