// components/Auth/AuthModal.jsx

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import RegisterUserForm from "./Register";
import LoginUserForm from "./Login";
import OTPVerificationPage from "./OTPVerificationPage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

export default function AuthModal({ handleClose, open, isLogin }) {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [userRegistrationData, setUserRegistrationData] = useState(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // This function will be passed to both login and register forms.
  const handleAuthSuccess = () => {
    handleClose(); // Close the modal
  };

  useEffect(() => {
    if (auth.user) {
      // Navigate to admin or home page on successful login/registration
      if (auth.user?.role === "ADMIN") {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else if (auth.error) {
      setSnackbarMessage(auth.error);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }, [auth.user, auth.error, handleClose, navigate]);

  const handleRegistrationSuccess = (registrationData) => {
    setUserRegistrationData(registrationData);
    setShowOtpInput(true);
    setSnackbarMessage(`OTP sent to ${registrationData.email}!`);
    setSnackbarSeverity("info");
    setOpenSnackbar(true);
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage("");
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="rounded-md" sx={style}>
          {showOtpInput ? (
            <OTPVerificationPage 
              registrationData={userRegistrationData}
              handleCloseModal={handleClose}
            />
          ) : isLogin ? (
            // Pass the callback to the LoginUserForm
            <LoginUserForm onAuthSuccess={handleAuthSuccess} />
          ) : (
            <RegisterUserForm onRegistrationSuccess={handleRegistrationSuccess} />
          )}
        </Box>
      </Modal>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}