import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Calendar, Application } from "react-rainbow-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../../../firebase/firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { usePickedClas } from "../../../../../store/pickedClass";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type teacher = {
  atrribute: String;
  email: String;
  id: String;
  isTeacher: Boolean;
  password: String;
  username: String;
};

export default function AddCalendarEvent() {
  const [date, setDate] = useState(String);
  const [teachers, setTeachers] = useState<teacher[] | any>();
  const [title, setTitle] = useState(String);
  const [category, setCategory] = useState(String);
  const [subject, setSubject] = useState(String);
  const [description, setDescription] = useState(String);
  const { pickedClas } = usePickedClas();
  const [color, setColor] = useState<String | any>();

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

  const colors = [
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "teal",
    "yellow",
    "pink",
  ];

  const navigate = useNavigate();

  const fetchTeacherWithSubjects = async () => {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    const teachers = data.filter((obj) => {
      return obj.isTeacher === true;
    });
    setTeachers(teachers);
  };

  useEffect(() => {
    fetchTeacherWithSubjects();
  }, []);

  const theme = {
    rainbow: {
      palette: {
        brand: "#38d9a9",
      },
    },
  };

  const validateEvent = () => {
    if (date !== "" && subject !== "" && title !== "") {
      return 1;
    } else {
      notifyError("Sth is missing. Check the form");
      return 0;
    }
  };
  const categories = [
    "Exam",
    "Test",
    "ShortTest",
    "Speaking test",
    "Homework",
    "Work in class",
    "other",
  ];

  async function addCalendarEvent() {
    try {
      const docRef = await addDoc(collection(db, "Calendar"), {
        class: pickedClas,
        title: title,
        description: description,
        date: date,
        subject: subject,
        category: category,
        color: color,
      });
      notifySuccess("Calendar event added succesfully");
      navigate("/Teacher/ManageClasses/Calendar");
    } catch (error) {
      notifyError("Sth is wrong. Calendar event not added");
    }
  }

  function handleSubmit() {
    const x = validateEvent();

    if (x === 1) {
      addCalendarEvent();
    } else {
      return null;
    }
  }

  return (
    <div className="AddCalendarEvent">
      <div className="AddCalendarEvent__header">
        <div className="AddGrade__container-row1">
          <div className="AddGrade__container-row">
            <Link
              to={"/Teacher/ManageClasses/Calendar"}
              className="ClassGrades__link"
            >
              <ArrowBackIosIcon fontSize="large" />
            </Link>

            <div className="AddGrade__title">Add Calendar Event</div>
          </div>
          <div className="AddGrade__btn" onClick={handleSubmit}>
            Add
          </div>
        </div>
      </div>
      <div className="AddCalendarEvent__form">
        <div>
          <div className="AddCalendarEvent__form-name">
            <input
              className="AddCalendarEvent__input-title"
              placeholder="Write title..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.currentTarget.value)
              }
            ></input>
          </div>
          <div className="AddCalendarEvent__form-inputs">
            <div className="AddCalendarEvent__form-lesson">
              <select
                className="AddCalendarEvent__select-medium"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSubject(e.target.value)
                }
              >
                <option></option>
                {teachers?.map((obj: teacher) => (
                  <option>
                    {obj.atrribute}-{obj.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="AddCalendarEvent__form-type">
              <select
                className="AddCalendarEvent__select-medium"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setCategory(e.target.value)
                }
              >
                <option></option>
                {categories.map((obj) => (
                  <option>{obj}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="AddCalendarEvent-calendar">
            <Application theme={theme}>
              <Calendar
                className="Calendar__it"
                value={date}
                onChange={(value: any) => setDate(value.toString())}
              />
            </Application>
          </div>
        </div>
        <div className="AddCalendarEvent__form-description">
          <div className="AddClass__form-category">
            <div className="AddClass__form-label">Wybierz kolor </div>
            <select
              className="AddCalendarEvent__select"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setColor(e.target.value)
              }
            >
              <option></option>
              {colors.map((obj) => (
                <option>{obj}</option>
              ))}
            </select>
          </div>
          <textarea
            className="AddCalendarEvent__input-description"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.currentTarget.value)
            }
          ></textarea>
        </div>
      </div>
    </div>
  );
}
