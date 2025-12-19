import AssigneeInfo from '@components/assignee-info.tsx';
import DueDate from '@components/date.tsx';
import type { Comment } from '@models/comment.interface';

type TaskCommentsProps = {
  comments?: Comment[];
};

export default function TaskComments({ comments }: TaskCommentsProps) {
  return (
    <div className='mt-6'>
      <h3 className='font-semibold mb-2'>Comments</h3>

      <div className='max-h-48 overflow-y-auto space-y-3 p-2 border rounded-lg'>
        {comments?.map((c) => (
          <div key={c.id} className='p-3 rounded shadow-sm'>
            <div className='flex justify-between text-sm text-gray-500 mb-1'>
              <AssigneeInfo assignee={c.author} />
              <DueDate date={c.date} />
            </div>

            <p className='text-gray-700 mt-2'>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
