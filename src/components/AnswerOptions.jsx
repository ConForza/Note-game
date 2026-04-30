import Notename from "./Notename";

export default function AnswerOptions({
  answerOptions,
  handleAnswerSelect,
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
            handleAnswerSelect={handleAnswerSelect}
            buttonState={buttonState}
          />
        ))}
      </ul>
    </div>
  );
}
