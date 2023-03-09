import NavBarT from "../../../../layout/NavBar/NavBarT";
import { useNavigate } from "react-router-dom";
import { db } from "../../../../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { usePickedClas } from "../../../../store/pickedClass";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type Class = {
  name: String | any;
  id: String | any;
};

export default function MenageClasses() {
  const [classs, setClasss] = useState(String);
  const [classes, setClasses] = useState<Class[] | any>();

  const { handlePickedClas } = usePickedClas();
  const { pickedClas } = usePickedClas();
  const navigate = useNavigate();

  const fetchSubjects = async () => {
    const q = query(collection(db, "Classes"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    setClasses(data);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    handlePickedClas(classs);
  }, [classs]);
  const notify = () =>
    toast.error("You need to pick class", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  async function navigateTo(path: string) {
    if (pickedClas) {
      navigate(path);
    } else {
      notify();
    }
  }

  return (
    <div className="MenageClasses__whole">
      <header>
        <NavBarT />
      </header>
      <div className="MenageClasses">
        <select
          className="MenageClasses__select"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setClasss(e.target.value)
          }
        >
          {classes?.map((obj: Class) => (
            <option
              value={obj.name}
              key={obj.id}
              className="ManageClasses__select-option"
            >
              {obj.name}
            </option>
          ))}
        </select>
        <div className="MenageClasses__menu">
          <div
            className="MenageClasses__menu-element MenageClasses__menu-element-green "
            onClick={() => navigateTo("/Teacher/ManageClasses/Grades")}
          >
            <div className="MenageClasses__element-title">Grades</div>
          </div>

          <div
            className="MenageClasses__menu-element MenageClasses__menu-element-orange"
            onClick={() => navigateTo("/Teacher/ManageClasses/Schedual")}
          >
            <div className="MenageClasses__element-title">Schedule</div>
          </div>

          <div
            className="MenageClasses__menu-element MenageClasses__menu-element-red"
            onClick={() => navigateTo("/Teacher/ManageClasses/Attendance")}
          >
            <div className="MenageClasses__element-title">Attendance</div>
          </div>

          <div
            className="MenageClasses__menu-element MenageClasses__menu-element-yellow"
            onClick={() => navigateTo("/Teacher/ManageClasses/Homework")}
          >
            <div className="MenageClasses__element-title">Homework</div>
          </div>

          <div
            className="MenageClasses__menu-element MenageClasses__menu-element-blue"
            onClick={() => navigateTo("/Teacher/ManageClasses/Calendar")}
          >
            <div className="MenageClasses__element-title">Calendar</div>
          </div>
        </div>
      </div>
    </div>
  );
}
