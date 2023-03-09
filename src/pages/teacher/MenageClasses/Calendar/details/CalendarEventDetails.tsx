import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate } from "react-router-dom";
import { usePickedUser } from "../../../../../store/pickedUser";
import { useState, useEffect, useContext } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditContext } from "../../../../../store/EditContext";
export default function CalendarEvent() {
  const { modalObject } = usePickedUser();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(String);
  const EditCtx = useContext(EditContext);

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

  async function handleDelete() {
    try {
      const reference = doc(db, "Calendar", modalObject.id);
      await deleteDoc(reference);
      notifySuccess("Calendar event deleted succesfully");
      navigate("/Teacher/ManageClasses/Calendar");
    } catch {
      notifyError("Sth is wrong. Calendar event not deleted");
    }
  }
  async function handleEdit() {
    await EditCtx.setObject(modalObject);
    navigate("/Teacher/ManageClasses/EditCalendar");
  }

  return (
    <div className="CalendarEvent">
      <div className="CalendarEvent__header">
        <div className="CalendarEvent__header-icon">
          <Link
            to={"/Teacher/ManageClasses/Calendar"}
            className="CalendarEvent__link"
          >
            <ArrowBackIosIcon fontSize="large" />
          </Link>
        </div>
        <div className="CalendarEvent__header-title">{modalObject.title}</div>
      </div>
      <div className="CalendarEvent__box">
        <div className="CalendarEvent__container-column">
          <div className={`CalendarEvent__info ${theme}`}>
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
          <div className="CalendarEvent__buttons">
            <div className="CalendarEvent__btn-edit" onClick={handleEdit}>
              Edit
            </div>
            <div className="CalendarEvent__btn-delete" onClick={handleDelete}>
              Delete
            </div>
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
