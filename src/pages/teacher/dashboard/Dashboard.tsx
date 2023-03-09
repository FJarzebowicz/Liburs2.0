import { db } from "../../../firebase/firebase";
import NavBarT from "../../../layout/NavBar/NavBarT";
import { collection, getDocs, query } from "firebase/firestore";
import { useAuth } from "../../../store/authContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export type Lesson = {
  class: String;
  day: String;
  mainInfo: String | any;
  room: String;
  time: String;
};

export default function TeacherDashboard() {
  const [allLessons, setAllLessons] = useState<any>();
  const [teacher, setTeacher] = useState<any>();
  const [day, setDay] = useState(String);

  const { currentUser } = useAuth();

  const fetchTeachers = async () => {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    const data = await querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    const tea = await data.filter((obj) => {
      return obj.email === currentUser?.email;
    });
    const teacher = await tea[0];
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

  const getDate = () => {
    const date = new Date();
    const today = date.getDay();

    if (today === 0) {
      setDay("Niedziela");
    }
    if (today === 1) {
      setDay("Poniedziałek");
    }
    if (today === 2) {
      setDay("Wtorek");
    }
    if (today === 3) {
      setDay("Środa");
    }
    if (today === 4) {
      setDay("Czwartek");
    }
    if (today === 5) {
      setDay("Piątek");
    }
    if (today === 6) {
      setDay("Sobota");
    }
  };

  useEffect(() => {
    getDate();
  }, []);

  const todayLessons = lessons?.filter((lesson: any) => {
    return lesson.day === day;
  });

  const Lesson = ({ lesson }: any) => {
    const [theme, setTheme] = useState(String);

    const pickTheme = () => {
      if (lesson.color === "red") {
        setTheme("-red");
      }
      if (lesson.color === "teal") {
        setTheme("-teal");
      }
      if (lesson.color === "blue") {
        setTheme("-blue");
      }
      if (lesson.color === "pink") {
        setTheme("-pink");
      }
      if (lesson.color === "orange") {
        setTheme("-orange");
      }
      if (lesson.color === "yellow") {
        setTheme("-yellow");
      }
      if (lesson.color === "purple") {
        setTheme("-purple");
      }
      if (lesson.color === "green") {
        setTheme("-green");
      }
    };

    useEffect(() => {
      pickTheme();
    }, []);

    return (
      <Link to={"/Teacher/Schedule"} className="CurrentSchedual__link">
        <div
          className={`CurrentSchedual__lesson MSchedual__lesson MSchedual__lesson${theme}`}
        >
          <div className="CurrentSchedual__container">
            <div className="CurrentSchedual__lesson-time">
              {lesson.time.toString().split("-")[1]}
            </div>
            <div className="CurrentSchedual__lesson-time">
              {lesson.time.toString().split("-")[2]}
            </div>
          </div>
          <div className="CurrentSchedual__container-row">
            <div className="CurrentSchedual__lesson-class">
              class {lesson.class}
            </div>
            <div className="CurrentSchedual__lesson-room">
              room {lesson.room}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="Dashboard">
      <div className="Dashboard__all">
        <header>
          <NavBarT />
          <div className=""></div>
        </header>
        <div className="Dashboard__content">
          <div className="row">
            <div className="col-1-of-2 Dashboard__margin-top">
              <div className="CurrentSchedual">
                <div className="CurrentSchedual__label">Today lessons</div>
                {todayLessons?.length !== 0 ? (
                  <div className="CurrentSchedual__content">
                    {todayLessons?.map((lesson: any) => (
                      <Lesson lesson={lesson} />
                    ))}
                  </div>
                ) : (
                  <div className="CurrentSchedual__content1">
                    <div className="CurrentSchedual__text">
                      you have no lessons today
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-1-of-2">
              <div className="Dashboard__ilustration3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
