type TaskEditProps = {
  extended: boolean;
  onEdit: (res: any) => void;
  onClose: () => void;
};

export default function ModalButtons({ extended, onEdit, onClose }: TaskEditProps) {
  return (
    <div className='flex justify-end mt-8'>
      {extended && (
        <>
          <button className='px-4 py-2 btn btn-error mr-2' disabled={true}>
            Delete
          </button>
          <button className='px-4 py-2 btn btn-info mr-2' onClick={onEdit}>
            Edit
          </button>
        </>
      )}
      <button className='px-4 py-2 btn btn-neutral' onClick={onClose}>
        Close
      </button>
    </div>
  );
}
