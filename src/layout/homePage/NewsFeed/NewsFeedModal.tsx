import { usePickedClas } from "../../../store/pickedClass";
import { db } from "../../../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import relax from "../../../assets/undraw_Relaxation_re_ohkx.png";
export type ICalendarEvent = {
  class: String;
  date: String;
  description: String;
  subject: String;
  title: String;
};

export default function NewsFeedModal() {
  const { pickedClas } = usePickedClas();
  const [events, setEvents] = useState<ICalendarEvent[] | any>();
  const date = new Date();

  const fetchEvents = async () => {
    const q = query(collection(db, "Calendar"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    const events = data.filter((obj) => {
      return obj.class === pickedClas;
    });
    setEvents(events);
  };

  const thisMonthTasks = events?.filter((event: ICalendarEvent) => {
    return (
      event.date.toString().split(" ")[1] === date.toString().split(" ")[1]
    );
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const CalendarEvent = ({ task }: any) => {
    const [theme, setTheme] = useState(String);
    const RandomNumber = Math.floor(Math.random() * 10) + 1;
    const pickTheme = () => {
      if (RandomNumber === 1) {
        setTheme("Homework-red");
      }
      if (RandomNumber === 2) {
        setTheme("Homework-teal");
      }
      if (RandomNumber === 3) {
        setTheme("Homework-blue");
      }
      if (RandomNumber === 4) {
        setTheme("Homework-pink");
      }
      if (RandomNumber === 5) {
        setTheme("Homework-orange");
      }
      if (RandomNumber === 6) {
        setTheme("Homework-yellow");
      }
      if (RandomNumber === 7) {
        setTheme("Homework-teal");
      }
      if (RandomNumber === 8) {
        setTheme("Homework-red");
      }
      if (RandomNumber === 9) {
        setTheme("Homework-blue");
      }
      if (RandomNumber === 10) {
        setTheme("Homework-pink");
      }
    };

    useEffect(() => {
      pickTheme();
    }, []);
    return (
      <li className={`newsFeedModal__news-calendar ${theme} `}>
        <div className="column">
          <div className="newsFeedModal__news-calendar-name">{task.title}</div>
          <div className="newsFeedModal__news-calendar-date">
            Kiedy: {task.date.toString().split(" ")[0]}{" "}
            {task.date.toString().split(" ")[2]}
          </div>
        </div>
      </li>
    );
  };
  console.log(events);
  return (
    <div className="newsFeedModal">
      {thisMonthTasks?.length !== 0 ? (
        <div className="newsFeedModal__header">Events this month</div>
      ) : (
        <div className="newsFeedModal__header">
          Nothing this week, you can relax :))
        </div>
      )}

      <div className="newsFeedModal__content">
        {thisMonthTasks?.length !== 0 ? (
          <ul className="newsFeedModal__list">
            {thisMonthTasks?.map((task: any) => (
              <CalendarEvent task={task} />
            ))}
          </ul>
        ) : (
          <div className="newsFeedModal__text-container">
            <img src={relax} alt="xx" className="newsFeedModal__photo" />
          </div>
        )}
      </div>
    </div>
  );
}
