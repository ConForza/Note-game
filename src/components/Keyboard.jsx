export default function Keyboard({ handleAnswerSelect, buttonState }) {
  function handleKeyboardClick(e) {
    if (buttonState.status === "disabled") return;

    const key = e.target.closest("[data-name]");
    if (!key) return;

    handleAnswerSelect(key.dataset.name, key.id);
  }

  return (
    <div className="flex" onClick={handleKeyboardClick}>
      <div
        className={`piano-keys white-key ${buttonState["keyboardStates"]["C"]}`}
        data-name="C"
      ></div>
      <div className={`piano-keys black-key`} data-name="C#"></div>
      <div
        className={`piano-keys white-key ${buttonState["keyboardStates"]["D"]}`}
        data-name="D"
      ></div>
      <div className={`piano-keys black-key`} data-name="D#"></div>
      <div
        className={`piano-keys white-key ${buttonState["keyboardStates"]["E"]}`}
        data-name="E"
      ></div>
      <div
        className={`piano-keys white-key ${buttonState["keyboardStates"]["F"]}`}
        data-name="F"
      ></div>
      <div className={`piano-keys black-key`} data-name="F#"></div>
      <div
        className={`piano-keys white-key ${buttonState["keyboardStates"]["G"]}`}
        data-name="G"
      ></div>
      <div className={`piano-keys black-key`} data-name="G#"></div>
      <div
        className={`piano-keys white-key ${buttonState["keyboardStates"]["A"]}`}
        data-name="A"
      ></div>
      <div className={`piano-keys black-key`} data-name="A#"></div>
      <div
        className={`piano-keys white-key ${buttonState["keyboardStates"]["B"]}`}
        data-name="B"
      ></div>
      <div
        className={`piano-keys white-key ${buttonState["keyboardStates"]["C"]}`}
        data-name="C"
      ></div>
    </div>
  );
}
