export function shuffleItems(items) {
  let shuffledItems = items
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);

  return shuffledItems;
}

export function filterNotesBySettings(notes, noteSettings) {
  if (noteSettings.mode === "all") {
    if (noteSettings.difficulty === "1") {
      return notes.filter((note) => note.difficulty === "1");
    }
    return notes;
  }

  if (noteSettings.difficulty === "1") {
    return notes.filter(
      (note) => note.type === noteSettings.mode && note.difficulty === "1",
    );
  }

  return notes.filter((note) => note.type === noteSettings.mode);
}
