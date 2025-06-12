export default function RestartBtn({ handleRestart, children }) {
  return (
    <button
      onClick={handleRestart}
      className="bg-gray-300 text-gray-800 px-6 py-1 mt-10 rounded-lg shadow-lg hover:bg-gray-400 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-100 transition"
    >
      {children}
    </button>
  );
}
