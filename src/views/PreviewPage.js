import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./PreviewPage.css";

function PreviewPage() {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [templateInfo, setTemplateInfo] = useState(null);

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

  const templates = {
    1: {
      name: "Web App 1",
      description: "Pre-built design for Web App 1",
      color: "#4a90e2",
    },
    2: {
      name: "Web App 2",
      description: "Pre-built design for Web App 2",
      color: "#27ae60",
    },
    3: {
      name: "Web App 3",
      description: "Pre-built design for Web App 3",
      color: "#e74c3c",
    },
    4: {
      name: "Web App 4",
      description: "Pre-built design for Web App 4",
      color: "#9b59b6",
    },
  };

  const handleReturn = () => {
    navigate("/platform");
  };

  const handleDeploy = () => {
    // TODO: add deployment function
    // after pressing deploy button, build the web-app and deploy to docker
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setIsDeployed(true);
    }, 2000);
  };

  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);

  const getPreview = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (templates[templateId]) {
        setTemplateInfo(templates[templateId]);
      }

      // 1. Get user ID from auth token
      const token = localStorage.getItem("token");
      const userResponse = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userId = userResponse.data.user.id;
      sessionStorage.setItem("userId", userId);

      let apiUrl;
      let previewUrl;

      switch (templateId) {
        case "1":
          apiUrl = WEB_APP_1_API_URL;
          previewUrl = "http://localhost:3001";
          break;
        case "2":
          apiUrl = WEB_APP_2_API_URL;
          previewUrl = "http://localhost:3002";
          break;
        case "3":
          apiUrl = WEB_APP_3_API_URL;
          previewUrl = "http://localhost:3003";
          break;
        case "4":
          apiUrl = WEB_APP_4_API_URL;
          previewUrl = "http://localhost:3004";
          break;
        default:
          throw new Error(`Template ${templateId} not implemented`);
      }

      // Try to create user in the appropriate web app server
      try {
        await axios.post(`${apiUrl}/users`, { id: userId });
      } catch (error) {
        // Ignore if user already exists (409 Conflict)
        if (error.response?.status !== 409) {
          throw error;
        }
      }

      setPreviewUrl(previewUrl);
      setLoading(false);
    } catch (error) {
      console.error("Preview error:", error);
      setError(error.message || "Failed to load preview");
      setLoading(false);
    }
  }, [
    API_URL,
    WEB_APP_1_API_URL,
    WEB_APP_2_API_URL,
    WEB_APP_3_API_URL,
    WEB_APP_4_API_URL,
    templateId,
  ]);

  useEffect(() => {
    getPreview();
  }, [getPreview]);

  if (error) {
    return (
      <div className="preview-container error-container">
        <div className="preview-header">
          <button className="return-button" onClick={handleReturn}>
            Return to Platform
          </button>
          <h1>Error Loading Preview</h1>
        </div>
        <div className="error-message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p>{error}</p>
          <button className="try-again-button" onClick={getPreview}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="preview-container"
      style={{ "--template-color": templateInfo?.color || "#4a90e2" }}
    >
      <div className="preview-header">
        <button className="return-button" onClick={handleReturn}>
          Return to Platform
        </button>

        {templateInfo && (
          <div className="template-info">
            <h1>{templateInfo.name}</h1>
            <p>{templateInfo.description}</p>
          </div>
        )}

        <button
          className={`deploy-button ${isDeploying ? "deploying" : ""} ${
            isDeployed ? "deployed" : ""
          }`}
          onClick={handleDeploy}
          disabled={isDeploying || isDeployed}
        >
          {isDeploying ? (
            <>
              <div className="spinner"></div>
              Deploying...
            </>
          ) : isDeployed ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
              </svg>
              Deployed Successfully
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M9.71 5.093a.5.5 0 0 1 .79.407v5a.5.5 0 0 1-.79.407L7 8.5v-2l2.71-1.407z" />
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
              </svg>
              Deploy Web App
            </>
          )}
        </button>
      </div>

      <div className="preview-frame-container">
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Loading preview...</p>
          </div>
        ) : (
          previewUrl && (
            <iframe
              src={previewUrl}
              title="Web App Preview"
              className="preview-iframe"
              sandbox="allow-same-origin allow-scripts"
              allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi"
            />
          )
        )}
      </div>
    </div>
  );
}

export default PreviewPage;
