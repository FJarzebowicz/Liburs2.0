import NavBar from "../../../layout/NavBar/NavBar";

import * as React from "react";
import { useState, useEffect } from "react";
import { usePickedClas } from "../../../store/pickedClass";
import { db } from "../../../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export type Lesson = {
  class: String;
  day: String;
  mainInfo: String | any;
  room: String;
  time: String;
  color: String;
  id: String;
};

export default function SSchedule() {
  const { pickedClas } = usePickedClas();
  const [allLessons, setAllLessons] = useState<Object[] | any>();

  const fetchLessons = async () => {
    const q = query(collection(db, "SchedualLessons"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    const lessons = data.filter((obj) => {
      return obj.class === pickedClas;
    });
    setAllLessons(lessons);
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const MondayLessons = allLessons
    ?.filter((obj: Lesson) => {
      return obj.day === "Poniedziałek";
    })
    .sort(function (a: any, b: any) {
      return a.time.split("-")[0] * 1 - b.time.split("-")[0] * 1;
    });
  const TuesdayLessons = allLessons
    ?.filter((obj: Lesson) => {
      return obj.day === "Wtorek";
    })
    .sort(function (a: any, b: any) {
      return a.time.split("-")[0] * 1 - b.time.split("-")[0] * 1;
    });
  const WensdayLessons = allLessons
    ?.filter((obj: Lesson) => {
      return obj.day === "Środa";
    })
    .sort(function (a: any, b: any) {
      return a.time.split("-")[0] * 1 - b.time.split("-")[0] * 1;
    });
  const ThirsdayLessons = allLessons
    ?.filter((obj: Lesson) => {
      return obj.day === "Czwartek";
    })
    .sort(function (a: any, b: any) {
      return a.time.split("-")[0] * 1 - b.time.split("-")[0] * 1;
    });
  const FridayLessons = allLessons
    ?.filter((obj: Lesson) => {
      return obj.day === "Piątek";
    })
    .sort(function (a: any, b: any) {
      return a.time.split("-")[0] * 1 - b.time.split("-")[0] * 1;
    });
  const Lesson = (mainInfo: String | any, time: String) => {
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
      <NavBar />
      <div className="MSchedual__content">
        <div className="MSchedual__row">
          <div className="schedule__day-container col-1-of-5">
            <div className="schedule__day-header">Monday</div>
            {MondayLessons?.map((obj: Lesson) => (
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
          <div className="schedule__day-container col-1-of-5">
            <div className="schedule__day-header">Tuesday</div>
            {TuesdayLessons?.map((obj: Lesson) => (
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
          <div className="schedule__day-container col-1-of-5">
            <div className="schedule__day-header">Wensday</div>
            {WensdayLessons?.map((obj: Lesson) => (
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
          <div className="schedule__day-container col-1-of-5">
            <div className="schedule__day-header">Thursday</div>
            {ThirsdayLessons?.map((obj: Lesson) => (
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
          <div className="schedule__day-container col-1-of-5">
            <div className="schedule__day-header">Friday</div>
            {FridayLessons?.map((obj: Lesson) => (
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
  );
}
