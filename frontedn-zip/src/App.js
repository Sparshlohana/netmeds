// src/App.js

import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navigation from "./customer/Components/Navbar/Navigation";
import CustomerRoutes from "./Routers/CustomerRoutes";
import AdminPannel from "./Admin/AdminPannel";
import AuthModal from "./customer/Components/Auth/AuthModal";
import { useState, useEffect } from "react";

function App() {
  const location = useLocation();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsLogin(true);
      setOpenAuthModal(true);
    } else if (location.pathname === "/register") {
      setIsLogin(false);
      setOpenAuthModal(true);
    } else {
      setOpenAuthModal(false);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setOpenAuthModal(false);
  };

  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/admin/*" element={<AdminPannel />} />
      </Routes>

      {/* AuthModal is now controlled by the URL path */}
      <AuthModal
        handleClose={handleClose}
        open={openAuthModal}
        isLogin={isLogin}
      />
    </div>
  );
}

export default App;
