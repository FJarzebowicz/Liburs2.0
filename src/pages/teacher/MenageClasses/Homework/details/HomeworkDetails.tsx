import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useContext, useEffect, useState } from "react";
import { usePickedUser } from "../../../../../store/pickedUser";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";
import { EditContext } from "../../../../../store/EditContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomeworkDetails() {
  const { modalObject } = usePickedUser();
  const [theme, setTheme] = useState(String);
  const navigate = useNavigate();
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
      const reference = doc(db, "Homework", modalObject.id);
      await deleteDoc(reference);
      navigate("/Teacher/ManageClasses/Homework");
      notifySuccess("Homework deleted succesfuly");
    } catch {
      notifyError("Sth is wrong. Homework not deleted");
    }
  }
  async function handleEdit() {
    await EditCtx.setObject(modalObject);
    navigate("/Teacher/ManageClasses/EditHomework");
  }
  return (
    <div className="SingleHomework">
      <div className="SingleHomework__container-utility">
        <Link
          to="/Teacher/ManageClasses/Homework"
          className="SingleHomework__link"
        >
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
          <div className="SingleHomework__container-btns">
            <div className="SingleHomework__btn-edit" onClick={handleEdit}>
              Edit
            </div>
            <div className="SingleHomework__btn-delete" onClick={handleDelete}>
              Delete
            </div>
          </div>
        </div>
        <div className="SingleHomework__info">
          <div className="info-label">Task description</div>
          <div className="info-text">
            <div className="info-text">{modalObject.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
