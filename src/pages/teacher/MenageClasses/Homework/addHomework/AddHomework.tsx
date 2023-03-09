import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Calendar, Application } from "react-rainbow-components";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePickedClas } from "../../../../../store/pickedClass";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type Lesson = {
  class: String;
  day: String;
  mainInfo: String | any;
  room: String;
  time: String;
};

export default function AddHomework() {
  const [date, setDate] = useState(String);
  const { pickedClas } = usePickedClas();
  const [title, setTitle] = useState(String);
  const [description, setDescription] = useState(String);
  const [color, setColor] = useState<String | any>();
  const [allLessons, setAllLessons] = useState<Lesson[] | any>();
  const [subject, setSubject] = useState<String | any>();
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

  async function addHomework() {
    try {
      const docRef = await addDoc(collection(db, "Homework"), {
        class: pickedClas,
        title: title,
        description: description,
        date: date,
        color: color,
        subject: subject,
      });
      notifySuccess("Homework added Succesfuly");
      navigate("/Teacher/ManageClasses/Homework");
    } catch (error) {
      notifyError("Sth is wrong. Homework not added");
    }
  }

  const validate = () => {
    if (title && description && date && color && subject) {
      addHomework();
    } else {
      notifyError("Sth is missing. Check the form");
    }
  };
  return (
    <div className="AddHomework">
      {" "}
      <div className="AddCalendarEvent__header">
        <div className="AddHomework__container-row1">
          <div className="AddHomework__container-row">
            <Link
              to={"/Teacher/ManageClasses/Homework"}
              className="ClassGrades__link"
            >
              <ArrowBackIosIcon fontSize="large" />
            </Link>

            <div className="AddHomework__title">Add Homework</div>
          </div>
          <div className="AddHomework__btn" onClick={validate}>
            Add
          </div>
        </div>
      </div>
      <div className="AddHomework__form">
        <div className="AddHomework__fr">
          <div className="AddHomework__form-name">
            <input
              className="AddHomework__input-title"
              placeholder="Write title..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.currentTarget.value)
              }
            ></input>
          </div>
          <div className="AddHomework__form-inputs">
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

        <div className="AddHomework__form-description">
          <div className="AddHomework__container-categories">
            <div className="AddHomework__form-category">
              <div className="AddHomework__form-label">Pick subject</div>
              <select
                className="AddHomework__select-medium"
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
            <div className="AddHomework__form-category">
              <div className="AddHomework__form-label">Pick color</div>
              <select
                className="AddHomework__select-medium"
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
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.currentTarget.value)
            }
          ></textarea>
        </div>
      </div>
    </div>
  );
}
