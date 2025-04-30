import RestartBtn from "./RestartBtn";

export default function Settings({
  settings,
  handleSettingsChange,
  handleRestartQuiz,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>

      <div className="space-y-4">
        <div>
          <p className="text-lg text-gray-700">Number of questions</p>
          <select
            onChange={(event) => handleSettingsChange(event)}
            defaultValue={settings.noOfQuestions}
            name="noOfQuestions"
            className="w-full p-2 mt-1 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>

        <div>
          <p className="text-lg text-gray-700">Clef</p>
          <select
            onChange={(event) => handleSettingsChange(event)}
            defaultValue={settings.mode}
            name="mode"
            className="w-full p-2 mt-1 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="treble">Treble</option>
            <option value="bass">Bass</option>
            <option value="all">All</option>
          </select>
        </div>

        <div>
          <p className="text-lg text-gray-700">Note difficulty</p>
          <select
            onChange={(event) => handleSettingsChange(event)}
            defaultValue={settings.difficulty}
            name="difficulty"
            className="w-full p-2 mt-1 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">Easy</option>
            <option value="2">Hard</option>
          </select>
        </div>

        <div>
          <p className="text-lg text-gray-700">Timer difficulty</p>
          <select
            onChange={(event) => handleSettingsChange(event)}
            defaultValue={settings.timeLimit}
            name="timeLimit"
            className="w-full p-2 mt-1 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="10000">Easy (10 secs)</option>
            <option value="5000">Medium (5 secs)</option>
            <option value="2500">Hard (2 secs)</option>
          </select>
        </div>
        <div className="flex flex-row justify-end">
          <RestartBtn handleRestart={handleRestartQuiz}>OK</RestartBtn>
        </div>
      </div>
    </div>
  );
}
