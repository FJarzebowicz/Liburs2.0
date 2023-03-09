import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../../store/authContext";

export default function SAccount() {
  const auth = getAuth();
  const user = auth.currentUser;
  const userEmail: String | any = user?.email;
  const { logout } = useAuth();

  const navigate = useNavigate();

  async function logOut(e: React.FormEvent) {
    e.preventDefault();

    try {
      await logout(user?.email);

      navigate("/");
    } catch (error) {}
  }

  return (
    <>
      <div className="Account">
        <div className="Account__header">
          <div className="Account__container-row1">
            <Link to={"/Student/Dashboard"} className="Account__link">
              <div className="Account__header-icon">
                <ArrowBackIosIcon fontSize="large" />
              </div>
            </Link>
            <div className="Account__header-username">Franek Jarzębowicz</div>
          </div>

          <div className="Account__btn-logOut" onClick={logOut}>
            Log out
          </div>
        </div>
        <div className="Account__container-main">
          <div className="Account__settings">
            <div className="Account__settings-email">
              E-mail:{" "}
              <input
                value={userEmail}
                className="Account__settings-input"
                disabled
              />
            </div>
            <div className="Account__settings-password">
              Password:{" "}
              <input
                value={"********"}
                className="Account__settings-input"
                disabled
              />{" "}
            </div>
          </div>
          <div className="Account__ilustration-container">
            <div className="Account__ilustration"></div>
          </div>
        </div>
      </div>
    </>
  );
}
