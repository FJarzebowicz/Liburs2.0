import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../../store/authContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TeacherAccount() {
  const auth = getAuth();
  const user = auth.currentUser;
  const userEmail: String | any = user?.email;
  const { logout } = useAuth();
  const [x, setX] = useState(Boolean);
  const navigate = useNavigate();

  const notifyError = (info: string) =>
    toast.error(info, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifySuccess = (info: string) =>
    toast.success(info, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  async function logOut(e: React.FormEvent) {
    e.preventDefault();

    try {
      await logout(user?.email);
      notifySuccess("You logged out");
      navigate("/");
    } catch (error) {
      notifyError("Sth is wrong. Logging out is not possible at the moment");
    }
  }

  return (
    <>
      <div className="Account">
        <div className="Account__header">
          <div className="Account__container-row1">
            <Link to={"/Teacher/Dashboard"} className="Account__link">
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
              <input value={"********"} className="Account__settings-input" />{" "}
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
