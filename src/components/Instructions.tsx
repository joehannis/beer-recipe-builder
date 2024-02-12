interface InstructionsProps {
  recipe: {
    ingredients: { ingredient: string; amount: string }[];
    instructions: string[];
  };
}

const Instructions: React.FC<InstructionsProps> = ({ recipe }) => {
  return (
    <>
      <div className='mt-5 flex max-h-fit max-w-80 flex-col flex-wrap'>
        <h3 className='flex content-center items-center justify-center text-lg font-bold'>
          Instructions
        </h3>
        {recipe &&
          recipe.instructions &&
          recipe.instructions.map((instruction, index) => (
            <div
              key={index}
              className='flex flex-col flex-wrap'
              dangerouslySetInnerHTML={{ __html: `${instruction}<br/><br/>` }}
            ></div>
          ))}
      </div>
    </>
  );
};

export default Instructions;
