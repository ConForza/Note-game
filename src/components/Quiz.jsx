import Notename from "./Notename";
import QuestionTimer from "./QuestionTimer";

export default function Quiz({
  answerOptions,
  chosenNote,
  handleAnswers,
  buttonState,
  timeLimit,
  onTimeout,
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <QuestionTimer
          onTimeout={onTimeout}
          key={answerOptions}
          timeLimit={timeLimit}
          buttonState={buttonState}
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row justify-center h-45">
          <img
            className="rounded-lg self-center"
            src={`/${chosenNote.type}-${chosenNote.id}.png`}
          ></img>
        </div>
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
    </div>
  );
}
