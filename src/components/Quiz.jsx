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
        <div>
          <QuestionTimer
            key={answerOptions}
            onTimeout={onTimeout}
            timeLimit={timeLimit}
            buttonState={buttonState}
          />
        </div>
      </div>
      <div className="question-div flex flex-col gap-10">
        <div className="note-img flex flex-row justify-center h-50 bg-white rounded-lg">
          <img
            className="self-center"
            src={`./${chosenNote.type}-${chosenNote.id}.png`}
          ></img>
        </div>
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
      </div>
    </div>
  );
}
