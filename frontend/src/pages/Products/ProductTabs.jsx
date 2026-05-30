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

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10">
      {/* Tab Navigation */}
      <section className="flex flex-row md:flex-col border-b md:border-b-0 md:border-r border-gray-700 md:min-w-45">
        {[
          { id: 1, label: "Write Your Review" },
          { id: 2, label: "All Reviews" },
          { id: 3, label: "Related Products" },
        ].map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 md:flex-none px-3 py-3 md:px-4 md:py-4 cursor-pointer text-sm sm:text-base lg:text-lg text-center md:text-left transition-colors
              ${
                activeTab === tab.id
                  ? "font-bold border-b-2 md:border-b-0 md:border-l-2 border-pink-600 text-pink-500"
                  : "text-gray-400 hover:text-white"
              }`}
          >
            {tab.label}
          </div>
        ))}
      </section>

      {/* Tab Content */}
      <section className="flex-1 min-w-0">
        {/* Write Review */}
        {activeTab === 1 && (
          <div className="mt-2">
            {userInfo ? (
              <form onSubmit={submitHandler} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="rating" className="block text-lg mb-2">
                    Rating
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg w-full max-w-md text-black"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-lg mb-2">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg w-full max-w-md text-black"
                    rows="4"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loodingProductReivew}
                  className="bg-pink-600 text-white py-2 px-6 rounded-lg w-full sm:w-auto self-start disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p className="text-gray-400">
                Please{" "}
                <Link to="/login" className="text-pink-500 underline">
                  sign in
                </Link>{" "}
                to write a review.
              </p>
            )}
          </div>
        )}

        {/* All Reviews */}
        {activeTab === 2 && (
          <div className="flex flex-col gap-4">
            {product.reviews.length === 0 ? (
              <p className="text-gray-400">No Reviews yet.</p>
            ) : (
              product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="p-4 rounded-lg bg-[#1A1A1A] w-full max-w-xl"
                >
                  <div className="flex justify-between items-center mb-2">
                    <strong className="text-[#B0B080]">{review.name}</strong>
                    <p className="text-[#B0B080] text-sm">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <p className="my-3 text-white leading-relaxed">
                    {review.comment}
                  </p>
                  <Ratings value={review.rating} />
                </div>
              ))
            )}
          </div>
        )}

        {/* Related Products */}
        {activeTab === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
