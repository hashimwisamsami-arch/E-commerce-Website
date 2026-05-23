import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
const SmallProduct = ({ product }) => {
  return (
    <div className="w-80 ml-8 p-3">
      <div className="relative">
        <img
          src={product.image}
          alt={product.image}
          className="h-auto rounded"
        />
        <HeartIcon product={product} />

        <div className="p-5">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-center ">
              <div>{product.name}</div>
              <span className="bg-pink-100 py-0.5 text-pink-800 text-sm font-medium mr-2 px-2.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                $ {product.price}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
