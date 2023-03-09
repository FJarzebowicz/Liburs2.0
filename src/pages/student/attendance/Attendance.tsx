import NavBar from "../../../layout/NavBar/NavBar";

import * as React from "react";
import { useState, useEffect } from "react";

import { db } from "../../../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";

import { usePickedUser } from "../../../store/pickedUser";

import { Application, CheckboxToggle } from "react-rainbow-components";

export type attendance = {
  category: String;
  date: String;
  lesson: String;
  studentId: String;
};

export default function SAttendance() {
  const { pickedUser } = usePickedUser();

  const [attendance, setAttendance] = useState<attendance[] | any>();
  const [sortedAttendance, setSortedAttendance] = useState<
    attendance[] | any
  >();
  const [attendanceU, setAttendanceU] = useState<attendance[] | any>();
  const [showU, setShowU] = useState<boolean>();
  const theme = {
    rainbow: {
      palette: {
        brand: "#38d9a9",
      },
    },
  };
  const fetchAttendance = async () => {
    const q = query(collection(db, "Attendance"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    const fetchedStudentsData = data?.filter((obj) => {
      return obj.studentId === pickedUser.username;
    });

    setAttendance(fetchedStudentsData);
  };
  useEffect(() => {
    fetchAttendance();
  }, []);

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

    return (
      <div className={`Attendance__day  ${theme}`}>
        <div className="Attendance__container-row1">
          <div className="Attendance__day-day">
            {attendance.date.toDate().toString().split(" ")[0]}{" "}
            {attendance.date.toDate().toString().split(" ")[1]}{" "}
            {attendance.date.toDate().toString().split(" ")[2]}
          </div>
          <div className="Attendance__day-type">{attendance?.category}</div>
        </div>
        <div className="Attendance__day-lesson">
          {attendance?.lesson.toString().split(" ")[0]}
        </div>
      </div>
    );
  };
  function handleToggle() {
    const x = showU;
    return setShowU(!x);
  }

  return (
    <>
      <div className="AttendanceDetails__header">
        <NavBar />
        <div className="AttendanceDetails__utility">
          <div className="AttendanceDetails__container">
            <div className="Attendance__text1-filter">
              Don't show excused absence
            </div>
            <Application theme={theme}>
              <CheckboxToggle value={showU} onChange={handleToggle} />
            </Application>
          </div>
        </div>
      </div>
      <div className="AttendanceDetails AttendanceDetails__margin-top">
        <div className="AttendanceDetails__content">
          {showU
            ? attendanceU?.map((obj: any) => <Attendance attendance={obj} />)
            : sortedAttendance?.map((obj: any) => (
                <Attendance attendance={obj} />
              ))}
        </div>
      </div>
    </>
  );
}
