import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function WelcomePage() {
  useEffect(() => {
    window.localStorage.setItem("isTeacher", "false");
  }, []);
  return (
    <>
      <div className="Homepage">
        <div className="Homepage__box">
          <div className="Homepage__content">
            <div className="Homepage__box-title">Librus</div>
            <div className="Homepage__form">
              <div className="Homepage__form-title">
                Are you Student or Teacher ?
              </div>
              <div className="Homepage__form-buttons">
                <Link to={"/login-teacher"} className="Homepage__link">
                  <div className="Homepage__btn">Teacher</div>
                </Link>
                <Link to={"/login-student"} className="Homepage__link">
                  <div className="Homepage__btn Homepage__btn-teal">
                    Student
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
