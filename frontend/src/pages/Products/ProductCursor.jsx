import { useGetTopProductsQuery } from "../../redux/api/productApiSlice.js";
import Message from "../../components/Message.jsx";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { FaClock, FaStar, FaStore } from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const ActualSlider = Slider.default || Slider;

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    adaptiveHeight: true,
  };

  return (
    <div className="mb-10 max-w-6xl mx-auto px-4 hidden md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        products &&
        products.length > 0 && (
          <div className="bg-linear-to-r from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
            <ActualSlider {...settings} className="product-carousel">
              {products.map(
                ({
                  image,
                  _id,
                  name,
                  price,
                  description,
                  brand,
                  createdAt,
                  numReviews,
                  rating,
                  countInStock,
                }) => (
                  <div key={_id} className="outline-none">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12 items-center min-h-112.5">
                      <div className="relative flex justify-center items-center group">
                        <div className="absolute inset-0 bg-pink-500/10 rounded-2xl blur-3xl group-hover:bg-pink-500/20 transition-all duration-500"></div>
                        <img
                          src={image}
                          alt={name}
                          className="w-full max-h-95 object-contain rounded-2xl shadow-xl transform group-hover:scale-105 transition-all duration-500 z-10"
                        />
                      </div>

                      <div className="flex flex-col justify-between text-gray-100 space-y-4">
                        <div>
                          <div className="flex items-center gap-3 text-sm text-pink-500 font-semibold uppercase tracking-wider mb-2">
                            <span className="flex items-center gap-1">
                              <FaStore className="text-xs" /> {brand}
                            </span>
                            <span className="text-gray-600">•</span>
                            <span
                              className={
                                countInStock > 0
                                  ? "text-green-400"
                                  : "text-red-400"
                              }
                            >
                              {countInStock > 0 ? "In Stock" : " Not In Stock "}
                            </span>
                          </div>

                          <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight mb-3 line-clamp-1">
                            {name}
                          </h2>
                          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 lg:line-clamp-3 mb-4">
                            {description}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800/60 text-sm text-gray-300">
                          <div className="flex items-center gap-2">
                            <FaStar className="text-yellow-500" />
                            <span>
                              {rating} {numReviews}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaClock className="text-blue-400" />
                            <span>{moment(createdAt).fromNow()}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 mt-auto">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-400 uppercase tracking-wider">
                              Price
                            </span>
                            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-rose-400">
                              ${price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </ActualSlider>
          </div>
        )
      )}
    </div>
  );
};

export default ProductCarousel;
