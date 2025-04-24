export default function RestartBtn({ handleRestart, children }) {
  return (
    <button
      onClick={handleRestart}
      className="bg-gray-300 text-gray-800 px-6 py-1 mt-10 rounded-lg shadow-lg hover:bg-gray-400 transition"
    >
      {children}
    </button>
  );
}
