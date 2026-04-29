import Notename from "./Notename";

export default function AnswerOptions({
  answerOptions,
  handleAnswers,
  buttonState,
}) {
  return (
    <div className="answers-div">
      <ul className="questions flex flex-col gap-2">
        {answerOptions.map((answer, index) => (
          <Notename
            key={answer}
            id={index}
            answer={answer}
            handleAnswers={handleAnswers}
            buttonState={buttonState}
          />
        ))}
      </ul>
    </div>
  );
}
