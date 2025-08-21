// components/Auth/AuthModal.jsx

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import RegisterUserForm from "./Register";
import LoginUserForm from "./Login";
import OTPVerificationPage from "./OTPVerificationPage";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  borderRadius: "8px", // Added border-radius for consistency
};

export default function AuthModal({ handleClose, open }) {
  const location = useLocation();
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRegistrationData, setUserRegistrationData] = useState(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (auth.user) {
      handleClose();
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

  const handleRegistrationSuccess = (phoneNumber, email, registrationData) => {
    setUserPhoneNumber(phoneNumber);
    setUserEmail(email);
    setUserRegistrationData(registrationData);
    setShowOtpInput(true);
    setSnackbarMessage(`OTP sent to ${email}!`);
    setSnackbarSeverity("info");
    setOpenSnackbar(true);
  };

  const handleOtpVerified = () => {
    console.log("OTP verified. Proceeding with user flow.");
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
              phoneNumber={userPhoneNumber} 
              email={userEmail}
              onOtpVerified={handleOtpVerified} 
              handleCloseModal={handleClose}
              registrationData={userRegistrationData}
            />
          ) : location.pathname === "/login" ? (
            <LoginUserForm onAuthSuccess={() => console.log("Login form submitted, handle OTP if needed.")} />
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