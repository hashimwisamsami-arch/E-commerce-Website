import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully");
  };

  return (
    <div className="flex flex-col h-full bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-lg hover:shadow-pink-900/30 hover:-translate-y-1 transition-all duration-300 border border-white/5">
      {/* ── صورة المنتج ── */}
      <section className="relative shrink-0">
        <Link to={`/product/${p._id}`} className="block">
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-48 object-cover"
          />
          {/* طبقة تعتيم عند hover */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
        </Link>

        {/* شارة الـ brand */}
        <span className="absolute bottom-3 right-3 bg-pink-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          {p?.brand}
        </span>

        {/* زر المفضلة */}
        <HeartIcon product={p} />
      </section>

      {/* ── محتوى البطاقة ── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* اسم المنتج والسعر */}
        <div className="flex items-start justify-between gap-2">
          <h5 className="text-white font-semibold text-base leading-tight line-clamp-2 flex-1">
            {p.name}
          </h5>
          <p className="text-pink-400 font-bold text-base whitespace-nowrap shrink-0">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        {/* الوصف — يأخذ المساحة المتبقية ويدفع الأزرار للأسفل */}
        <p className="text-[#AFAFAF] text-sm leading-relaxed flex-1 line-clamp-3">
          {p?.description?.substring(0, 90)}...
        </p>

        {/* الأزرار — دائماً في الأسفل */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <Link
            to={`/product/${p._id}`}
            className="flex-1 text-center bg-pink-600 hover:bg-pink-500 active:scale-95 text-white text-sm font-medium py-2 px-3 rounded-xl transition-all duration-200"
          >
            Read More
          </Link>
          <button
            onClick={() => addToCartHandler(p, 1)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-pink-600 active:scale-95 text-white transition-all duration-200 shrink-0"
            aria-label="Add to cart"
          >
            <AiOutlineShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
