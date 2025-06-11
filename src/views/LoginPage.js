import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../services/authService";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", formData);

    try {
      const response = await login(formData);
      if (response.status === 200) {
        // if success
        // THEN IF SUCCESS NAVIGATE TO PLATFORM PAGE
        console.log(response.data);
        localStorage.setItem("token", response.data.userData.token);
        navigate("/platform");
      } else if (response.status === 401) {
        setError(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (localStorage.token) {
      navigate("/platform");
    }
  }, []);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <p className="error-message"> {error} </p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
