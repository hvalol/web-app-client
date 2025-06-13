import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./PreviewPage.css";
function PreviewPage() {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
  const WEB_APP_1_API_URL =
    process.env.REACT_APP_SERVER_1_API_URL || "http://localhost:5001/api";
  const WEB_APP_2_API_URL =
    process.env.REACT_APP_SERVER_2_API_URL || "http://localhost:5002/api";
  const WEB_APP_3_API_URL =
    process.env.REACT_APP_SERVER_3_API_URL || "http://localhost:5003/api";
  const WEB_APP_4_API_URL =
    process.env.REACT_APP_SERVER_4_API_URL || "http://localhost:5004/api";
  const [previewUrl, setPreviewUrl] = useState("");
  const handleReturn = () => {
    navigate("/platform");
  };

  const getPreview = useCallback(async () => {
    try {
      setError(null);

      // 1. Get user ID from auth token
      const token = localStorage.getItem("token");
      const userResponse = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userId = userResponse.data.user.id;
      sessionStorage.setItem("userId", userId);
      switch (templateId) {
        case "1":
          // Try to create user in web app 1 server
          try {
            await axios.post(`${WEB_APP_1_API_URL}/users`, { id: userId });
          } catch (error) {
            // Ignore if user already exists (409 Conflict)
            if (error.response?.status !== 409) {
              throw error;
            }
          }
          setPreviewUrl("http://localhost:3001");
          break;
        case "2":
          console.log("not yet implemented");
          setPreviewUrl("http://localhost:3002");
          break;
        case "3":
          console.log("not yet implemented");
          break;
        case "4":
          console.log("not yet implemented");
          break;

        // Add cases for other templates when implemented
        default:
          throw new Error(`Template ${templateId} not implemented`);
      }
    } catch (error) {
      console.error("Preview error:", error);
      setError(error.message || "Failed to load preview");
    }
  }, [API_URL, WEB_APP_1_API_URL, templateId]);

  useEffect(() => {
    getPreview();
  }, [getPreview]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (error) {
    return (
      <div className="preview-container">
        <div className="error-message">{error}</div>
        <button className="return-button" onClick={handleReturn}>
          Return to Platform
        </button>
      </div>
    );
  }

  return (
    <div className="content-area">
      <div className="landing-page">
        {previewUrl && (
          <iframe
            src={previewUrl}
            title="Web App Preview"
            className="preview-iframe"
            sandbox="allow-same-origin allow-scripts"
            allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi"
          />
        )}
      </div>
      <button className="return-button" onClick={handleReturn}>
        Return to Platform
      </button>
    </div>
  );
}

export default PreviewPage;
