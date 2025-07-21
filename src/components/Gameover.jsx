import RestartBtn from "./RestartBtn";

export default function Gameover({
  answers,
  noteSettings,
  handleRestartQuiz,
  calculateScore,
  highScore,
  prevHighScore,
}) {
  const score = calculateScore();

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-gray-600 dark:text-neutral-100 mt-2 mb-8">
        Game Over
      </h2>
      <h4 className="text-xl text-center text-gray-700 dark:text-neutral-200 mb-6">
        {`You got ${
          answers.filter((isAnswerCorrect) => isAnswerCorrect).length
        } of ${noteSettings.noOfQuestions} questions correct`}
      </h4>
      <p className="text-center font-bold">Your Score: {score}</p>
      <p className="text-center">Highest Score: {highScore}</p>
      {score > prevHighScore.current && (
        <h1 className="text-3xl font-bold text-center text-red-600 mt-4 mb-4">
          NEW HIGH SCORE
        </h1>
      )}
      <div className="flex flex-row justify-end">
        <RestartBtn handleRestart={handleRestartQuiz}>Try again</RestartBtn>
      </div>
    </div>
  );
}
