import { useState } from "react";
import QuizPage from "./components/QuizPage";
import Settings from "./components/Settings";

function App() {
  const [route, setRoute] = useState("menu");
  const [noteSettings, setNoteSettings] = useState({
    mode: "treble",
    difficulty: "1",
    noOfQuestions: "5",
    timeLimit: "1000000",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleRoute(route) {
    setRoute(route);
  }

  function handleSettingsChange(event) {
    setNoteSettings((prevSettings) => ({
      ...prevSettings,
      [event.target.name]: event.target.value,
    }));
  }

  function handleDarkMode(event) {
    setIsDarkMode(event.target.checked);
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="h-dvh w-dvw bg-orange-100 dark:bg-neutral-900 text-gray-900 dark:text-neutral-100 flex flex-col items-center justify-center">
        <div className="min-w-90 p-6 flex justify-center">
          {route === "quiz" && (
            <QuizPage
              noteSettings={noteSettings}
              handleRestartQuiz={() => handleRoute("menu")}
            />
          )}
          {route === "menu" && (
            <>
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text mb-8">
                  Note Game
                </h1>
                <div className="space-x-4 mt-6 mb-10">
                  <button
                    onClick={() => handleRoute("quiz")}
                    className="bg-blue-500 text-white w-30 py-3 rounded-lg shadow-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 transition"
                  >
                    Start
                  </button>
                  <button
                    onClick={() => handleRoute("settings")}
                    className="bg-gray-300 text-gray-800 w-30 py-3 rounded-lg shadow-lg dark:bg-neutral-700 dark:text-gray-100 dark:hover:bg-neutral-600 hover:bg-gray-400 transition"
                  >
                    Settings
                  </button>
                </div>
              </div>
              <footer>Gary O'Shea, 2025</footer>
            </>
          )}
          {route === "settings" && (
            <Settings
              handleSettingsChange={handleSettingsChange}
              handleRestartQuiz={() => handleRoute("menu")}
              handleDarkMode={handleDarkMode}
              settings={noteSettings}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
