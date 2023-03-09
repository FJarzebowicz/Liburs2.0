import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../../store/authContext";

export default function LoginTeacher() {
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const { setIsTeacher } = useAuth();

  const { login } = useAuth();
  const [error, setError] = useState("");

  const navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setError("");

      await login(email, password);

      setIsTeacher(true);
      window.localStorage.setItem("isTeacher", "true");
      window.localStorage.setItem("isLoggedIn", "true");

      await navigate("/Teacher/Dashboard");
    } catch (error) {
      setError("error");
    }
  }

  return (
    <div className="LoginStudent">
      <div className="LoginStudent__box">
        <div className="LoginStudent__box-title">Log in as a Teacher</div>
        <form className="LoginStudent__form">
          <div className="LoginStudent__form-inputs">
            <input
              className="LoginStudent__form-input"
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
            <input
              className="LoginStudent__form-input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <button className="LoginStudent__form-btn" onClick={handleSubmit}>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
