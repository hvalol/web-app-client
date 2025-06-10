import React from "react";
import { useNavigate } from "react-router-dom";
import "./PlatformPage.css";

function PlatformPage() {
  const navigate = useNavigate();

  const templates = [
    {
      id: 1,
      name: "Template 1",
      description: "Professional design for corporate websites",
    },
    {
      id: 2,
      name: "Template 2",
      description: "Perfect for online stores",
    },
    {
      id: 3,
      name: "Template 3",
      description: "Showcase your work beautifully",
    },
    {
      id: 4,
      name: "Template 4",
      description: "Clean and modern blog layout",
    },
  ];

  const handleTemplateClick = (templateId) => {
    navigate(`/preview/${templateId}`);
  };

  return (
    <div className="platform-container">
      <h1>Choose Your Template</h1>
      <div className="templates-grid">
        {templates.map((template) => (
          <div
            key={template.id}
            className="template-card"
            onClick={() => handleTemplateClick(template.id)}
          >
            <h2>{template.name}</h2>
            <p>{template.description}</p>
            <button className="preview-button">Preview Template</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlatformPage;
