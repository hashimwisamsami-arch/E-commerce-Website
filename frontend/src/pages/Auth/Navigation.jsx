import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice.js";
import { logout } from "../../redux/features/auth/authSlice.js";
import FavoritesCount from "../Products/FavoritesCount.jsx";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  const toggelDropdown = () => setDropdownOpen(!dropdownOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        style={{ zIndex: 999 }}
        className="hidden lg:flex flex-col justify-between p-4 text-white bg-black w-[6%] hover:w-[15%] h-screen fixed transition-all duration-300 group"
        id="navigation-container"
      >
        <div className="flex flex-col justify-center space-y-4">
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineHome size={26} className="mr-2 mt-12 shrink-0" />
            <span className="hidden group-hover:inline nav-item-name mt-12 whitespace-nowrap">
              Home
            </span>
          </Link>

          <Link
            to="/shop"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineShopping size={26} className="mr-2 mt-12 shrink-0" />
            <span className="hidden group-hover:inline nav-item-name mt-12 whitespace-nowrap">
              Shop
            </span>
          </Link>

          <Link
            to="/cart"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineShoppingCart size={26} className="mr-2 mt-12 shrink-0" />
            <span className="hidden group-hover:inline nav-item-name mt-12 whitespace-nowrap">
              Cart
            </span>

            <div className="absolute">
              {cartItems.length > 0 && (
                <span>
                  <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                </span>
              )}
            </div>
          </Link>

          <Link
            to="/favorite"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <FaHeart size={26} className="mr-2 mt-12 shrink-0" />
            <span className="hidden group-hover:inline nav-item-name mt-12 whitespace-nowrap">
              Favorite
            </span>
            <FavoritesCount />
          </Link>
        </div>

        <div className="relative mb-4">
          <button
            onClick={toggelDropdown}
            className="flex items-center text-gray-800 focus:outline-none"
          >
            {userInfo ? (
              <span className="text-white truncate max-w-30">
                {userInfo.username}
              </span>
            ) : (
              <></>
            )}
            {userInfo && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 shrink-0 ${dropdownOpen ? "transform rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={dropdownOpen ? "M5 13l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )}
          </button>

          {dropdownOpen && userInfo && (
            <ul
              className={`absolute left-0 bottom-10 space-y-2 bg-white text-gray-600 z-50 shadow-lg rounded
        ${!userInfo.isAdmin ? "w-32" : "w-36"}`}
            >
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link
                      to="/admin/productlist"
                      className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/categorylist"
                      className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                    >
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/userlist"
                      className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                    >
                      Users
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>

        {!userInfo && (
          <ul className="space-y-2">
            <li>
              <Link
                to="/login"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin size={26} className="mr-2 mt-12 shrink-0" />
                <span className="hidden group-hover:inline nav-item-name mt-12 whitespace-nowrap">
                  Login
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} className="mr-2 mt-12 shrink-0" />
                <span className="hidden group-hover:inline nav-item-name mt-12 whitespace-nowrap">
                  Register
                </span>
              </Link>
            </li>
          </ul>
        )}
      </div>

      <div
        style={{ zIndex: 999 }}
        className="hidden md:flex lg:hidden fixed top-0 left-0 right-0 bg-black text-white px-6 py-3 items-center justify-between shadow-md"
      >
        {/* الروابط الرئيسية */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="flex items-center space-x-1 hover:text-gray-300 transition-colors"
          >
            <AiOutlineHome size={22} />
            <span className="text-sm">Home</span>
          </Link>
          <Link
            to="/shop"
            className="flex items-center space-x-1 hover:text-gray-300 transition-colors"
          >
            <AiOutlineShopping size={22} />
            <span className="text-sm">Shop</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center space-x-1 hover:text-gray-300 transition-colors"
          >
            <AiOutlineShoppingCart size={22} />
            <span className="text-sm">Cart</span>
          </Link>
          <Link
            to="/favorite"
            className="flex items-center space-x-1 hover:text-gray-300 transition-colors relative"
          >
            <FaHeart size={20} />
            <span className="text-sm">Favorites</span>
            <FavoritesCount />
          </Link>
        </div>

        {/* جانب المستخدم */}
        <div className="relative">
          {userInfo ? (
            <>
              <button
                onClick={toggelDropdown}
                className="flex items-center space-x-1 focus:outline-none hover:text-gray-300 transition-colors"
              >
                <span className="text-sm">{userInfo.username}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={dropdownOpen ? "M5 13l7-7 7 7" : "M19 9l-7 7-7-7"}
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <ul className="absolute right-0 top-10 bg-white text-gray-700 shadow-xl rounded-lg overflow-hidden min-w-40 z-50">
                  {userInfo.isAdmin && (
                    <>
                      <li>
                        <Link
                          to="/admin/productlist"
                          className="block px-4 py-2 hover:bg-gray-100 text-sm"
                        >
                          Products
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/categorylist"
                          className="block px-4 py-2 hover:bg-gray-100 text-sm"
                        >
                          Category
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/admin/userlist"
                          className="block px-4 py-2 hover:bg-gray-100 text-sm"
                        >
                          Users
                        </Link>
                      </li>
                      <li>
                        <hr className="border-gray-200" />
                      </li>
                    </>
                  )}
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="flex items-center space-x-1 hover:text-gray-300 transition-colors"
              >
                <AiOutlineLogin size={22} />
                <span className="text-sm">Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-1 hover:text-gray-300 transition-colors"
              >
                <AiOutlineUserAdd size={22} />
                <span className="text-sm">Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div
        style={{ zIndex: 999 }}
        className="flex md:hidden fixed bottom-0 left-0 right-0 bg-black text-white border-t border-gray-800 safe-area-inset-bottom"
      >
        <Link
          to="/"
          className="flex-1 flex flex-col items-center justify-center py-3 hover:bg-gray-900 transition-colors"
        >
          <AiOutlineHome size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          to="/shop"
          className="flex-1 flex flex-col items-center justify-center py-3 hover:bg-gray-900 transition-colors"
        >
          <AiOutlineShopping size={24} />
          <span className="text-xs mt-1">Shop</span>
        </Link>

        <Link
          to="/cart"
          className="flex-1 flex flex-col items-center justify-center py-3 hover:bg-gray-900 transition-colors"
        >
          <AiOutlineShoppingCart size={24} />
          <span className="text-xs mt-1">Cart</span>
        </Link>

        <Link
          to="/favorite"
          className="flex-1 flex flex-col items-center justify-center py-3 hover:bg-gray-900 transition-colors relative"
        >
          <FaHeart size={22} />
          <span className="text-xs mt-1">Favorites</span>
          <FavoritesCount />
        </Link>

        <button
          onClick={toggelDropdown}
          className="flex-1 flex flex-col items-center justify-center py-3 hover:bg-gray-900 transition-colors relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A8 8 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-xs mt-1">
            {userInfo ? userInfo.username?.split(" ")[0] : "Account"}
          </span>

          {dropdownOpen && (
            <ul className="absolute bottom-16 right-0 bg-white text-gray-700 shadow-xl rounded-lg overflow-hidden min-w-45 z-50">
              {userInfo ? (
                <>
                  {userInfo.isAdmin && (
                    <>
                      <li>
                        <Link
                          to="/admin/productlist"
                          className="block px-4 py-3 hover:bg-gray-100 text-sm text-left"
                        >
                          Products
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/categorylist"
                          className="block px-4 py-3 hover:bg-gray-100 text-sm text-left"
                        >
                          Category
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/admin/userlist"
                          className="block px-4 py-3 hover:bg-gray-100 text-sm text-left"
                        >
                          Users
                        </Link>
                      </li>
                      <li>
                        <hr className="border-gray-200" />
                      </li>
                    </>
                  )}
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-3 hover:bg-gray-100 text-sm text-left"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-sm text-red-600"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="block px-4 py-3 hover:bg-gray-100 text-sm text-left"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="block px-4 py-3 hover:bg-gray-100 text-sm text-left"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </button>
      </div>

      <div className="md:hidden h-16" />
    </>
  );
};

export default Navigation;
