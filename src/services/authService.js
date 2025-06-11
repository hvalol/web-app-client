import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// FOR TOKEN VERIFICATION AND AUTHENTICATION
export const authentication = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }
  return true;
};

// FOR ROLE AUTHENTICATION
export const getCurrentUserRole = () => {};

// LOGIN USER AUTHENTICATION
export const login = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username: formData.username,
      password: formData.password,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authentication();
  return isAuthenticated ? children : <Navigate to={"/"} />;
};
