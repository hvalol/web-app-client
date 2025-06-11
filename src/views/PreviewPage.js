import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DynamicElement = ({ config }) => {
  if (!config) return null;

  switch (config.type) {
    case "text":
      const Element = config.element || "div";
      return (
        <Element className={config.className} style={config.styles}>
          {config.value}
        </Element>
      );

    case "button":
      return (
        <button className={config.className} style={config.styles}>
          {config.value}
        </button>
      );

    case "image":
      return (
        <img
          src={config.src}
          alt={config.alt}
          className={config.className}
          style={config.styles}
        />
      );

    case "section":
      return (
        <section className={config.className} style={config.styles}>
          {config.children?.map((child, index) => (
            <DynamicElement key={index} config={child} />
          ))}
        </section>
      );

    case "grid":
      return (
        <div className={config.className} style={config.styles}>
          {config.children?.map((child, index) => (
            <DynamicElement key={index} config={child} />
          ))}
        </div>
      );

    case "feature":
      return (
        <div className={config.className} style={config.styles}>
          <img
            src={config.image.src}
            alt={config.image.alt}
            className="feature-icon"
            style={config.image.styles}
          />
          <h3 style={config.titleStyles}>{config.title}</h3>
          <p style={config.descriptionStyles}>{config.description}</p>
        </div>
      );

    case "footer":
      return (
        <footer className={config.className} style={config.styles}>
          {config.children?.map((child, index) => (
            <DynamicElement key={index} config={child} />
          ))}
        </footer>
      );

    case "social":
      return (
        <div className={config.className} style={config.styles}>
          {config.links.map((link, index) => (
            <React.Fragment key={index}>
              <a href={link.href} style={link.styles}>
                {link.text}
              </a>
              {index < config.links.length - 1 && " | "}
            </React.Fragment>
          ))}
        </div>
      );

    default:
      return null;
  }
};

function PreviewPage() {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [uiConfig, setUiConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleReturn = () => {
    navigate("/platform");
  };

  const getPreview = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 1. Get user ID from auth token
      const token = localStorage.getItem("token");
      const userResponse = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userId = userResponse.data.user.id;

      // 2. Handle different template servers
      let configResponse;
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

          // Get user's template configuration
          configResponse = await axios.get(
            `${WEB_APP_1_API_URL}/users/${userId}/config`
          );
          console.log(configResponse);
          break;
        case "2":
          console.log("not yet implemented");
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

      if (configResponse?.data) {
        setUiConfig(configResponse.data);
      } else {
        throw new Error("No configuration received from template server");
      }
    } catch (error) {
      console.error("Preview error:", error);
      setError(error.message || "Failed to load preview");
    } finally {
      setIsLoading(false);
    }
  }, [API_URL, WEB_APP_1_API_URL, templateId]);

  useEffect(() => {
    getPreview();
  }, [getPreview]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (isLoading) {
    return <div className="loading">Loading Preview...</div>;
  }

  if (!uiConfig?.elements?.landingPage) {
    return <div className="error-message">Invalid template configuration</div>;
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

  if (isLoading) {
    return (
      <div className="preview-container">
        <div className="loading">Loading Preview...</div>
        <button className="return-button" onClick={handleReturn}>
          Return to Platform
        </button>
      </div>
    );
  }

  if (!uiConfig?.elements?.landingPage) {
    return (
      <div className="preview-container">
        <div className="error-message">Invalid template configuration</div>
        <button className="return-button" onClick={handleReturn}>
          Return to Platform
        </button>
      </div>
    );
  }

  return (
    <div className="content-area">
      <div className="landing-page">
        {Object.entries(uiConfig.elements.landingPage).map(([key, config]) => (
          <DynamicElement key={key} config={config} />
        ))}
      </div>
      <button className="return-button" onClick={handleReturn}>
        Return to Platform
      </button>
    </div>
  );
}

export default PreviewPage;
