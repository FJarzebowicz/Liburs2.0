import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { db } from "../../../../../firebase/firebase";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { usePickedClas } from "../../../../../store/pickedClass";
import { EditContext } from "../../../../../store/EditContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function EditClass() {
  const { pickedClas } = usePickedClas();
  const EditCtx = useContext(EditContext);
  const obj = EditCtx.object;
  const [time, setTime] = useState(obj?.time);
  const [Teachers, setTeachers] = useState<teacher[] | any>();
  const [subject, setSubject] = useState(obj?.mainInfo);
  const [room, setRoom] = useState<any>(obj?.room);
  const [day, setDay] = useState<any>(obj?.day);
  const navigate = useNavigate();
  const [color, setColor] = useState<any>(obj?.color);

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

  async function handleChange() {
    try {
      const reference = doc(db, "SchedualLessons", obj.id);
      await updateDoc(reference, {
        color: color,
        day: day,
        mainInfo: subject,
        room: room,
        time: time,
      });
      notifySuccess("Class edited succesfully");
      navigate("/Teacher/ManageClasses/Schedual");
    } catch (error) {
      notifyError("Sth is wrong. Class not edited");
    }
  }

  const validate = () => {
    if (subject && time && color && day && room) {
      handleChange();
    } else {
      notifyError("Sth is missing. Check the form");
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
        <div className="AddClass__header-btn" onClick={handleChange}>
          Edytuj
        </div>
      </div>
      <div className="AddClass__form">
        <div className="AddClass__container-row">
          <div className="AddClass__form-category">
            <div className="AddClass__form-label">Pick subject</div>
            <select
              className="AddClass__select"
              value={subject}
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
              value={day}
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
              value={time}
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
              value={room}
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
              value={color}
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
