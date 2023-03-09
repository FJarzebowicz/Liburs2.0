import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Application } from "react-rainbow-components";
import { useState, useEffect } from "react";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";
import { usePickedClas } from "../../../../../store/pickedClass";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type user = {
  atrribute: String;
  email: String;
  id: String;
  isTeacher: Boolean;
  password: String;
  username: String;
};

export default function AddAttendance() {
  const [date, setDate] = useState<any>();
  const [students, setStudents] = useState<user[] | any>();
  const [Teachers, setTeachers] = useState<user[] | any>();
  const [student, setStudent] = useState(String);
  const [category, setCategory] = useState(String);
  const [lesson, setLesson] = useState(String);
  const { pickedClas } = usePickedClas();
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
  console.log(date);

  const fetchStudents = async () => {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    const fetchedStudentsData = data.filter((obj) => {
      return obj.isTeacher === false;
    });
    const fetchedStudentsDataClass = fetchedStudentsData.filter((obj) => {
      return obj.atrribute === pickedClas;
    });
    setStudents(fetchedStudentsDataClass);
  };
  useEffect(() => {
    fetchStudents();
  }, []);

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

  const atttendanceType = ["Nb", "SP", "U"];

  async function addGrade() {
    try {
      const docRef = await addDoc(collection(db, "Attendance"), {
        studentId: student,
        category: category,
        lesson: lesson,
        date: date,
      });
      notifySuccess("Attendance added succesfully");
      navigate("/Teacher/ManageClasses/Attendance");
    } catch (error) {
      notifyError("Sth is wrong. Attendance not added");
    }
  }

  const validateAttendance = () => {
    if (student && category && lesson && date) {
      addGrade();
    } else {
      notifyError("Sth is missing. Check the form");
    }
  };

  return (
    <div className="AddAttendance">
      <div className="AddAttendance__container-row1">
        <div className="AddAttendance__container-row">
          <Link
            to={"/Teacher/ManageClasses/Attendance"}
            className="ClassGrades__link"
          >
            <ArrowBackIosIcon fontSize="large" />
          </Link>

          <div className="AddAttendance__title">Add new Attendance</div>
        </div>
        <div className="AddAttendance__btn" onClick={validateAttendance}>
          Add
        </div>
      </div>
      <div className="AddAttendance__form">
        <div>
          <div className="AddAttendance__container-row">
            <div className="AddAttendance__form-category">
              <div className="AddGrade__form-label">Pick Student</div>
              <select
                className="AddAttendance__select"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setStudent(e.target.value)
                }
              >
                <option></option>
                {students?.map((obj: user) => (
                  <option>{obj.username}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="AddAttendance__container-row">
            <div className="AddAttendance__form-category">
              <div className="AddGrade__form-label">Pick Category</div>
              <select
                className="AddAttendance__select"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setCategory(e.target.value)
                }
              >
                {" "}
                <option></option>
                {atttendanceType.map((obj) => (
                  <option>{obj}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="AddAttendance__form-category">
            <div className="AddGrade__form-label">Pick lesson</div>
            <select
              className="AddAttendance__select"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setLesson(e.target.value)
              }
            >
              <option></option>
              {Teachers?.map((obj: user) => (
                <option>
                  {obj.atrribute} {obj.username}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="AddAttendance__calendar">
          <Application theme={theme}>
            <Calendar
              className="Calendar__it"
              value={date}
              onChange={(value) => setDate(value)}
            />
          </Application>
        </div>
      </div>
    </div>
  );
}
