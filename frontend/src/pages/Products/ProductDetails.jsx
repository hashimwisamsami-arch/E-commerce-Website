import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review Created Successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  return (
    <>
      <div className="px-4 sm:px-8 lg:px-16 mt-4">
        <Link
          to="/"
          className="font-semibold hover:underline hover:text-blue-400"
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="px-4 sm:px-8 lg:px-16 mt-8">
          {/* Product image + info */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Image */}
            <div className="relative w-full lg:w-auto shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full lg:w-125 xl:w-140 rounded-lg object-cover"
              />
              <HeartIcon product={product} />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between gap-4 flex-1">
              <h2 className="text-2xl sm:text-3xl font-semibold">
                {product.name}
              </h2>

              <p className="text-blue-500 leading-relaxed">
                {product.description}
              </p>

              <p className="text-4xl sm:text-5xl font-extrabold">
                ${product.price}
              </p>

              {/* Meta info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <h1 className="flex items-center gap-2">
                  <FaStore /> <span className="font-medium">Brand:</span>{" "}
                  {product.brand}
                </h1>
                <h1 className="flex items-center gap-2">
                  <FaStar /> <span className="font-medium">Ratings:</span>{" "}
                  {product.rating}
                </h1>
                <h1 className="flex items-center gap-2">
                  <FaClock /> <span className="font-medium">Added:</span>{" "}
                  {moment(product.createAt).fromNow()}
                </h1>
                <h1 className="flex items-center gap-2">
                  <FaShoppingCart />{" "}
                  <span className="font-medium">Quantity:</span>{" "}
                  {product.quantity}
                </h1>
                <h1 className="flex items-center gap-2">
                  <FaStar /> <span className="font-medium">Reviews:</span>{" "}
                  {product.numReviwes}
                </h1>
                <h1 className="flex items-center gap-2">
                  <FaBox /> <span className="font-medium">In Stock:</span>{" "}
                  {product.countInStock}
                </h1>
              </div>

              {/* Ratings + quantity selector */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviwes} Reviews`}
                />
                {product.countInStock > 0 && (
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="p-2 w-24 rounded-lg text-black"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="bg-pink-600 text-white py-2 px-6 rounded-lg w-full sm:w-auto self-start disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add To Cart
              </button>
            </div>
          </div>

          {/* Product tabs */}
          <div className="mt-16">
            <ProductTabs
              loodingProductReivew={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
