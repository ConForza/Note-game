import { useState, useEffect, useCallback, useRef } from "react";
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

function QuizPage({
  noteSettings,
  handleRestartQuiz,
  handleHighScore,
  highScore,
}) {
  const [noteList, setNoteList] = useState(NOTES);
  const [chosenNote, setChosenNote] = useState({});
  const [answerOptions, setAnswerOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [buttonState, setButtonState] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [responseTimes, setResponseTimes] = useState([]);
  const prevHighScore = useRef();

  function initializeNotes() {
    prevHighScore.current = highScore;
    setStartTime(Date.now());
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
    if (finalNotes.length > 1) {
      setNoteList(finalNotes.filter((note) => note.id != selectedNote.id));
    } else {
      setNoteList(NOTES.filter((note) => note.id != selectedNote.id));
    }
  }

  const handleAnswers = useCallback(function handleAnswers(e) {
    const answerTime = Date.now() - startTime;
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
        setResponseTimes((prevResponseTimes) => [
          ...prevResponseTimes,
          answerTime,
        ]);
        setButtonState((prevState) => ({
          ...prevState,
          status: "disabled",
          states: {
            ...prevState.states,
            [correctAnswerIndex]: "correct-answer",
          },
        }));
      } else {
        setResponseTimes((prevResponseTimes) => [
          ...prevResponseTimes,
          parseInt(noteSettings.timeLimit),
        ]);
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

  const handleSkipAnswer = useCallback(() => {
    setResponseTimes((prevResponseTimes) => [
      ...prevResponseTimes,
      parseInt(noteSettings.timeLimit),
    ]);
    handleAnswers(null);
  }, [handleAnswers]);

  function calculateScore() {
    let timeMultiplier = 0;
    const timeLimit = parseInt(noteSettings.timeLimit);
    switch (timeLimit) {
      case 10000:
        timeMultiplier = 1000;
        break;
      case 5000:
        timeMultiplier = 10000;
        break;
      case 2500:
        timeMultiplier = 100000;
    }
    const noOfQuestions = parseInt(noteSettings.noOfQuestions);
    const sumResponse = responseTimes.reduce(
      (total, current) => total + (timeLimit - current),
      0
    );
    const avgResponse =
      (sumResponse / (noOfQuestions * timeLimit)) * timeMultiplier;
    const finalScore = Math.floor(avgResponse * noteSettings.difficulty);

    handleHighScore(finalScore);

    return finalScore;
  }

  useEffect(() => {
    initializeNotes();
  }, []);

  return (
    <div className="flex flex-col w-full">
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
              calculateScore={calculateScore}
              highScore={highScore}
              handleHighScore={handleHighScore}
              prevHighScore={prevHighScore}
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
