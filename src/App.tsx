function App() {
  return (
    // Main App Container
    <div className='size-full flex-col '>
      {/* Header */}
      <h1 className='flex flex-row items-center justify-center text-3xl font-bold text-red-600 underline'>
        React Typescript Template
      </h1>
      {/* Body */}
      <div className='flex flex-row items-center justify-center'>
        <p className='text-lg font-semibold text-blue-600'>Hello World!</p>
      </div>
    </div>
  );
}

export default App;
