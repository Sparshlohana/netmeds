// components/Auth/OTPVerificationPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Styled component for the card holding the OTP form
const OTPCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFFFFF', // White card background
  borderRadius: '8px', // Slightly less rounded corners
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', // Subtle shadow
  padding: theme.spacing(4), // Padding adjusted
  width: '100%',
  maxWidth: '450px', // Adjusted max width
  textAlign: 'center',
  position: 'relative', // For absolute positioning of close button
  color: '#333333', // Default text color for the card
}));

// Styled TextField for individual OTP digit input
const StyledOtpInput = styled(TextField)(({ theme }) => ({
  width: '45px', // Fixed width for each box
  height: '50px', // Fixed height for each box
  margin: '0 5px', // Space between boxes
  '& .MuiInputBase-root': {
    height: '100%',
    color: '#333333', // Dark text for digits
    backgroundColor: '#F5F5F5', // Light gray background for input field
    borderRadius: '4px', // Slightly less rounded for individual boxes
    border: '1px solid #E0E0E0', // Light gray border
    '& fieldset': {
      borderColor: 'transparent', // Hide default outline
    },
    '&:hover fieldset': {
      borderColor: '#BDBDBD', // Medium light gray on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2196F3', // Primary blue on focus
      boxShadow: '0 0 0 2px rgba(33, 150, 243, 0.2)', // Subtle blue glow on focus
    },
  },
  '& .MuiInputBase-input': {
    padding: 0,
    textAlign: 'center',
    fontSize: '1.5rem', // Larger font for digits
    fontWeight: 'bold',
  },
}));

// Styled Button for primary actions (Verify Account)
const PrimaryButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  borderRadius: '4px', // Match OTP input boxes
  padding: '12px 24px',
  color: '#FFFFFF',
  backgroundColor: '#0064BA', // Primary blue
  boxShadow: 'purple', // Subtle blue shadow
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#1976D2', // Darker blue on hover
    transform: 'translateY(-1px)', // Slight lift on hover
    boxShadow: '0px 6px 12px rgba(33, 150, 243, 0.3)',
  },
  '&:disabled': {
    backgroundColor: '#2196F3', // Lighter blue when disabled
    color: '#FFFFFF',
    boxShadow: 'none',
  }
}));

// Styled Button for secondary actions (Resend OTP)
const SecondaryButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  borderRadius: '4px', // Match OTP input boxes
  padding: '12px 24px',
  color: 'Black', // Dark gray for text
  backgroundColor: 'transparent',
  border: '1px solid Black', // Light gray border
  '&:hover': {
    backgroundColor: '#F0F0F0', // Very light gray hover effect
    borderColor: '#9E9E9E', // Slightly darker gray border on hover
  },
  '&:disabled': {
    color: '#BDBDBD', // Lighter gray when disabled
    borderColor: '#E0E0E0', // Even lighter border when disabled
  }
}));


const OTPVerificationPage = ({ email, onOtpVerified, handleCloseModal }) => {
  const [otp, setOtp] = useState(new Array(6).fill('')); // Array for 6 digits
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(294); // 04:54 in seconds
  const inputRefs = useRef([]); // Refs for focusing individual inputs

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    // If backspace is pressed and current input is empty, focus previous
    if (element.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace key
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Simulate OTP verification
  const handleVerifyOtp = async () => {
    setError('');
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setError('Please enter the complete 6-digit code.');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call for OTP verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      // In a real app, you'd send fullOtp and email/phoneNumber to backend for verification
      if (fullOtp === '123456') { // Mock successful OTP
        alert('Account Verified Successfully! 🎉');
        if (onOtpVerified) {
          onOtpVerified(); // Signal successful verification to parent (AuthModal)
        }
      } else {
        setError('Invalid code. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Simulate Resend OTP
  const handleResendCode = async () => {
    setError('');
    setResendTimer(60); // Reset timer to 60 seconds for resend
    setLoading(true);
    try {
      // Simulate API call to resend OTP to the provided email
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`New code sent to ${email || 'your email'}! 📧`);
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isVerifyButtonDisabled = loading || otp.join('').length !== 6;

  return (
    <OTPCard>
      <IconButton
        onClick={handleCloseModal} // Use the prop to close the modal
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: '#616161',
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h5" component="h1" sx={{ color: 'Black', fontWeight: 'bold', mb: 2.5 }}>
        Verify Account
      </Typography>
      <Typography variant="body1" sx={{ color: '#616161', mb: 1.5, lineHeight: 1.5 }}>
        Code has been sent to **{email || 'your email'}**
      </Typography>
      <Typography variant="body1" sx={{ color: '#616161', mb: 3.5, lineHeight: 1.5 }}>
        Enter the code to verify your account.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        {otp.map((data, index) => (
          <StyledOtpInput
            key={index}
            type="text"
            name="otp"
            maxLength="1"
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={(e) => e.target.select()} // Select all text on focus
            onKeyDown={(e) => handleKeyDown(e, index)}
            inputRef={(el) => (inputRefs.current[index] = el)} // Assign ref
            disabled={loading}
          />
        ))}
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2, fontSize: '0.875rem' }}>
          {error}
        </Typography>
      )}

      <Typography variant="body2" sx={{ color: '#424242', mb: 3 }}> {/* Darker gray for resend timer text */}
        {resendTimer > 0 ? `Resend code in ${formatTime(resendTimer)}` : ''}
      </Typography>

      <PrimaryButton
        fullWidth
        onClick={handleVerifyOtp}
        disabled={isVerifyButtonDisabled}
        sx={{ mb: 1.5 }}
      >
        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Verify Account'}
      </PrimaryButton>

      <Button
        fullWidth
        onClick={handleResendCode}
        disabled={loading || resendTimer > 0}
        sx={{
          textTransform: 'none',
          fontWeight: 'bold',
          borderRadius: '4px',
          padding: '12px 24px',
          color: '#424242', // Darker gray for text
          backgroundColor: 'transparent',
          border: '1px solid Black', // Light gray border
          '&:hover': {
            backgroundColor: 'Purple', // Very light gray hover effect
            borderColor: '#9E9E9E', // Slightly darker gray border on hover
          },
          '&:disabled': {
            color: 'Grey', // Lighter gray when disabled
            borderColor: 'Black', // Even lighter border when disabled
          }
        }}
      >
        Resend Code
      </Button>
    </OTPCard>
  );
};

export default OTPVerificationPage;
