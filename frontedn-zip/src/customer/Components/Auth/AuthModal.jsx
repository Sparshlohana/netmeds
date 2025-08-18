// components/Auth/AuthModal.jsx

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import RegisterUserForm from "./Register"; // Assuming path: components/Auth/Register.jsx
import LoginUserForm from "./Login";     // Assuming path: components/Auth/Login.jsx
import OTPVerificationPage from "./OTPVerificationPage"; // Assuming path: components/Auth/OTPVerificationPage.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  const dispatch = useDispatch();

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState(''); // State to store phone number for OTP
  const [userEmail, setUserEmail] = useState(''); // State to store email for OTP page display
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
  // Now accepts email as the second argument
  const handleRegistrationSuccess = (phoneNumber, email, registrationData) => {
    setUserPhoneNumber(phoneNumber);
    setUserEmail(email); // Store the email
    setUserRegistrationData(registrationData); // Store full data for later use if needed
    setShowOtpInput(true);
    // Changed message to use email
    setSnackbarMessage(`OTP sent to ${email}!`); 
    setSnackbarSeverity("info");
    setOpenSnackbar(true);
  };

  // Callback from OTPVerificationPage after successful OTP verification
  const handleOtpVerified = () => {
    // In a real application, you would dispatch the actual registration/login action here
    // using userRegistrationData, or confirm the session if it's a login flow.
    // For this mock setup, we just log and rely on the auth.user effect for redirection.
    console.log("OTP verified. Proceeding with user flow.");
    // If you need to dispatch a registration action here, you'd do:
    // if (userRegistrationData) {
    //   dispatch(registerAction(userRegistrationData)); // Assuming registerAction is available
    // }
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
              email={userEmail} // Pass email to OTPVerificationPage
              onOtpVerified={handleOtpVerified} 
              handleCloseModal={handleClose} // Pass handleClose to OTP page for its close button
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
