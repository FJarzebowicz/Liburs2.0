import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Calendar, Application } from "react-rainbow-components";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { usePickedClas } from "../../../../../store/pickedClass";
import { db } from "../../../../../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { usePickedUser } from "../../../../../store/pickedUser";
import { useNavigate } from "react-router-dom";

export type ICalendarEvent = {
  class: String;
  date: String;
  description: String;
  subject: String;
  title: String;
};

export default function MCalendar() {
  const [date, setDate] = useState(String);
  const [ofDate, setOfDate] = useState();
  const { pickedClas } = usePickedClas();
  const [events, setEvents] = useState<ICalendarEvent[] | any>();
  const { handleModalObject } = usePickedUser();
  const navigate = useNavigate();
  const theme = {
    rainbow: {
      palette: {
        brand: "#38d9a9",
      },
    },
  };

  const fetchEvents = async () => {
    const q = query(collection(db, "Calendar"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    const events = data.filter((obj) => {
      return obj.class === pickedClas;
    });
    setEvents(events);
  };

  const thisDateEvents = events?.filter((event: ICalendarEvent) => {
    return event.date === date;
  });

  useEffect(() => {
    fetchEvents();
  }, []);
  const handleDate = (value: any) => {
    setOfDate(value);
    setDate(value.toString());
  };

  const CalendarEvent = ({ event }: any) => {
    const [theme, setTheme] = useState(String);

    const pickTheme = () => {
      if (event.color === "red") {
        setTheme("Homework-red");
      }
      if (event.color === "teal") {
        setTheme("Homework-teal");
      }
      if (event.color === "blue") {
        setTheme("Homework-blue");
      }
      if (event.color === "pink") {
        setTheme("Homework-pink");
      }
      if (event.color === "orange") {
        setTheme("Homework-orange");
      }
      if (event.color === "yellow") {
        setTheme("Homework-yellow");
      }
      if (event.color === "purple") {
        setTheme("Homework-purple");
      }
      if (event.color === "green") {
        setTheme("Homework-green");
      }
    };

    useEffect(() => {
      pickTheme();
    }, []);

    async function handleClick() {
      await handleModalObject(event);
      navigate("/Teacher/ManageClasses/Calendar/EventDetails");
    }
    return (
      <div className={`Calendar__event ${theme}`} onClick={handleClick}>
        <div className="Event__header">
          <div className="Event__container-center">
            <div className="Calendar__event-title">{event.title}</div>
          </div>
          <div className="Event__subcjet">
            {event.subject.toString().split("-")[0]}
          </div>
        </div>

        <div className="Event__category">{event.category}</div>
      </div>
    );
  };
  return (
    <>
      <div className="MCalendar">
        <div className="MCalendar__header">
          <Link to={"/Teacher/ManageClasses"} className="ClassGrades__link">
            <ArrowBackIosIcon fontSize="large" />
          </Link>
          <div className="MSchedual__title">Class {pickedClas}</div>
        </div>
        <>
          <div className="MCalendar__calendar">
            <div className="Calendar__box">
              <Application theme={theme}>
                <Calendar
                  className="Calendar__it"
                  value={ofDate}
                  onChange={handleDate}
                />
              </Application>
            </div>
            .
            <div className="Calendar__events">
              {thisDateEvents?.map((event: ICalendarEvent) => (
                <CalendarEvent event={event} />
              ))}
            </div>
          </div>
          <div className="Messages__btn-add">
            <Link
              to={"/Teacher/ManageClasses/AddCalendarEvent"}
              className="ClassGrades__link"
            >
              <AddIcon fontSize="large" />
            </Link>
          </div>
        </>
      </div>
    </>
  );
}
