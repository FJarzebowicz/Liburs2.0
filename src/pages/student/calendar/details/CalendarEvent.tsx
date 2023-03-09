import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import { usePickedUser } from "../../../../store/pickedUser";
import { useState, useEffect } from "react";
export default function SCalendarEvent() {
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
    <div className="CalendarEvent">
      <div className="CalendarEvent__header">
        <div className="CalendarEvent__header-icon">
          <Link to={"/Student/Calendar"} className="CalendarEvent__link">
            <ArrowBackIosIcon fontSize="large" />
          </Link>
        </div>
        <div className="CalendarEvent__header-title">{modalObject.title}</div>
      </div>
      <div className="CalendarEvent__box">
        <div className={`CalendarEvent__info ${theme}`}>
          <div className="CalendarEvent__container-center">
            <div className="CalendarEvent__info-subcjet">
              {modalObject.subject.toString().split("-")[0]}
            </div>
          </div>
          <div className="CalendarEvent__info-type">
            <span className="CalendarEvent__info-label">type:</span>
            {modalObject.category}
          </div>
          <div className="CalendarEvent__info-date">
            {" "}
            <span className="CalendarEvent__info-label">Subject:</span>
            {modalObject.subject.toString().split("-")[0]}{" "}
          </div>
          <div className="CalendarEvent__info-teacher">
            <span className="CalendarEvent__info-label">teacher:</span>
            {modalObject.subject.toString().split("-")[1]}
          </div>
          <div className="CalendarEvent__info-date">
            {" "}
            <span className="CalendarEvent__info-label">Date:</span>
            {modalObject.date.toString().split(" ")[0]}{" "}
            {modalObject.date.toString().split(" ")[1]}{" "}
            {modalObject.date.toString().split(" ")[2]}
          </div>
        </div>
        <div className="CalendarEvent__description">
          <div className="CalendarEvent__container-center1 marginTop-big">
            <div className="CalendarEvent__description-title">Description</div>
            <div className="CalendarEvent__description-text">
              {modalObject.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
