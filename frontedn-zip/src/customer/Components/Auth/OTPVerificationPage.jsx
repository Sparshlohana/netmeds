// Create a new file for this component: components/Auth/OtpVerification.jsx
import React, { useState } from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../Redux/Auth/Action";

export default function OtpVerification({ registrationData, onVerificationSuccess }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [otp, setOtp] = useState("");

  const handleOtpSubmit = (event) => {
    event.preventDefault();
    const data = { ...registrationData, otp };
    
    // Dispatch the Redux action to register the user with OTP
    dispatch(register(data));

    // Optional: Call onVerificationSuccess if the registration is successful
    // This is handled by the Redux state in the parent component.
    // The parent component should listen to changes in auth.user to know when to navigate away.
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 3, textAlign: 'center' }}>Verify OTP</Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>An OTP has been sent to your email.</Typography>
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