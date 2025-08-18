// components/Auth/Login.jsx

import * as React from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material"; // Removed Snackbar, Alert
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login } from "../../../Redux/Auth/Action"; // Adjust path
import { useEffect } from "react";
import { useState } from "react";

export default function LoginUserForm({ onAuthSuccess }) { // Added onAuthSuccess prop
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);

  // Use a separate effect to trigger onAuthSuccess when login is successful
  // This ensures the modal switches to OTP *before* any final redirection
  useEffect(() => {
    if (auth.user && !auth.error && onAuthSuccess) {
      // Only call onAuthSuccess if user is set and no error, and the callback exists
      // This is where you'd typically check if OTP is needed for this login type
      onAuthSuccess();
    }
  }, [auth.user, auth.error, onAuthSuccess]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log("login user", userData);

    dispatch(login(userData));
  };

  return (
    <React.Fragment>
      <Typography variant="h5" component="h2" sx={{ mb: 3, textAlign: 'center', color: '#333' }}>Login</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="current-password"
              type="password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full" // Consider replacing Tailwind classes with MUI sx for consistency
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0", backgroundColor: '#9155FD', '&:hover': { backgroundColor: '#7a3fd8' } }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
        <Box sx={{ py: 1.5, display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ m: 0, p: 0, color: '#555' }}>Don't have an account?</Typography>
          <Button onClick={() => navigate("/register")} sx={{ ml: 1, textTransform: 'none', color: '#9155FD' }} size="small">
            Register
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}