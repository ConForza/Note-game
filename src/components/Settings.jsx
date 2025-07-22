import RestartBtn from "./RestartBtn";

export default function Settings({
  settings,
  handleSettingsChange,
  handleRestartQuiz,
  handleDarkMode,
  handleHighScore,
}) {
  return (
    <div className="border-blue-200 bg-blue-50 dark:bg-neutral-800 p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Settings
      </h2>

      <div className="settings-container space-y-4">
        <div className="settings-top space-y-4 w-full">
          <div>
            <p className="text-lg">Number of questions</p>
            <select
              onChange={(event) => handleSettingsChange(event)}
              defaultValue={settings.noOfQuestions}
              name="noOfQuestions"
              className="w-full p-2 mt-1 border rounded-lg 
             bg-gray-50 dark:bg-neutral-700 
             text-gray-800 
             border-gray-300 dark:border-neutral-600 
             focus:outline-none focus:ring-2 focus:ring-blue-500
             appearance-none"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>

          <div>
            <p className="text-lg text-gray-700 dark:text-gray-100">Clef</p>
            <select
              onChange={(event) => handleSettingsChange(event)}
              defaultValue={settings.mode}
              name="mode"
              className="w-full p-2 mt-1 border rounded-lg 
             bg-gray-50 dark:bg-neutral-700 
             text-gray-800
             border-gray-300 dark:border-neutral-600 
             focus:outline-none focus:ring-2 focus:ring-blue-500
             appearance-none"
            >
              <option value="treble">Treble</option>
              <option value="bass">Bass</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>
        <div className="settings-bottom space-y-4 w-full">
          <div>
            <p className="text-lg text-gray-700 dark:text-gray-100">
              Note difficulty
            </p>
            <select
              onChange={(event) => handleSettingsChange(event)}
              defaultValue={settings.difficulty}
              name="difficulty"
              className="w-full p-2 mt-1 border rounded-lg 
             bg-gray-50 dark:bg-neutral-700 
             text-gray-800 
             border-gray-300 dark:border-neutral-600 
             focus:outline-none focus:ring-2 focus:ring-blue-500
             appearance-none"
            >
              <option value="1">Easy</option>
              <option value="2">Hard</option>
            </select>
          </div>

          <div>
            <p className="text-lg text-gray-700 dark:text-gray-100">
              Timer difficulty
            </p>
            <select
              onChange={(event) => handleSettingsChange(event)}
              defaultValue={settings.timeLimit}
              name="timeLimit"
              className="w-full p-2 mt-1 border rounded-lg 
             bg-gray-50 dark:bg-neutral-700 
             text-gray-800 
             border-gray-300 dark:border-neutral-600 
             focus:outline-none focus:ring-2 focus:ring-blue-500
             appearance-none"
            >
              <option value="10000">Easy (10 secs)</option>
              <option value="5000">Medium (5 secs)</option>
              <option value="2500">Hard (2 secs)</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="darkMode"
              name="isDarkMode"
              className="form-checkbox h-5 w-5 text-blue-600 
      rounded focus:ring-blue-500 dark:bg-neutral-700 
      dark:border-neutral-600 dark:checked:bg-blue-500"
              onChange={(event) => handleDarkMode(event)}
              checked={settings.isDarkMode}
            />
            <label
              htmlFor="darkMode"
              className="text-lg text-gray-700  dark:text-gray-100"
            >
              Dark mode
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <button
          className="restart-btn bg-gray-300 text-gray-800 px-6 py-1 mt-8 rounded-lg shadow-lg hover:bg-gray-400 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-100 transition"
          onClick={() => {
            const confirmReset = window.confirm(
              "Are you sure you want to reset the high score?"
            );
            if (confirmReset) {
              handleHighScore("reset");
              localStorage.removeItem("noteGameHighScore");
              alert("Scores have been reset");
            }
          }}
        >
          Reset Scores
        </button>
        <RestartBtn handleRestart={handleRestartQuiz}>Save</RestartBtn>
      </div>
    </div>
  );
}
