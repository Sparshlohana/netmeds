import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { navigation } from "../../../config/navigationMenu";
import AuthModal from "../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../Redux/Customers/Cart/Action";
import { getUser, logout } from "../../../Redux/Auth/Action"; // Ensure getUser and logout are imported

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, cart } = useSelector((store) => store);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // New state to control which form to show
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem("jwt");
  const location = useLocation();

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(getCart(jwt));
    }
  }, [jwt, dispatch]);

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenAuthModal = (isLoginForm) => {
    setIsLogin(isLoginForm);
    setOpenAuthModal(true);
  };
  const handleCloseAuthModal = () => {
    setOpenAuthModal(false);
  };

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close();
  };

  // The redirection logic is moved to App.js or a central routing component for better control
  useEffect(() => {
    if (auth.user) {
      handleCloseAuthModal();
    }
  }, [auth.user]);

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logout());
  };

  const handleMyOrderClick = () => {
    handleCloseUserMenu();
    navigate("/account/order");
  };

  return (
    <div className="bg-white">
      {/* ... (rest of the component is the same) ... */}
      <AuthModal handleClose={handleCloseAuthModal} open={openAuthModal} isLogin={isLogin} />
      <header className="relative bg-white">
        {/* Top notification banner */}
        <p className="flex h-10 items-center justify-center bg-[#008000] px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Free international shipping for orders over $99
        </p>

        {/* Main Header with Logo, Search, and Icons */}
        <nav aria-label="Top" className="mx-auto">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center px-11">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">MEDICAL</span>
                  <img
                    className="h-24 w-auto"
                    src="/images/zedicines-10.png"
                    alt="MEDICAL"
                  />
                </Link>
              </div>

              {/* Search bar (desktop) */}
              <div className="flex-1 max-w-lg mx-auto hidden lg:block">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-[#008000] focus:ring-[#008000] focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm"
                    placeholder="Search..."
                    type="search"
                  />
                </div>
              </div>

              {/* User and Cart Icons */}
              <div className="ml-auto flex items-center space-x-2">
                {/* User Icon */}
                {auth.user ? (
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#008000] cursor-pointer">
                    <Avatar
                      className="text-white"
                      onClick={handleUserClick}
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      sx={{
                        bgcolor: "#008000",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      {auth.user?.firstName[0].toUpperCase()}
                    </Avatar>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openUserMenu}
                      onClose={handleCloseUserMenu}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                      <MenuItem onClick={handleMyOrderClick}>My Orders</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e0f7fa]">
                    <Button onClick={() => handleOpenAuthModal(true)} className="p-0 min-w-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-[#008000]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                    </Button>
                  </div>
                )}
                {/* Cart Icon */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e0f7fa] relative">
                  <Button onClick={() => navigate("/cart")} className="p-0 min-w-0">
                    <ShoppingBagIcon className="h-6 w-6 text-[#008000]" aria-hidden="true" />
                  </Button>
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {cart.cart?.totalItem || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Secondary Navigation Bar (for categories) */}
        <div className="hidden lg:block bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-8">
            <div className="flex h-12 items-center justify-center space-x-8 text-sm">
              {navigation.categories.map((category) => (
                <Link
                  key={category.name}
                  to={`/${category.id}`}
                  className="flex items-center text-gray-700 hover:text-[#008000] font-medium"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
      <AuthModal handleClose={handleCloseAuthModal} open={openAuthModal} />
    </div>
  );
}