import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import {
  setCategories,
  setProduct,
  setChecked,
} from "../redux/features/shop/shopSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import ProductCard from "./Products/ProductCard";
const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop,
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!filteredProductQuery.isLoading && filteredProductQuery.data) {
      const filteredProduct = filteredProductQuery.data.filter((product) => {
        return (
          product.price.toString().includes(priceFilter) ||
          product.price === parseInt(priceFilter, 10) ||
          priceFilter === ""
        );
      });

      dispatch(setProduct(filteredProduct));
    }
  }, [checked, radio, filteredProductQuery.data, dispatch, priceFilter]);
  const handlerBrandClick = (brand) => {
    const productsByBrand = filteredProductQuery.data?.filter(
      (product) => product.brand === brand,
    );
    dispatch(setProduct(productsByBrand));
  };

  const handelCheck = (value, id) => {
    const updateChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updateChecked));
  };

  //Add All Brands option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined),
      ),
    ),
  ];

  const handlerPriceChange = (e) => {
    //update the price filter state when the user types in the input
    setPriceFilter(e.target.value);
  };
  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="p-3 mt-2 mb-2">
            <h2 className="h4 text-center py-2  rounded-full mb-2">
              Filter by categories
            </h2>
            <div className="p-5 w-60">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      className="border border-blacw-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      type="checkbox"
                      id={`checkbox-${c._id}`}
                      onChange={(e) => handelCheck(e.target.checked, c._id)}
                    />
                    <label
                      htmlFor="pink-ckeckbox"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-600"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-crnter py-2 rounded-full mb-2 mx-4">
              Filter By Brands
            </h2>
            <div className="p-5">
              {uniqueBrands?.map((brand) => (
                <>
                  <div className="flex items-center mr-4 mb-5">
                    <input
                      className="border border-blacw-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handlerBrandClick(brand)}
                    />
                    <label
                      htmlFor="pink-radio"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-600"
                    >
                      {brand}
                    </label>
                  </div>
                </>
              ))}
            </div>

            <h2 className="h4 text-center-center py-2 rounded-full mb-2 mx-4">
              Filter by Price
            </h2>
            <div className="p-5 w-64">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlerPriceChange}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-auto border my-4"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="p-3">
            <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
