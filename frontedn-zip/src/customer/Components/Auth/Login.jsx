// components/Auth/Login.jsx

import * as React from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login } from "../../../Redux/Auth/Action";
import { useEffect } from "react";

export default function LoginUserForm({ onAuthSuccess }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  // This hook is for fetching the user profile on initial load if a JWT exists.
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch]);

  // This hook now correctly handles success and error states
  useEffect(() => {
    if (auth.user) {
      // If the user object is populated, the login was successful.
      if (onAuthSuccess) {
        onAuthSuccess();
      }
    }
  }, [auth.user, onAuthSuccess]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log("login user", userData);

    // Dispatch the login action
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
              className="bg-[#9155FD] w-full"
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