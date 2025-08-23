// components/Auth/OTPVerificationPage.jsx
import React, { useState } from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { verifyOtpAndRegister } from "../../../Redux/Auth/Action";

export default function OTPVerificationPage({ registrationData, handleCloseModal }) {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");

  const handleOtpSubmit = (event) => {
    event.preventDefault();
    const data = { ...registrationData, otp };
    
    // Dispatch the new Redux action to verify OTP and register the user
    dispatch(verifyOtpAndRegister(data));
    handleCloseModal(); // Close the modal
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 3, textAlign: 'center' }}>Verify OTP</Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
        An OTP has been sent to your email: <br/> <strong>{registrationData.email}</strong>
      </Typography>
      <form onSubmit={handleOtpSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="otp"
              name="otp"
              label="OTP"
              fullWidth
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              inputProps={{ maxLength: 6 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ padding: ".8rem 0", backgroundColor: '#9155FD', '&:hover': { backgroundColor: '#7a3fd8' } }}
            >
              Verify & Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}