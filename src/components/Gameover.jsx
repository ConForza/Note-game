import RestartBtn from "./RestartBtn";

export default function Gameover({ answers, noteSettings, handleRestartQuiz }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-gray-600 mb-4">
        Game Over
      </h2>
      <h4 className="text-xl text-center text-gray-700 mb-6">
        {`You got ${
          answers.filter((isAnswerCorrect) => isAnswerCorrect === true).length
        }/${noteSettings.noOfQuestions} questions correct`}
      </h4>
      <div className="flex flex-row justify-end">
        <RestartBtn handleRestart={handleRestartQuiz}>Try again</RestartBtn>
      </div>
    </div>
  );
}
