import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import PlatformPage from "./views/PlatformPage";
import PreviewPage from "./views/PreviewPage";
import axios from "axios";
import { ProtectedRoute } from "./services/authService";
import "./App.css";

function App() {
  // const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  // TODO
  // FETCHING USER WHEN ACCESSING PLATFORM PAGE AND PREVIEW PAGE
  // useEffect(() => {
  //   try {
  //     const fetchUser = async () => {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get(`${API_URL}/auth/platform`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (response.status !== 201) {
  //         navigate("/");
  //       }
  //     };
  //   } catch (error) {
  //     navigate("/");
  //     console.log(error);
  //   }
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/platform"
            element={
              <ProtectedRoute>
                <PlatformPage />
              </ProtectedRoute>
            }
          />
          <Route path="/preview/:templateId" element={<PreviewPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
