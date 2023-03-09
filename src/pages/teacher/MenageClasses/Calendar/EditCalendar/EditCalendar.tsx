import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Calendar, Application } from "react-rainbow-components";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../../../firebase/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { usePickedClas } from "../../../../../store/pickedClass";
import { useNavigate } from "react-router-dom";
import { EditContext } from "../../../../../store/EditContext";

export type teacher = {
  atrribute: String;
  email: String;
  id: String;
  isTeacher: Boolean;
  password: String;
  username: String;
};

export default function EditCalendar() {
  const { pickedClas } = usePickedClas();
  const EditCtx = useContext(EditContext);
  const object = EditCtx.object;
  const [date, setDate] = useState(object?.date);

  const [teachers, setTeachers] = useState<teacher[] | any>();
  const [title, setTitle] = useState(object?.title);
  const [category, setCategory] = useState(object?.category);
  const [subject, setSubject] = useState(object?.subject);
  const [description, setDescription] = useState(object?.description);

  const [color, setColor] = useState<String | any>(object?.color);
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

  const categories = [
    "Exam",
    "Test",
    "ShortTest",
    "Speaking test",
    "Homework",
    "Work in class",
    "other",
  ];

  async function handleChange() {
    try {
      const reference = doc(db, "Calendar", object.id);
      await updateDoc(reference, {
        title: title,
        description: description,
        date: date,
        subject: subject,
        category: category,
        color: color,
      });
      notifySuccess("Calendar event edited succesfully");
      navigate("/Teacher/ManageClasses/Calendar");
    } catch {
      notifyError("sth is wrong. Calendar event not added");
    }
  }

  const validate = () => {
    if (title && description && date && subject && category && color) {
      handleChange();
    } else {
      notifyError("Sth is missing.Check the form");
    }
  };

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

            <div className="AddGrade__title">Edit Event</div>
          </div>
          <div className="AddGrade__btn" onClick={validate}>
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
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.currentTarget.value)
              }
            ></input>
          </div>
          <div className="AddCalendarEvent__form-inputs">
            <div className="AddCalendarEvent__form-lesson">
              <select
                value={subject}
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
                value={category}
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
            <div className="AddClass__form-label">Pick color </div>
            <select
              value={color}
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
            value={description}
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
