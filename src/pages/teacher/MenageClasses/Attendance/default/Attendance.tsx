import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { usePickedClas } from "../../../../../store/pickedClass";
import { db } from "../../../../../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePickedUser } from "../../../../../store/pickedUser";

export type user = {
  atrribute: String;
  email: String;
  id: String;
  isTeacher: Boolean;
  password: String;
  username: String;
};

export default function Attendance() {
  const { pickedClas } = usePickedClas();
  const [students, setStudents] = useState<user[] | any>();
  const { handlePickedUser } = usePickedUser();
  const [sortedStudents, setSortedStudents] = useState<user[] | any>();
  const navigate = useNavigate();

  const fetchStudents = async () => {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    const fetchedStudentsData = data.filter((obj) => {
      return obj.isTeacher === false;
    });
    const fetchedStudentsDataClass = fetchedStudentsData.filter((obj) => {
      return obj.atrribute === pickedClas;
    });
    setStudents(fetchedStudentsDataClass);
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  function sortUsers() {
    const sortedS = students?.sort((a: any, b: any) =>
      a.username.split(" ")[0].localeCompare(b.username.split(" ")[0])
    );
    setSortedStudents(sortedS);
  }
  useEffect(() => {
    sortUsers();
  }, [students]);

  const MapStudents = ({ student }: any) => {
    const handleClick = () => {
      handlePickedUser(student);
      navigate("UserDetails");
    };
    return (
      <div className="MAttendance__student " onClick={handleClick}>
        <div className="MAttendance__student-name">{student.username}</div>
      </div>
    );
  };

  return (
    <>
      <div className="MAttendance">
        <div className="MAttendance__header">
          <div className="MAttendance__container-row">
            <Link to={"/Teacher/ManageClasses"} className="ClassGrades__link">
              <ArrowBackIosIcon fontSize="large" />
            </Link>
            <div className="MAttendance__header-title">Class {pickedClas}</div>
          </div>
        </div>
        <div className="MAttendance__content">
          {sortedStudents?.map((student: user) => (
            <MapStudents student={student} />
          ))}
        </div>

        <Link
          to={"/Teacher/ManageClasses/AddAttendance"}
          className="ClassGrades__link"
        >
          <div className="Messages__btn-add">
            <AddIcon fontSize="large" />
          </div>
        </Link>
      </div>
    </>
  );
}
