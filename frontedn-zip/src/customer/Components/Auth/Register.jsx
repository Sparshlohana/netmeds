import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../../Redux/Auth/Action";
import { Fragment, useEffect } from "react";

const API_BASE_URL = "http://localhost:5454/api";

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

  useEffect(() => {
    if (auth.error) {
      console.error("Registration error:", auth.error);
    }
  }, [auth.error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      phoneNumber: data.get("phoneNumber"),
    };
    
    console.log("User registration data:", userData);

    try {
        const response = await fetch(`${API_BASE_URL}/auth/otp/request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userData.email }),
        });

        const responseData = await response.json();

        if (response.ok) {
            console.log("OTP request successful:", responseData.message);
            if (onRegistrationSuccess) {
                // Pass all user data and phone number to the next step
                onRegistrationSuccess(userData.phoneNumber, userData.email, userData);
            }
        } else {
            console.error("OTP request failed:", responseData.error);
            alert(responseData.message || "Failed to send OTP.");
        }
    } catch (error) {
        console.error("Network or server error:", error);
        alert("Failed to connect to the server.");
    }
  };

  return (
    <Fragment>
      <Typography variant="h5" component="h2" sx={{ mb: 3, textAlign: 'center', color: '#333' }}>Register</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField required id="firstName" name="firstName" label="First Name" fullWidth autoComplete="given-name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required id="lastName" name="lastName" label="Last Name" fullWidth autoComplete="family-name" />
          </Grid>
          <Grid item xs={12}>
            <TextField required id="email" name="email" label="Email" fullWidth autoComplete="email" type="email" />
          </Grid>
          <Grid item xs={12}>
            <TextField required id="phoneNumber" name="phoneNumber" label="Phone Number" fullWidth autoComplete="tel" type="tel" inputProps={{ maxLength: 10 }} />
          </Grid>
          <Grid item xs={12}>
            <TextField required id="password" name="password" label="Password" fullWidth autoComplete="new-password" type="password" />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" size="large" fullWidth sx={{ padding: ".8rem 0", backgroundColor: '#9155FD', '&:hover': { backgroundColor: '#7a3fd8' } }}>
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