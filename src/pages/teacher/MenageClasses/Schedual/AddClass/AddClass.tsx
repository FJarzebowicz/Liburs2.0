import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { db } from "../../../../../firebase/firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from "react";

import { usePickedClas } from "../../../../../store/pickedClass";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export type Class = {
  name: String | any;
  id: String | any;
};

export type teacher = {
  atrribute: String;
  email: String;
  id: String;
  isTeacher: Boolean;
  password: String;
  username: String;
};

export default function AddClass() {
  const { pickedClas } = usePickedClas();
  const navigate = useNavigate();

  const [time, setTime] = useState(String);
  const [Teachers, setTeachers] = useState<teacher[] | any>();
  const [subject, setSubject] = useState(String);
  const [room, setRoom] = useState<string | any>();
  const [day, setDay] = useState<String | any>();
  const [color, setColor] = useState<String | any>();

  const fetchTeacherWithSubjects = async () => {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    console.log(data);
    const teachers = data.filter((obj) => {
      return obj.isTeacher === true;
    });
    setTeachers(teachers);
  };

  useEffect(() => {
    fetchTeacherWithSubjects();
  }, []);

  const days = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"];
  const hours = [
    { index: 1, starts: "7:00", ends: "7:45" },
    { index: 2, starts: "7:55", ends: "8:40" },
    { index: 3, starts: "8:50", ends: "9:35" },
    { index: 4, starts: "9:45", ends: "9:55" },
    { index: 5, starts: "10:40", ends: "11:25" },
    { index: 6, starts: "11:45", ends: "12:30" },
    { index: 7, starts: "12:40", ends: "13:25" },
    { index: 8, starts: "14:20", ends: "15:05" },
    { index: 9, starts: "15:50", ends: "16:00" },
    { index: 10, starts: "16:10", ends: "16:55" },
  ];
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
  const rooms = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
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
  const notifySucces = (info: string) =>
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

  async function handleSubmit() {
    try {
      const docRef = await addDoc(collection(db, "SchedualLessons"), {
        mainInfo: subject,
        day: day,
        room: room,
        time: time,
        class: pickedClas,
        color: color,
      });
      notifySucces("Class added sucesfully");
      navigate("/Teacher/ManageClasses/Schedual");
    } catch (error) {
      notifyError("Sth is wrong. Class not added");
    }
  }

  const validate = () => {
    if (subject && day && room && time && color) {
      handleSubmit();
    } else {
      notifyError("Check the form again. Sth is not filled up");
    }
  };
  return (
    <div className="AddClass">
      <div className="AddClass__header">
        <div className="AddClass__container-row1">
          <Link
            to={"/Teacher/ManageClasses/Schedual"}
            className="ClassGrades__link"
          >
            <ArrowBackIosIcon fontSize="large" />
          </Link>
          <div className="AddClass__header-title">Add new class</div>
        </div>
        <div className="AddClass__header-btn" onClick={validate}>
          Dodaj
        </div>
      </div>
      <div className="AddClass__form">
        <div className="AddClass__container-row">
          <div className="AddClass__form-category">
            <div className="AddClass__form-label">Pick subject</div>
            <select
              className="AddClass__select"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSubject(e.target.value)
              }
            >
              {" "}
              <option></option>
              {Teachers?.map((obj: teacher) => (
                <option>
                  {obj.atrribute}-{obj.username}
                </option>
              ))}
            </select>
          </div>
          <div className="AddClass__form-category">
            <div className="AddClass__form-label">Pick day</div>
            <select
              className="AddClass__select"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setDay(e.target.value)
              }
            >
              {" "}
              <option></option>
              {days.map((obj) => (
                <option>{obj}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="AddClass__container-row">
          <div className="AddClass__form-category">
            <div className="AddClass__form-label">Pick time</div>
            <select
              className="AddClass__select"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setTime(e.target.value)
              }
            >
              <option></option>
              {hours.map((obj) => (
                <option>
                  {obj.index}-{obj.starts}-{obj.ends}
                </option>
              ))}
            </select>
          </div>
          <div className="AddClass__form-category">
            <div className="AddClass__form-label">Pick room</div>
            <select
              className="AddClass__select"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setRoom(e.target.value)
              }
            >
              {" "}
              <option></option>
              {rooms.map((obj: string) => (
                <option value={obj} key={obj}>
                  {obj}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="AddClass__container-row">
          <div className="AddClass__form-category">
            <div className="AddClass__form-label">Pick color</div>
            <select
              className="AddClass__select"
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
        </div>
      </div>
    </div>
  );
}
