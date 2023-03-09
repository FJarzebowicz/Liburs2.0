import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/authContext";

export default function Page404() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const returnHome = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="page404">
      <div className="page404__ilustration"></div>
      <div className="page404__container-row">
        <div className="page404__text-header">OOPS! Page not found</div>
        <div className="page404__text-base">
          Sorry the page you're looking for doesn't exist.{" "}
        </div>
        <div className="page404__container-btn">
          <div className="page404__btn" onClick={returnHome}>
            return home
          </div>
        </div>
      </div>
    </div>
  );
}
