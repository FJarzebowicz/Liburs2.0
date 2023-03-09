import NavBar from "../../../../layout/NavBar/NavBar";
import { db } from "../../../../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { usePickedClas } from "../../../../store/pickedClass";
import { useState, useEffect } from "react";
import { usePickedUser } from "../../../../store/pickedUser";
import { useNavigate } from "react-router-dom";

export type IHomework = {
  class: String;
  date: String;
  description: String;
  title: String;
};
export default function SHomework() {
  const [homeworks, setHomeworks] = useState<IHomework[] | any>();
  const { pickedClas } = usePickedClas();
  const { handleModalObject } = usePickedUser();

  const navigate = useNavigate();
  const fetchHomeworks = async () => {
    const q = query(collection(db, "Homework"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    const lessons = data.filter((obj) => {
      return obj.class === pickedClas;
    });
    setHomeworks(lessons);
  };

  useEffect(() => {
    fetchHomeworks();
  }, []);

  const SingleHomework = ({ homework }: any) => {
    const [theme, setTheme] = useState(String);

    const pickTheme = () => {
      if (homework.color === "red") {
        setTheme("Homework-red");
      }
      if (homework.color === "teal") {
        setTheme("Homework-teal");
      }
      if (homework.color === "blue") {
        setTheme("Homework-blue");
      }
      if (homework.color === "pink") {
        setTheme("Homework-pink");
      }
      if (homework.color === "orange") {
        setTheme("Homework-orange");
      }
      if (homework.color === "yellow") {
        setTheme("Homework-yellow");
      }
      if (homework.color === "purple") {
        setTheme("Homework-purple");
      }
      if (homework.color === "green") {
        setTheme("Homework-green");
      }
    };

    useEffect(() => {
      pickTheme();
    }, []);

    async function handleClick() {
      await handleModalObject(homework);
      navigate("/Student/Homework/HomeworkDetails");
    }
    return (
      <div className={`Homework ${theme}`} onClick={handleClick}>
        <div className="Homework-name">{homework.title}</div>
        <div className="Homework-container">
          <div className="Homework-Deadline">
            {" "}
            {homework.date.split(" ")[0]} {homework.date.split(" ")[1]}{" "}
            {homework.date.split(" ")[2]}
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <NavBar />
      <div className="MHomework__content1">
        <div className="MHomework__container">
          {homeworks?.map((homework: IHomework) => (
            <SingleHomework homework={homework} />
          ))}
        </div>
      </div>
    </>
  );
}
