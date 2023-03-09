import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SingleStudentGrade from "../../../../../components/grades/SingleStudentGrade";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import { db } from "../../../../../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { usePickedClas } from "../../../../../store/pickedClass";

export type user = {
  atrribute: String;
  email: String;
  id: String;
  isTeacher: Boolean;
  password: String;
  username: String;
};

export default function Grades() {
  const [allSubjects, setAllSubjects] = useState<String | any>();
  const [pickedSubject, setPickedSubject] = useState<String | any>();
  const [students, setStudents] = useState<user[] | any>();
  const { pickedClas } = usePickedClas();

  const fetchSubjects = async () => {
    const subts: any = [];
    const uniqeSubts: any = [];

    const q = query(collection(db, "SchedualLessons"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    const lessons = data.filter((obj) => {
      return obj.class === pickedClas;
    });
    const subjects = lessons.map((obj) => {
      return subts.push(obj.mainInfo?.toString().split("-")[0]);
    });
    subts.forEach((object: String) => {
      if (!uniqeSubts.includes(object)) {
        uniqeSubts.push(object);
      }
    });
    setAllSubjects(uniqeSubts);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

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
    console.log(fetchedStudentsDataClass);
    setStudents(fetchedStudentsDataClass);
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPickedSubject(e.target.value);
  };

  return (
    <>
      <div className="ClassGrades">
        <div className="ClassGrades__header">
          <div className="ClassGrades__container-row1">
            <Link to={"/Teacher/ManageClasses"} className="ClassGrades__link">
              <ArrowBackIosIcon fontSize="large" />
            </Link>
            <div className="ClassGrades-title">Class {pickedClas}</div>
          </div>
          <div className="grade__utility-term">
            <select onChange={handleSubjectChange}>
              <option value="0">Pick subject</option>
              {allSubjects?.map((subject: any) => (
                <option>{subject}</option>
              ))}
            </select>
          </div>
        </div>
        {pickedSubject && (
          <div className="ClassGrades__content">
            {students?.map((student: user) => (
              <SingleStudentGrade
                userId={student.id}
                username={student.username}
                student={student}
                subject={pickedSubject}
              />
            ))}
          </div>
        )}

        <div className="Messages__btn-add">
          <Link
            to={"/Teacher/ManageClasses/AddMultipleGrades"}
            className="ClassGrades__link"
          >
            <AddIcon fontSize="large" />
          </Link>
        </div>
      </div>
    </>
  );
}
