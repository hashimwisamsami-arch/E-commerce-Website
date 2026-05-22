import ProductCursor from "../pages/Products/ProductCursor.jsx";
import SmallProduct from "../pages/Products/SmallProduct.jsx";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice.js";
import Loader from "./Loader.jsx";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  console.log(data);
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="xl:block lg:hidden md:hidden sm:hidden">
          <ProductCursor />

          <div className="grid xl:grid-cols-2 sm:grid-cols-1">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
