export const updateCollection = (parent, collectionName, timeFrame) => {
  parent[collectionName] = parent[collectionName].filter(
    (item) => !item.markedToDelete
  );
  parent[collectionName].forEach((item) => item.update(timeFrame));
};

export const drawCollection = (collection) => {
  collection.forEach((item) => item.draw());
};
