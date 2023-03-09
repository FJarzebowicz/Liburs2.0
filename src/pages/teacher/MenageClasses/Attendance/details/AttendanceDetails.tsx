import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import * as React from "react";
import { useState, useEffect } from "react";
import { usePickedUser } from "../../../../../store/pickedUser";
import { Link } from "react-router-dom";
import {
  doc,
  collection,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";
import { CheckboxToggle, Application } from "react-rainbow-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type attendance = {
  category: String;
  date: any;
  lesson: String;
  studentId: String;
};

export default function AttendanceDetails() {
  const [attendance, setAttendance] = useState<attendance[] | any>();
  const [sortedAttendance, setSortedAttendance] = useState<
    attendance[] | any
  >();
  const [attendanceU, setAttendanceU] = useState<attendance[] | any>();
  const [showU, setShowU] = useState<boolean>();
  const { pickedUser } = usePickedUser();
  const fetchStudents = async () => {
    const q = query(collection(db, "Attendance"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    const fetchedStudentsData = data.filter((obj) => {
      return obj.studentId === pickedUser.username;
    });

    setAttendance(fetchedStudentsData);
  };
  useEffect(() => {
    fetchStudents();
  }, []);
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

  const theme = {
    rainbow: {
      palette: {
        brand: "#38d9a9",
      },
    },
  };

  function sortAttendance() {
    const sorted = attendance?.sort(function (a: any, b: any) {
      return b.date - a.date;
    });
    setSortedAttendance(sorted);
  }
  function sortUAttendance() {
    const x = attendance?.filter((obj: attendance) => {
      return obj.category !== "U";
    });
    const sorted = x?.sort(function (a: any, b: any) {
      return b.date - a.date;
    });
    setAttendanceU(sorted);
  }
  useEffect(() => {
    sortAttendance();
    sortUAttendance();
  }, [attendance]);
  const Attendance = ({ attendance }: any) => {
    const [theme, setTheme] = useState(String);
    const [clicked, setClicked] = useState(Boolean);
    const pickTheme = () => {
      if (attendance?.category.toString() === "Nb") {
        setTheme("Attendance__day-red");
      }
      if (attendance?.category.toString() === "SP") {
        setTheme("Attendance__day-orange");
      }
      if (attendance?.category.toString() === "U") {
        setTheme("Attendance__day-teal");
      }
    };
    useEffect(() => {
      pickTheme();
    }, []);

    function handleClick() {
      const x = clicked;
      setClicked(!x);
    }

    async function handleDeleteClick() {
      try {
        const reference = doc(db, "Attendance", attendance.id);
        await deleteDoc(reference);
        fetchStudents();
        notifySuccess("Attendance deleted succesfuly");
      } catch {
        notifyError("Sth is wrong. Attendance not deleted");
      }
    }
    async function Justify() {
      try {
        const reference = doc(db, "Attendance", attendance.id);
        await updateDoc(reference, {
          category: "U",
        });
        fetchStudents();
        notifySuccess("Attendance justified succesfuly");
      } catch {
        notifyError("Sth is wrong. Attendance not justified");
      }
    }

    return (
      <div
        className={
          !clicked
            ? `Attendance__day  ${theme}`
            : `Attendance__day-clicked  ${theme}`
        }
      >
        <div className="" onClick={handleClick}>
          <div className="Attendance__container-row1">
            <div className="Attendance__day-day">
              {attendance.date.toDate().toString().split(" ")[0]}{" "}
              {attendance.date.toDate().toString().split(" ")[1]}{" "}
              {attendance.date.toDate().toString().split(" ")[2]}
            </div>
            <div className="Attendance__day-type">{attendance.category}</div>
          </div>
          <div className="Attendance__day-lesson">
            {attendance.lesson.toString().split(" ")[0]}
          </div>
        </div>
        {clicked && (
          <div className="Attendance__container-btn">
            {attendance.category === "Nb" ? (
              <div className="Attendance__container-column">
                <div className="Attendance__container-row2">
                  <div className="Attendance__btn" onClick={Justify}>
                    Justify
                  </div>
                  <div className="Attendance__btn" onClick={handleDeleteClick}>
                    delete
                  </div>
                </div>
                <div className="MSchedual__text-xsmall" onClick={handleClick}>
                  Show less
                </div>
              </div>
            ) : (
              <>
                <div className="Attendance__container-row3">
                  <div className="Attendance__btn" onClick={handleDeleteClick}>
                    delete
                  </div>
                </div>
                <div className="MSchedual__text-xsmall" onClick={handleClick}>
                  Show less
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  function handleToggle() {
    const x = showU;
    return setShowU(!x);
  }

  return (
    <div className="AttendanceDetails">
      <div className="AttendanceDetails__header">
        <div className="AddGrade__container-row">
          <Link
            to={"/Teacher/ManageClasses/Attendance"}
            className="ClassGrades__link"
          >
            <ArrowBackIosIcon fontSize="large" />
          </Link>

          <div className="AddGrade__title">{pickedUser.username}</div>
        </div>
        <div className="AttendanceDetails__container">
          <div className="AttendanceDetails__text-filter">
            Don't show excused absence
          </div>
          <Application theme={theme}>
            <CheckboxToggle value={showU} onChange={handleToggle} />
          </Application>
        </div>
      </div>
      <div className="AttendanceDetails__content">
        {showU
          ? attendanceU?.map((obj: any) => <Attendance attendance={obj} />)
          : sortedAttendance?.map((obj: any) => (
              <Attendance attendance={obj} />
            ))}
      </div>
    </div>
  );
}
