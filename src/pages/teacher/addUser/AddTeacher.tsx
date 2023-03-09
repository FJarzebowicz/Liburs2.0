import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/authContext";
import { db } from "../../../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type Subject = {
  name: String | any;
  id: String | any;
};

export default function AddTeacher() {
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const [subcjets, setSubjects] = useState<Subject[] | any>();
  const [subject, setSubject] = useState(String);
  const [username, setUsername] = useState(String);
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

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { signup } = useAuth();

  const fetchSubjects = async () => {
    const q = query(collection(db, "Subjects"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    setSubjects(data);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  async function handleSubmit() {
    const isTeacher = true;

    try {
      setError("");
      await signup(email, password, subject, isTeacher, username);
      notifySuccess("New user added succesfully");
      navigate("/Teacher/Users");
    } catch (error) {
      setError("error");
    }
  }
  const validate = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && subject && username) {
      handleSubmit();
    } else {
      notifyError("Sth is missing. Check the form");
    }
  };
  return (
    <div className="AddStudent">
      <div className="AddCalendarEvent__header">
        <div className="AddGrade__container-row1">
          <div className="AddGrade__container-row">
            <Link to={"/Teacher/Users"} className="ClassGrades__link">
              <ArrowBackIosIcon fontSize="large" />
            </Link>

            <div className="AddGrade__title">Add Teacher</div>
          </div>
          <div className="AddGrade__btn" onClick={validate}>
            Add
          </div>
        </div>
      </div>
      <div className="AddStudent__form">
        <input
          className="AddStudent__form-input"
          placeholder="Write  email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />
        <input
          className="AddStudent__form-input"
          placeholder="Write password"
          value={password}
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />
        <input
          className="AddStudent__form-input"
          placeholder="Write username"
          value={username}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          required
        />
        <select
          className="AddStudent__select"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSubject(e.target.value)
          }
        >
          <option></option>
          {subcjets?.map((obj: Subject) => (
            <option value={obj.name} key={obj.id}>
              {obj.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
