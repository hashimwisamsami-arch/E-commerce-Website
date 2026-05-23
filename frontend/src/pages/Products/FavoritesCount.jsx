import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="relative group">
      <FaHeart className="text-2xl text-pink-500 cursor-pointer" />

      <div className="absolute left-8 top-0 opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible">
        {favoriteCount > 0 && (
          <span className="flex items-center justify-center min-w-5.5 h-5.5 px-1 text-xs font-bold text-white bg-linear-to-r from-pink-500 to-red-500 rounded-full shadow-lg ring-2 ring-white">
            {favoriteCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default FavoritesCount;
