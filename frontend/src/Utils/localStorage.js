//Add product to localstorage
export const addFavoriteToLocalStorage = (product) => {
  const favorites = getFavoriteFromLoaclStorage();
  if (!favorites.some((p) => p._id === product._id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

//Remove product to localstorage
export const removeFavoritesFromLocalStorge = (productId) => {
  const favorites = getFavoriteFromLoaclStorage();
  const updateFavorites = favorites.filter(
    (product) => product._id !== productId,
  );
  localStorage.setItem("favorites", JSON.stringify(updateFavorites));
};

//Retrive product to localstorage

export const getFavoriteFromLoaclStorage = () => {
  const favoriteJSON = localStorage.getItem("favorites");
  return favoriteJSON ? JSON.parse(favoriteJSON) : [];
};
