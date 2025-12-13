export default function ErrorFallback() {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-full p-8'>
      <h1 className='text-2xl font-bold text-red-600 mb-4'>Что-то пошло не так</h1>
      <p className='text-gray-700 mb-2'>Произошла непредвиденная ошибка приложения.</p>
      <p className='text-gray-500 text-sm'>Попробуйте обновить страницу или вернуться на главную.</p>
    </div>
  );
}
