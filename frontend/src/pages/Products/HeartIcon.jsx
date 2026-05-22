import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice.js";
import {
  addFavoriteToLocalStorage,
  getFavoriteFromLoaclStorage,
  removeFavoritesFromLocalStorge,
} from "../../Utils/localStorage.js";

import { useEffect } from "react";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorites = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesfromLocalStorage = getFavoriteFromLoaclStorage();
    dispatch(setFavorites(favoritesfromLocalStorage));
  }, []);

  const toggleFavorites = () => {
    if (isFavorites) {
      dispatch(removeFavorites(product));
      removeFavoritesFromLocalStorge(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div
      onClick={toggleFavorites}
      className="absolute top-2 right-5 cursor-pointer"
    >
      {isFavorites ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-black" />
      )}
    </div>
  );
};

export default HeartIcon;
