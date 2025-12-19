import { Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from './task-card';
import type { Task } from '@models/task.interface.ts';

type BoardSectionProps = {
  id: string;
  title: string;
  tasks: Task[];
};

const Column = ({ id, title, tasks }: BoardSectionProps) => {
  return (
    <div className='flex flex-col bg-base-200 rounded-md p-3 gap-3 w-[390px] min-h-[calc(100vh-110px)]'>
      <div className='flex items-center justify-between mb-1'>
        <h4 className='font-semibold'>{title}</h4>
        <span className='text-sm text-muted'>{tasks.length}</span>
      </div>

      <Droppable droppableId={id} type='TASK'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className='flex flex-col gap-2'>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <TaskCard {...task} />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
