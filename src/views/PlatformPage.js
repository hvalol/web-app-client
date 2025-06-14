import React from "react";
import { useNavigate } from "react-router-dom";
import "./PlatformPage.css";

function PlatformPage() {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const templates = [
    {
      id: 1,
      name: "Web App 1",
      description:
        "Professional design for corporate websites with modern aesthetics",
      image: "https://placehold.co/800?text=Web+App+1&font=roboto",
      features: ["Responsive Design", "Contact Forms", "Service Sections"],
    },
    {
      id: 2,
      name: "Web App 2",
      description:
        "Complete solution for your online store with product showcases",
      image: "https://placehold.co/800?text=Web+App+2&font=roboto",
      features: ["Product Gallery", "Shopping Cart", "Payment Integration"],
    },
    {
      id: 3,
      name: "Web App 3",
      description: "Showcase your work with stunning visual galleries",
      image: "https://placehold.co/800?text=Web+App+3&font=roboto",
      features: ["Project Gallery", "About Section", "Skills Display"],
    },
    {
      id: 4,
      name: "Web App 4",
      description: "Modern blog layout with focus on content presentation",
      image: "https://placehold.co/800?text=Web+App+4&font=roboto",
      features: ["Article Layout", "Categories", "Search Function"],
    },
  ];

  const handleTemplateClick = (templateId) => {
    navigate(`/preview/${templateId}`);
  };

  return (
    <div className="platform-container">
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="platform-header">
        <h1>Choose Your Perfect Website Template</h1>
        <p className="subtitle">
          Select from the pre-built website applications
        </p>
      </div>

      <div className="templates-grid">
        {templates.map((template) => (
          <div
            key={template.id}
            className="template-card"
            onClick={() => handleTemplateClick(template.id)}
          >
            <div className="template-image-container">
              <img
                src={template.image}
                alt={template.name}
                className="template-image"
              />
              <div className="template-overlay">
                <button className="preview-button">Preview Template</button>
              </div>
            </div>
            <div className="template-content">
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
