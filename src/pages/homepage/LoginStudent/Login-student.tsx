import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../../store/authContext";

export default function LoginStudent() {
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

      setIsTeacher(false);
      window.localStorage.setItem("isTeacher", "false");
      window.localStorage.setItem("isLoggedIn", "true");

      await navigate("/Student/Dashboard");
    } catch (error) {
      setError("error");
      console.log(error);
    }
  }
  return (
    <div className="LoginStudent">
      <div className="LoginStudent__box">
        <div className="LoginStudent__box-title">Log in as a Student</div>
        <div className="LoginStudent__form">
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

          <div className="LoginStudent__form-btn" onClick={handleSubmit}>
            Log in
          </div>
        </div>
      </div>
    </div>
  );
}
