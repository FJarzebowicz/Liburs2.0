import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";
import { usePickedClas } from "../../../../../store/pickedClass";
import { EditContext } from "../../../../../store/EditContext";
export type ILesson = {
  class: String;
  day: String;
  mainInfo: String | any;
  room: String;
  time: String;
  color: String;
  id: String;
};

export default function TSchedual() {
  const [allLessons, setAllLessons] = useState<ILesson[] | any>();
  const { pickedClas } = usePickedClas();
  const navigate = useNavigate();
  const EditCtx = useContext(EditContext);

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

  const fetchLessons = async () => {
    const q = query(collection(db, "SchedualLessons"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    const lessons = data.filter((obj) => {
      return obj.class === pickedClas;
    });
    setAllLessons(lessons);
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const MondayLessons = allLessons
    ?.filter((obj: ILesson) => {
      return obj.day === "Poniedziałek";
    })
    .sort(function (a: any, b: any) {
      return a.time.split("-")[0] * 1 - b.time.split("-")[0] * 1;
    });
  const TuesdayLessons = allLessons
    ?.filter((obj: ILesson) => {
      return obj.day === "Wtorek";
    })
    .sort(function (a: any, b: any) {
      return a.time.split("-")[0] * 1 - b.time.split("-")[0] * 1;
    });
  const WensdayLessons = allLessons
    ?.filter((obj: ILesson) => {
      return obj.day === "Środa";
    })
    .sort(function (a: any, b: any) {
      return a.time.split("-")[0] * 1 - b.time.split("-")[0] * 1;
    });
  const ThirsdayLessons = allLessons
    ?.filter((obj: ILesson) => {
      return obj.day === "Czwartek";
    })
    .sort(function (a: any, b: any) {
      return a.time.split("-")[0] * 1 - b.time.split("-")[0] * 1;
    });
  const FridayLessons = allLessons
    ?.filter((obj: ILesson) => {
      return obj.day === "Piątek";
    })
    .sort(function (a: any, b: any) {
      return a.time.split("-")[0] * 1 - b.time.split("-")[0] * 1;
    });

  const Lesson = (
    mainInfo: String | any,
    time: String,
    color: String,
    room: String,
    id: string,
    day: String
  ) => {
    const [theme, setTheme] = useState(String);
    const [clicked, setClicked] = useState(Boolean);

    const starts = mainInfo.time?.toString().split("-")[1];
    const ends = mainInfo.time?.toString().split("-")[2];
    const subject = mainInfo.mainInfo?.toString().split("-")[0];
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

    async function handleDeleteClick() {
      try {
        const reference = doc(db, "SchedualLessons", mainInfo.id);
        notifySuccess("Class deleted succesfully");
        await deleteDoc(reference);
        fetchLessons();
      } catch (error) {
        notifyError("Sth is wrong. Class not deleted");
      }
    }

    async function handleEdit() {
      await EditCtx.setObject(mainInfo);
      navigate("/Teacher/ManageClasses/EditClass");
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
          <div className="MSchedual__lesson-title">{subject}</div>
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
              <div className="MSchedual__lesson-teacher">
                Teacher:{" "}
                <span className="MSchedual__lesson-span1">
                  {mainInfo?.mainInfo?.split("-")[1]}
                </span>
              </div>
            </div>
            <div className="MSchedual__container-btn">
              <div className="MSchedual__btn" onClick={handleEdit}>
                Edit
              </div>
              <div className="MSchedual__btn" onClick={handleDeleteClick}>
                delete
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
      <div className="MSchedual">
        <div className="MSchedual__container-row">
          <Link to={"/Teacher/ManageClasses"} className="ClassGrades__link">
            <ArrowBackIosIcon fontSize="large" />
          </Link>
          <div className="MSchedual__title">Class {pickedClas}</div>
        </div>
        <>
          <div className="MSchedual__content">
            <div className="MSchedual__row">
              <div className="MSchedual__day-container col-1-of-5">
                <div className="MSchedual__day-header">Monday</div>
                {MondayLessons?.map((obj: ILesson) => (
                  <Lesson
                    color={obj.color}
                    mainInfo={obj.mainInfo}
                    time={obj.time}
                    room={obj.room}
                    id={obj.id}
                    day={obj.day}
                  />
                ))}
              </div>
              <div className="MSchedual__day-container col-1-of-5">
                <div className="MSchedual__day-header">Tuesday</div>
                {TuesdayLessons?.map((obj: ILesson) => (
                  <Lesson
                    color={obj.color}
                    mainInfo={obj.mainInfo}
                    time={obj.time}
                    room={obj.room}
                    id={obj.id}
                    day={obj.day}
                  />
                ))}
              </div>
              <div className="MSchedual__day-container col-1-of-5">
                <div className="MSchedual__day-header">Wensday</div>
                {WensdayLessons?.map((obj: ILesson) => (
                  <Lesson
                    color={obj.color}
                    mainInfo={obj.mainInfo}
                    time={obj.time}
                    room={obj.room}
                    id={obj.id}
                    day={obj.day}
                  />
                ))}
              </div>
              <div className="MSchedual__day-container col-1-of-5">
                <div className="MSchedual__day-header">Thursday</div>
                {ThirsdayLessons?.map((obj: ILesson) => (
                  <Lesson
                    color={obj.color}
                    mainInfo={obj.mainInfo}
                    time={obj.time}
                    room={obj.room}
                    id={obj.id}
                    day={obj.day}
                  />
                ))}
              </div>
              <div className="MSchedual__day-container col-1-of-5">
                <div className="MSchedual__day-header">Friday</div>
                {FridayLessons?.map((obj: ILesson) => (
                  <Lesson
                    color={obj.color}
                    mainInfo={obj.mainInfo}
                    time={obj.time}
                    room={obj.room}
                    id={obj.id}
                    day={obj.day}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
        <div className="Messages__btn-add">
          <Link
            to={"/Teacher/ManageClasses/AddClass"}
            className="ClassGrades__link"
          >
            <AddIcon fontSize="large" />
          </Link>
        </div>
      </div>
    </>
  );
}
