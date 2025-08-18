// components/Auth/AuthModal.jsx

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import RegisterUserForm from "./Register"; // Assuming path: components/Auth/Register.jsx
import LoginUserForm from "./Login";     // Assuming path: components/Auth/Login.jsx
import OTPVerificationPage from "./OTPVerificationPage"; // Assuming path: components/Auth/OTPVerificationPage.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // useDispatch is still needed for other Redux interactions if any
import { Alert, Snackbar } from "@mui/material";

// Removed: import { register as registerAction } from "../../Redux/Auth/Action";

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
  const dispatch = useDispatch(); // useDispatch is kept in case it's used elsewhere in AuthModal

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState(''); // State to store phone number for OTP
  const [userRegistrationData, setUserRegistrationData] = useState(null); // State to store full registration data

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Handle Redux auth state changes for final redirection
  useEffect(() => {
    if (auth.user) {
      // If user is authenticated, close modal and redirect
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

  // Callback from RegisterUserForm after initial submission
  const handleRegistrationSuccess = (phoneNumber, registrationData) => {
    setUserPhoneNumber(phoneNumber);
    setUserRegistrationData(registrationData); // Store full data for later use if needed
    setShowOtpInput(true);
    setSnackbarMessage(`OTP sent to ${phoneNumber}!`);
    setSnackbarSeverity("info");
    setOpenSnackbar(true);
  };

  // Callback from OTPVerificationPage after successful OTP verification
  const handleOtpVerified = () => {
    // With `registerAction` removed, this function now primarily signals
    // that the OTP step is complete. The expectation is that the
    // authentication (which updates `auth.user`) has either already
    // happened or will be triggered by a separate mechanism (e.g.,
    // the backend responding to the OTP verification with a session token).
    // The `useEffect` above will then handle the final redirection based on `auth.user`.
    console.log("OTP verified. Proceeding with user flow.");
    // You might want to explicitly close the modal here if not relying solely on auth.user update
    // handleClose();
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
              onOtpVerified={handleOtpVerified} 
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
