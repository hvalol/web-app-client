import React from "react";
import { useNavigate } from "react-router-dom";
import "./PlatformPage.css";

function PlatformPage() {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const templates = [
    {
      id: 1,
      name: "Web App 1",
      description:
        "Professional design for corporate websites with modern aesthetics",
      image: "https://placehold.co/800?text=Web+App+1&font=roboto",
      features: ["Responsive Design", "Contact Forms", "Service Sections"],
      color: "#4a90e2",
    },
    {
      id: 2,
      name: "Web App 2",
      description:
        "Complete solution for your online store with product showcases",
      image: "https://placehold.co/800?text=Web+App+2&font=roboto",
      features: ["Product Gallery", "Shopping Cart", "Payment Integration"],
      color: "#27ae60",
    },
    {
      id: 3,
      name: "Web App 3",
      description: "Showcase your work with stunning visual galleries",
      image: "https://placehold.co/800?text=Web+App+3&font=roboto",
      features: ["Project Gallery", "About Section", "Skills Display"],
      color: "#e74c3c",
    },
    {
      id: 4,
      name: "Web App 4",
      description: "Modern blog layout with focus on content presentation",
      image: "https://placehold.co/800?text=Web+App+4&font=roboto",
      features: ["Article Layout", "Categories", "Search Function"],
      color: "#9b59b6",
    },
  ];

  const handleTemplateClick = (templateId) => {
    navigate(`/preview/${templateId}`);
  };

  return (
    <div className="platform-container">
      <div className="platform-header">
        <h1>Website Templates</h1>
        <p className="subtitle">
          Select one of our professionally designed website templates to preview
        </p>
      </div>

      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          <span className="logout-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path
                fillRule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
          </span>
          Logout
        </button>
      </div>

      <div className="templates-grid">
        {templates.map((template) => (
          <div
            key={template.id}
            className="template-card"
            onClick={() => handleTemplateClick(template.id)}
            style={{ "--accent-color": template.color }}
          >
            <div className="template-image-container">
              <img
                src={template.image}
                alt={template.name}
                className="template-image"
              />
              <div className="template-overlay">
                <button className="preview-button">
                  <span className="preview-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                  </span>
                  Preview Template
                </button>
              </div>
            </div>
            <div className="template-content">
              <div
                className="template-badge"
                style={{ backgroundColor: template.color }}
              >
                Template {template.id}
              </div>
              <h2>{template.name}</h2>
              <p>{template.description}</p>
              <div className="template-features">
                {template.features.map((feature, index) => (
                  <span key={index} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlatformPage;
