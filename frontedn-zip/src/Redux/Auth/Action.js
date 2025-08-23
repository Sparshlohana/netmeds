import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
} from "./ActionTypes";
import api, { API_BASE_URL } from "../../config/api";

// Register action creators
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (data) => ({ type: REGISTER_SUCCESS, payload: data });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

// New action to verify OTP and complete registration
export const verifyOtpAndRegister = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/otp/verify-and-register`,
      userData
    );
    const data = response.data;
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    console.log("registration success:", data);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

// Login action creators
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (data) => ({ type: LOGIN_SUCCESS, payload: data });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

// Corrected code
export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/signin`, userData);
    const data = response.data;
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    console.log("login success:", data); // Corrected log message for clarity
    dispatch(loginSuccess(data));
  } catch (error) {
    console.error("Login failed:", error.response.data); // Log the specific error from the server
    dispatch(loginFailure(error.response.data.message || error.message));
  }
};

// get user from token
export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;
      dispatch({ type: GET_USER_SUCCESS, payload: user });
      console.log("req User ", user);
    } catch (error) {
      const errorMessage = error.message;
      dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
  };
};
