// components/Auth/Register.jsx

import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../../Redux/Auth/Action"; // Adjust path
import { Fragment, useEffect, useState } from "react";

// Add a new prop: onRegistrationSuccess to pass phone number
export default function RegisterUserForm({ onRegistrationSuccess }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);

  // This effect now only handles Redux user/error state, not direct OTP transition
  // The transition to OTP will be handled by onRegistrationSuccess callback
  useEffect(() => {
    if (auth.error) {
      // Handle registration error if needed (e.g., show snackbar in AuthModal)
      console.error("Registration error:", auth.error);
    }
  }, [auth.error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      phoneNumber: data.get("phoneNumber"), // Get phone number
    };
    console.log("User registration data:", userData);

    // Simulate sending OTP and then transition to OTP page
    // In a real app, you'd make an API call here to send OTP
    alert(`OTP sent to ${userData.phoneNumber}! (Simulated)`);

    // Call the callback to signal successful initial registration and pass phone number
    if (onRegistrationSuccess) {
      onRegistrationSuccess(userData.phoneNumber);
    }

    // Do NOT dispatch register here if OTP is a pre-auth step.
    // Dispatch register ONLY after OTP is successfully verified.
    // For now, we'll simulate dispatching after OTP is done in AuthModal.
  };

  return (
    <Fragment>
      <Typography variant="h5" component="h2" sx={{ mb: 3, textAlign: 'center', color: '#333' }}>Register</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              type="email" // Ensure email type
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              autoComplete="tel" // Autocomplete for phone numbers
              type="tel" // Input type for telephone numbers
              inputProps={{ maxLength: 10 }} // Max length for 10-digit numbers
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="new-password"
              type="password"
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
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
        <Box sx={{ py: 1.5, display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ m: 0, p: 0, color: '#555' }}>If you already have an account?</Typography>
          <Button onClick={() => navigate("/login")} sx={{ ml: 1, textTransform: 'none', color: '#9155FD' }} size="small">
            Login
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
}
