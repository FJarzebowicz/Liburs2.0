import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { usePickedUser } from "../../../../store/pickedUser";
import { useState, useEffect } from "react";

export default function SHomeworkDetails() {
  const { modalObject } = usePickedUser();
  const [theme, setTheme] = useState(String);
  const pickTheme = () => {
    if (modalObject.color === "red") {
      setTheme("Homework-red");
    }
    if (modalObject.color === "teal") {
      setTheme("Homework-teal");
    }
    if (modalObject.color === "blue") {
      setTheme("Homework-blue");
    }
    if (modalObject.color === "pink") {
      setTheme("Homework-pink");
    }
    if (modalObject.color === "orange") {
      setTheme("Homework-orange");
    }
    if (modalObject.color === "yellow") {
      setTheme("Homework-yellow");
    }
    if (modalObject.color === "purple") {
      setTheme("Homework-purple");
    }
    if (modalObject.color === "green") {
      setTheme("Homework-green");
    }
  };
  useEffect(() => {
    pickTheme();
  }, []);

  return (
    <div className="SingleHomework ">
      <div className="SingleHomework__container-utility">
        <Link to="/Student/Homework" className="SingleHomework__link">
          <ArrowBackIosIcon fontSize="large" className="SingleHomework__icon" />
        </Link>
        <div className="SingleHomework__title">{modalObject.title}</div>
      </div>
      <div className="SingleHomework__container-row">
        <div>
          <div className={`SingleHomework__container-deadline ${theme}`}>
            <div className="SingleHomework__deadline">
              {modalObject.date.split(" ")[0]} {modalObject.date.split(" ")[1]}{" "}
              {modalObject.date.split(" ")[2]}
            </div>
            <div className="SingleHomework__info-sbj">
              {modalObject.subject}
            </div>
          </div>
        </div>
        <div className="SingleHomework__info">
          <div className="info-label">Task description</div>
          <div className="info-text">{modalObject.description}</div>
        </div>
      </div>
    </div>
  );
}
