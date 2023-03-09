import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Calendar, Application } from "react-rainbow-components";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePickedClas } from "../../../../../store/pickedClass";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";
import { EditContext } from "../../../../../store/EditContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type Lesson = {
  class: String;
  day: String;
  mainInfo: String | any;
  room: String;
  time: String;
};

export default function EditHomework() {
  const { pickedClas } = usePickedClas();
  const EditCtx = useContext(EditContext);
  const obj = EditCtx.object;
  const [date, setDate] = useState(obj?.date);
  const [title, setTitle] = useState(obj?.title);
  const [description, setDescription] = useState(obj?.description);
  const [color, setColor] = useState<String | any>(obj?.color);
  const [allLessons, setAllLessons] = useState<Object[] | any>();
  const [subject, setSubject] = useState<String | any>(obj?.subject);

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

  const navigate = useNavigate();

  const fetchSubjects = async () => {
    const subts: any = [];
    const uniqeSubts: any = [];
    const q = query(collection(db, "SchedualLessons"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    const lessons = data.filter((obj) => {
      return obj.class === pickedClas;
    });
    const subjects = lessons?.map((obj) => {
      return subts.push(obj.mainInfo?.toString().split("-")[0]);
    });
    subts.forEach((object: String) => {
      if (!uniqeSubts.includes(object)) {
        uniqeSubts.push(object);
      }
    });
    setAllLessons(uniqeSubts);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

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

  const theme = {
    rainbow: {
      palette: {
        brand: "#38d9a9",
      },
    },
  };
  async function handleChange() {
    try {
      const reference = doc(db, "Homework", obj.id);
      await updateDoc(reference, {
        color: color,
        title: title,
        description: description,
        subject: subject,
        date: date,
      });
      notifySuccess("Homework edited succesfully");
      navigate("/Teacher/ManageClasses/Homework");
    } catch {
      notifyError("Sth is wrong. Homework not edited");
    }
  }

  const validate = () => {
    if (color && title && description && subject && date) {
      handleChange();
    } else {
      notifyError("Sth is missing.Check the form");
    }
  };

  return (
    <div className="AddHomework">
      {" "}
      <div className="AddCalendarEvent__header">
        <div className="AddGrade__container-row1">
          <div className="AddGrade__container-row">
            <Link
              to={"/Teacher/ManageClasses/Homework"}
              className="ClassGrades__link"
            >
              <ArrowBackIosIcon fontSize="large" />
            </Link>

            <div className="AddGrade__title">Edit Homework</div>
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
            <div className="AddHomework__form-calendar">
              <Application theme={theme}>
                <Calendar
                  className="Calendar__it"
                  value={date}
                  onChange={(value: any) => setDate(value.toString())}
                />
              </Application>
            </div>
          </div>
        </div>
        <div className="AddCalendarEvent__form-description">
          <div className="AddHomework__container-categories">
            <div className="AddClass__form-category">
              <div className="AddClass__form-label">Pick subject</div>
              <select
                value={subject}
                className="select-medium"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSubject(e.target.value)
                }
              >
                <option></option>
                {allLessons?.map((obj: any) => (
                  <option>{obj}</option>
                ))}
              </select>
            </div>
            <div className="AddClass__form-category">
              <div className="AddClass__form-label">Pick color</div>
              <select
                value={color}
                className="select-medium"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setColor(e.target.value)
                }
              >
                <option></option>
                {colors?.map((obj) => (
                  <option>{obj}</option>
                ))}
              </select>
            </div>
          </div>

          <textarea
            className="AddHomework__input-description"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.currentTarget.value)
            }
          ></textarea>
        </div>
      </div>
    </div>
  );
}
