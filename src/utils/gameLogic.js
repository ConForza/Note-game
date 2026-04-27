function shuffleItems(items) {
  let shuffledItems = items
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);

  return shuffledItems;
}

export default shuffleItems;
