import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import Ratings from "./Ratings";

const ProductTabs = ({
  loodingProductReivew,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  const handleClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col md:flex-row">
      <section className="mr-20">
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 1 ? "font-bold" : ""}`}
          onClick={() => handleClick(1)}
        >
          Write Your Review
        </div>

        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 2 ? "font-bold" : ""}`}
          onClick={() => handleClick(2)}
        >
          All Reviews
        </div>

        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 3 ? "font-bold" : ""}`}
          onClick={() => handleClick(3)}
        >
          Related Products
        </div>
      </section>

      {/*Second Part */}
      <section>
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    Rating
                  </label>

                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg xl:w-160 text-black"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>

                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    Comment
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg xl:w-160 text-black"
                    rows="3"
                    required
                    id="comment"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loodingProductReivew}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please <Link to="/login">sign in</Link> To write a reviw
              </p>
            )}
          </div>
        )}
      </section>

      {/* */}
      <section>
        {activeTab === 2 && (
          <>
            <div>{product.reviews.length === 0 && <p>No Reviews</p>}</div>
            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="p-4 rounded-lg xl:ml-8 sm:ml-0 xl:w-200 sm:w-96 mb-5 bg-[#1A1A1A]"
                >
                  <div className="flex justify-between">
                    <strong className="text-[#B0B080]">{review.name}</strong>
                    <p className="text-[#B0B080]">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <p className="my-4 text-white">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      {/* */}
      <section>
        {activeTab === 3 && (
          <section className="ml-8 flex flex-wrap">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
