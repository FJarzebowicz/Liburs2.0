import NavBarT from "../../../layout/NavBar/NavBarT";
import * as React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../../store/authContext";
import { db } from "../../../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export type ILesson = {
  class: String;
  day: String;
  mainInfo: String | any;
  room: String;
  time: String;
  color: String;
  id: String;
};

type IUser = {
  atrribute: String;
  email: String;
  id: String;
  isTeacher: Boolean;
  password: String;
  username: String;
};

export default function TeacherSchedual() {
  const [teacher, setTeacher] = useState<IUser | any>();
  const [allLessons, setAllLessons] = useState<ILesson[] | any>();
  const { currentUser } = useAuth();
  const fetchTeachers = async () => {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    const data = await querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    const currentTeacher = await data.filter((obj) => {
      return obj.email === currentUser?.email;
    });
    const teacher = await currentTeacher[0];
    setTeacher(teacher);

    fetchTeacherLessons();
  };
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeacherLessons = async () => {
    const q = query(collection(db, "SchedualLessons"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    await setAllLessons(data);
  };

  const lessons = allLessons?.filter((obj: any) => {
    return obj.mainInfo.toString().split("-")[1] === teacher.username;
  });

  const MondayLessons = lessons?.filter((obj: ILesson) => {
    return obj.day === "Poniedziałek";
  });

  const TuesdayLessons = lessons?.filter((obj: ILesson) => {
    return obj.day === "Wtorek";
  });
  const WensdayLessons = lessons?.filter((obj: ILesson) => {
    return obj.day === "Środa";
  });

  const ThirsdayLessons = lessons?.filter((obj: ILesson) => {
    return obj.day === "Czwartek";
  });
  const FridayLessons = lessons?.filter((obj: ILesson) => {
    return obj.day === "Pitątek";
  });

  const Lesson = (mainInfo: String | any, time: String) => {
    const [theme, setTheme] = useState(String);
    const [clicked, setClicked] = useState(Boolean);

    const starts = mainInfo.time?.toString().split("-")[1];
    const ends = mainInfo.time?.toString().split("-")[2];

    const pickTheme = () => {
      if (mainInfo.color === "red") {
        setTheme("Homework-red");
      }
      if (mainInfo.color === "teal") {
        setTheme("-teal");
      }
      if (mainInfo.color === "blue") {
        setTheme("-blue");
      }
      if (mainInfo.color === "pink") {
        setTheme("-pink");
      }
      if (mainInfo.color === "orange") {
        setTheme("-orange");
      }
      if (mainInfo.color === "yellow") {
        setTheme("-yellow");
      }
      if (mainInfo.color === "purple") {
        setTheme("-purple");
      }
      if (mainInfo.color === "green") {
        setTheme("-green");
      }
    };

    useEffect(() => {
      pickTheme();
    }, []);

    function handleClick() {
      const x = clicked;
      setClicked(!x);
    }

    return (
      <div
        className={
          !clicked
            ? `MSchedual__lesson MSchedual__lesson${theme} `
            : `MSchedual__lesson-clicked MSchedual__lesson-clicked${theme}`
        }
      >
        <div className="MSchedual__container-info" onClick={handleClick}>
          <div className="MSchedual_lesson-utilityCon">
            <div className="MSchedual__lesson-time">{starts}</div>
            <div className="MSchedual__lesson-time">{ends}</div>
          </div>
          <div className="MSchedual__lesson-title">Klasa {mainInfo.clas}</div>
        </div>

        {clicked && (
          <div className="">
            <div className="MSchedual__lesson-info">
              <div className="MScheudual__lesson-index">
                Lesson number:{" "}
                <span className="MSchedual__lesson-span1">
                  {mainInfo?.time?.split("-")[0]}
                </span>
              </div>
              <div className="MSchedual__lesson-room">
                Classroom:{" "}
                <span className="MSchedual__lesson-span1">{mainInfo.room}</span>
              </div>
            </div>

            <div className="MSchedual__text-xsmall" onClick={handleClick}>
              Show less
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {currentUser && (
        <>
          <header>
            <NavBarT />
          </header>
          <div className="schedule">
            <div className="MSchedual__row">
              <div className="MSchedual__day-container col-1-of-5">
                <div className="MSchedual__day-header">Monday</div>
                {MondayLessons?.map((obj: ILesson) => (
                  <Lesson
                    mainInfo={obj.mainInfo}
                    clas={obj.class}
                    time={obj.time}
                    color={obj.color}
                    day={obj.day}
                    room={obj.room}
                    id={obj.id}
                  />
                ))}
              </div>
              <div className="MSchedual__day-container col-1-of-5">
                <div className="MSchedual__day-header">Tuesday</div>
                {TuesdayLessons?.map((obj: ILesson) => (
                  <Lesson
                    mainInfo={obj.mainInfo}
                    clas={obj.class}
                    time={obj.time}
                    color={obj.color}
                    day={obj.day}
                    room={obj.room}
                    id={obj.id}
                  />
                ))}
              </div>
              <div className="MSchedual__day-container col-1-of-5">
                <div className="MSchedual__day-header">Wensday</div>
                {WensdayLessons?.map((obj: ILesson) => (
                  <Lesson
                    mainInfo={obj.mainInfo}
                    clas={obj.class}
                    time={obj.time}
                    color={obj.color}
                    day={obj.day}
                    room={obj.room}
                    id={obj.id}
                  />
                ))}
              </div>
              <div className="MSchedual__day-container col-1-of-5">
                <div className="MSchedual__day-header">Thursday</div>
                {ThirsdayLessons?.map((obj: ILesson) => (
                  <Lesson
                    mainInfo={obj.mainInfo}
                    clas={obj.class}
                    time={obj.time}
                    color={obj.color}
                    day={obj.day}
                    room={obj.room}
                    id={obj.id}
                  />
                ))}
              </div>
              <div className="MSchedual__day-container col-1-of-5">
                <div className="MSchedual__day-header">Friday</div>
                {FridayLessons?.map((obj: ILesson) => (
                  <Lesson
                    mainInfo={obj.mainInfo}
                    clas={obj.class}
                    time={obj.time}
                    color={obj.color}
                    day={obj.day}
                    room={obj.room}
                    id={obj.id}
                  />
                ))}
              </div>
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
}
