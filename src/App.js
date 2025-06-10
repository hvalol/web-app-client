import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import PlatformPage from "./views/PlatformPage";
import PreviewPage from "./views/PreviewPage";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/platform" element={<PlatformPage />} />
          <Route path="/preview/:templateId" element={<PreviewPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
