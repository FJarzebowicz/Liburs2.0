import NavBarT from "../../../layout/NavBar/NavBarT";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";

type IUser = {
  atrribute: String;
  email: String;
  id: String;
  isTeacher: Boolean;
  password: String;
  username: String;
};

export default function Users() {
  const [users, setUsers] = useState<IUser[] | any>();

  const fetchUsers = async () => {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const teachers = users?.filter((obj: IUser) => {
    return obj.isTeacher === true;
  });
  const students = users?.filter((obj: IUser) => {
    return obj.isTeacher === false;
  });
  return (
    <>
      <div className="Users">
        <header>
          <NavBarT />
        </header>
        <div className="Users__content">
          <div className="Users__category col-1-of-2">
            <div className="Users__header">
              <div className="Users__label">Teachers</div>
              <Link to={"/Teacher/add-teacher"} className="Users__link">
                <AddIcon fontSize="small" />
              </Link>
            </div>
            <div className="Users__teachers">
              {teachers?.map((teacher: any) => (
                <div className="Users__teacher">
                  <div className="Users__teachers-name">{teacher.username}</div>
                  <div className="Users__teachers-subcjet">
                    Subject {teacher.atrribute}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="Users__category col-1-of-2">
            <div className="Users__header">
              <div className="Users__label">Students</div>
              <Link to={"/Teacher/add-student"} className="Users__link">
                <AddIcon fontSize="small" />
              </Link>
            </div>
            <div className="Users__student">
              {students?.map((teacher: any) => (
                <div className="Users__teacher">
                  <div className="Users__teachers-name">{teacher.username}</div>
                  <div className="Users__teachers-subcjet">
                    Class{teacher.atrribute}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
