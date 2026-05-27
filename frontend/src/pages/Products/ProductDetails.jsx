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

  const [createRivew, { isLoading: loodingProductReivew }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createRivew({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Rivew Craeted Successfully");
    } catch (error) {
      console.log(error);
      console.log(error?.data);
      console.log(error?.data?.message);

      toast.error(error?.data || error.message);
    }
  };

  return (
    <>
      <div>
        <Link
          to="/"
          className="font-semibold hover:underline hover:text-blue-400 ml-40"
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
        <>
          <div className="flex flex-wrap relative items-between mt-8 ml-40">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-200 lg:w-180 md:w-120 sm:w-80 mr-8"
              />
              <HeartIcon product={product} />
            </div>
            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 xl:w-140 lg:w-140 md:w-120  text-blue-500">
                {product.description}
              </p>
              <p className="text-5xl my-4 font-extrabold">$ {product.price}</p>
              <div className="flex items-center justify-between w-80">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2" /> Brand:{""}
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-6 w-80">
                    <FaClock className="mr-2" /> Added:{""}
                    {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2" /> Reviews:{""}
                    {product.numReviwes}
                  </h1>
                </div>
                <div className="two">
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2" />
                    Ratings:{product.rating}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2" />
                    Quantity:{product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6 w-40">
                    <FaBox className="mr-2" />
                    In Stock:{product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-wrap">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviwes} Reviews`}
                />

                {product.countInStock > 0 && (
                  <div>
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
                  </div>
                )}
              </div>
              <div className="btn-container">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="mt-20 container flex flex-wrap items-start justify-between ml-40">
              <ProductTabs
                loodingProductReivew={loodingProductReivew}
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
        </>
      )}
    </>
  );
};

export default ProductDetails;
