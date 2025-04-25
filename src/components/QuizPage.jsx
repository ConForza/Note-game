import { useState, useEffect, useCallback } from "react";
import Quiz from "./Quiz";
import Gameover from "./Gameover";
import { NOTES } from "../Notes";
import RestartBtn from "./RestartBtn";

const LETTERS = ["A", "B", "C", "D", "E", "F", "G"];

function noteShuffler(notes) {
  let shuffledNotes = notes
    .map((note) => ({ note, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ note }) => note);

  return shuffledNotes;
}

function QuizPage({ noteSettings, handleRestartQuiz }) {
  const [noteList, setNoteList] = useState(NOTES);
  const [chosenNote, setChosenNote] = useState({});
  const [answerOptions, setAnswerOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [buttonState, setButtonState] = useState({});

  function initializeNotes() {
    setButtonState({
      status: "enabled",
      states: { 0: "", 1: "", 2: "", 3: "" },
    });
    let finalNotes;
    if (noteSettings.mode === "all") {
      if (noteSettings.difficulty === "1") {
        finalNotes = noteList.filter((note) => note.difficulty === "1");
      } else {
        finalNotes = noteList;
      }
    } else {
      if (noteSettings.difficulty === "1") {
        finalNotes = noteList.filter(
          (note) => note.type === noteSettings.mode && note.difficulty === "1"
        );
      } else {
        finalNotes = noteList.filter((note) => note.type === noteSettings.mode);
      }
    }

    const shuffledNoteList = noteShuffler(finalNotes);
    const selectedNote = shuffledNoteList[0];
    setChosenNote(selectedNote);
    const remainingLetters = LETTERS.filter(
      (letter) => letter != selectedNote.name
    ).slice(0, 3);
    let shuffledLetters = noteShuffler([
      ...remainingLetters,
      selectedNote.name,
    ]);
    setAnswerOptions(noteShuffler(shuffledLetters));
    setNoteList(finalNotes.filter((note) => note.id != selectedNote.id));
  }

  const handleAnswers = useCallback(function handleAnswers(e) {
    let isAnswerCorrect = null;
    const correctAnswerIndex = answerOptions.findIndex(
      (noteName) => noteName === chosenNote.name
    );
    if (e === null) {
      setButtonState((prevState) => ({
        ...prevState,
        status: "disabled",
        states: {
          ...prevState.states,
          [correctAnswerIndex]: "highlight-answer",
        },
      }));
    } else {
      const answer = e.target;
      const answerId = answer.id;
      answer.innerText === chosenNote.name
        ? (isAnswerCorrect = true)
        : (isAnswerCorrect = false);

      if (isAnswerCorrect) {
        setButtonState((prevState) => ({
          ...prevState,
          status: "disabled",
          states: {
            ...prevState.states,
            [correctAnswerIndex]: "correct-answer",
          },
        }));
      } else {
        setButtonState((prevState) => ({
          ...prevState,
          status: "disabled",
          states: {
            ...prevState.states,
            [answerId]: "incorrect-answer",
            [correctAnswerIndex]: "highlight-answer",
          },
        }));
      }
    }

    const timer = setTimeout(() => {
      setAnswers((prevAnswers) => [...prevAnswers, isAnswerCorrect]);

      if (answers.length + 1 === parseInt(noteSettings.noOfQuestions)) {
        setQuizComplete(true);
      } else {
        initializeNotes();
      }
    }, 1500);

    return () => clearTimeout(timer);
  });

  const handleSkipAnswer = useCallback(
    () => handleAnswers(null),
    [handleAnswers]
  );

  useEffect(() => {
    initializeNotes();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="w-auto text-center">
        <h1 className="mb-2 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
          Note Game
        </h1>
      </div>
      <div className="quiz flex flex-col gap-3">
        {quizComplete ? (
          <>
            <Gameover
              answers={answers}
              noteSettings={noteSettings}
              handleRestartQuiz={handleRestartQuiz}
            />
          </>
        ) : (
          <div className="quiz flex flex-col gap-3">
            <Quiz
              answerOptions={answerOptions}
              chosenNote={chosenNote}
              handleAnswers={handleAnswers}
              buttonState={buttonState}
              timeLimit={parseInt(noteSettings.timeLimit)}
              onTimeout={handleSkipAnswer}
            />
            <div className="flex flex-row justify-end">
              <RestartBtn handleRestart={handleRestartQuiz}>Quit</RestartBtn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
