import { useState, useEffect } from "react";

export default function QuestionTimer({ timeLimit, onTimeout, buttonState }) {
  const [remainingTime, setRemainingTime] = useState(timeLimit);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeLimit);

    return () => {
      clearTimeout(timer);
    };
  }, [timeLimit, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      className="w-full h-2 rounded-full overflow-hidden 
             [appearance:none] bg-gray-200 dark:bg-neutral-700 
             [&::-webkit-progress-bar]:bg-gray-200 dark:[&::-webkit-progress-bar]:bg-neutral-700 
             [&::-webkit-progress-value]:bg-blue-600 [&::-webkit-progress-value]:rounded-full 
             [&::-moz-progress-bar]:bg-blue-600
             transition-opacity duration-300"
      max={timeLimit}
      value={remainingTime}
      style={{
        visibility: buttonState["status"] === "disabled" ? "hidden" : "visible",
      }}
    />
  );
}
