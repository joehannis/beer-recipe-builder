import Selector from './components/selector';

function App() {
  return (
    // Main App Container
    <div className='size-full flex-col '>
      {/* Header */}
      <h1 className='flex h-20 flex-row items-center justify-center text-3xl font-bold text-red-600 underline'>
        Beer Recipe Creator
      </h1>
      {/* Body */}
      <div className='flex flex-row items-center justify-start'>
        {/* Malt character 1 */}
        <div className='flex flex-col'>
          <div className='flex justify-center rounded-none border-2 border-solid border-black'>
            <Selector name='Dark' />
          </div>
          <div className='flex justify-center rounded-none border-2 border-solid border-black'>
            <Selector name='Malt Forward' />
          </div>
          <div className='flex justify-center rounded-none border-2 border-solid border-black'>
            <Selector name='Hoppy' />
          </div>
          <div className='flex justify-center rounded-none border-2 border-solid border-black'>
            <Selector name='Full-Bodied' />
          </div>
        </div>
        {/* Malt character 2 */}
        <div className='flex flex-col'>
          <div className='flex justify-center rounded-none border-2 border-solid border-black'>
            <Selector name='Light' />
          </div>
          <div className='flex justify-center rounded-none border-2 border-solid border-black'>
            <Selector name='Malt Light' />
          </div>
          <div className='flex justify-center rounded-none border-2 border-solid border-black'>
            <Selector name='Balanced' />
          </div>
          <div className='flex justify-center rounded-none border-2 border-solid border-black'>
            <Selector name='Light-Bodied' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
