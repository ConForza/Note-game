export default function Notename({ answer, handleAnswers, buttonState, id }) {
  return (
    <div className="flex flex-col gap-3">
      <li>
        <button
          className={`min-w-full text-center px-4 py-3 border border-blue-200 bg-blue-50 text-blue-700 font-bold font-sans rounded-2xl shadow-sm hover:bg-blue-100 transition-colors ${buttonState["states"][id]}`}
          id={id}
          disabled={buttonState["status"] === "disabled" ? true : false}
          onClick={(e) => handleAnswers(e)}
        >
          {answer}
        </button>
      </li>
    </div>
  );
}
