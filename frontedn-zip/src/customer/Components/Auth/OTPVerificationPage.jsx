// components/Auth/OTPVerificationPage.jsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, styled } from '@mui/material';

// Styled component for the card holding the OTP form
const OTPCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFFFFF', // White card background
  borderRadius: '12px',
  boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.08)', // Slightly stronger, but soft shadow
  padding: theme.spacing(5), // Increased padding for more internal space
  width: '100%',
  maxWidth: '420px', // Slightly wider for better balance
  textAlign: 'center',
  border: '1px solid #E0E0E0', // Light gray border
}));

// Styled TextField for OTP input
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: '#333333', // Dark gray for input text
    backgroundColor: '#F5F5F5', // Very light gray background for input field
    borderRadius: '8px',
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
    padding: '14px 18px', // Increased padding for taller input
    textAlign: 'center',
    fontSize: '1.4rem', // Slightly larger font for OTP
    fontWeight: 'bold',
    letterSpacing: '0.15em', // More spacing for OTP digits
  },
  '& .MuiInputLabel-root': {
    color: '#616161', // Medium gray for label
  },
}));

// Styled Button for primary actions (Verify OTP)
const PrimaryButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  borderRadius: '8px',
  padding: '14px 28px', // Increased padding for larger button
  color: '#FFFFFF',
  backgroundColor: '#1A237E', // Dark bluish background
  boxShadow: '0px 4px 12px rgba(26, 35, 126, 0.3)', // Dark bluish shadow
  transition: 'all 0.3s ease',
  border: '1px solid #1A237E', // Border matches background
  '&:hover': {
    backgroundColor: '#0D47A1', // Slightly darker blue on hover
    transform: 'translateY(-2px)',
    boxShadow: '0px 6px 18px rgba(26, 35, 126, 0.4)',
    borderColor: '#0D47A1',
  },
  '&:disabled': {
    backgroundColor: '#9FA8DA', // Lighter blue when disabled
    color: '#FFFFFF',
    boxShadow: 'none',
    borderColor: '#9FA8DA',
  }
}));

// Styled Button for secondary actions (Resend OTP)
const SecondaryButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  borderRadius: '8px',
  padding: '12px 24px', // Slightly smaller padding than primary
  color: '#1A237E', // Dark bluish text
  backgroundColor: 'transparent',
  border: '1px solid #1A237E', // Dark bluish border
  '&:hover': {
    backgroundColor: 'rgba(26, 35, 126, 0.1)', // Light bluish hover effect
    borderColor: '#1A237E', // Keep border color consistent on hover
  },
  '&:disabled': {
    color: '#BBDEFB', // Very light blue when disabled
    borderColor: '#E8F5E9', // Very light gray border when disabled
  }
}));


const OTPVerificationPage = ({ phoneNumber, onOtpVerified }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30); // 30 seconds for resend

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  // Simulate OTP verification
  const handleVerifyOtp = async () => {
    setError('');
    if (otp.length !== 6 || isNaN(otp)) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call for OTP verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      // In a real app, you'd send OTP and phoneNumber to backend for verification
      if (otp === '123456') { // Mock successful OTP
        alert('OTP Verified Successfully! 🎉');
        if (onOtpVerified) {
          onOtpVerified(); // Signal successful verification to parent
        }
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Simulate Resend OTP
  const handleResendOtp = async () => {
    setError('');
    setResendTimer(60); // Reset timer to 60 seconds for resend
    setLoading(true);
    try {
      // Simulate API call to resend OTP to the provided phoneNumber
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`New OTP sent to ${phoneNumber || 'your number'}! 📱`);
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // OTPCard is now the direct return of the component
    <OTPCard>
      <Typography variant="h5" component="h1" sx={{ color: '#333333', fontWeight: 'bold', mb: 2.5 }}>
        OTP Verification
      </Typography>
      <Typography variant="body1" sx={{ color: '#616161', mb: 3.5, lineHeight: 1.5 }}>
        Please enter the 6-digit code sent to <br/> **{phoneNumber ? `+91-${phoneNumber}` : 'your mobile number'}**.
      </Typography>

      <StyledTextField
        label="Enter OTP"
        variant="outlined"
        fullWidth
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        inputProps={{ maxLength: 6, inputMode: 'numeric', pattern: '[0-9]*' }}
        sx={{ mb: 3 }}
      />

      {error && (
        <Typography color="error" sx={{ mb: 2, fontSize: '0.875rem' }}>
          {error}
        </Typography>
      )}

      <PrimaryButton
        fullWidth
        onClick={handleVerifyOtp}
        disabled={loading || otp.length !== 6}
        sx={{ mb: 2 }}
      >
        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Verify OTP'}
      </PrimaryButton>

      <SecondaryButton
        fullWidth
        onClick={handleResendOtp}
        disabled={loading || resendTimer > 0}
      >
        {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
      </SecondaryButton>
    </OTPCard>
  );
};

export default OTPVerificationPage;
