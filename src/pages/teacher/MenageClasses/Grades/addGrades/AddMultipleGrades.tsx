import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";
import { useEffect, useState } from "react";
import { usePickedClas } from "../../../../../store/pickedClass";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type user = {
  atrribute: String;
  email: String;
  id: String;
  isTeacher: Boolean;
  password: String;
  username: String;
};

export type Lesson = {
  class: String;
  day: String;
  mainInfo: String | any;
  room: String;
  time: String;
};

export default function AddMultipleGrades() {
  const [students, setStudents] = useState<user[] | any>();
  const [subject, setSubject] = useState<String | any>();
  const [wage, setWage] = useState<String | any>();
  const [category, setCategory] = useState<String | any>();
  const [teachers, setTeachers] = useState<String | any>();
  const [sbjTeachers, setSbjTeachers] = useState<String | any>();
  const [teacher, setTeacher] = useState<String | any>();
  const tempGrades: any = [];
  const navigate = useNavigate();

  const notify = () =>
    toast.success("Grades added ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyProblem = () =>
    toast.error("sth is wrong. Check the form", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const { pickedClas } = usePickedClas();
  const [allLessons, setAllLessons] = useState<Object[] | any>();

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
    setAllLessons(uniqeSubts);
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

    setStudents(fetchedStudentsDataClass);
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchTeachers = async () => {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    const fetchedTeacherssData = data.filter((obj) => {
      return obj.isTeacher === true;
    });
    setTeachers(fetchedTeacherssData);
  };
  useEffect(() => {
    fetchTeachers();
  }, []);

  const grades = ["1", "2", "3", "4", "5", "6"];

  const categories = [
    "Exam",
    "Test",
    "ShortTest",
    "Speaking test",
    "Homework",
    "Work in class",
    "other",
  ];

  const wages = ["0", "1", "2", "3", "4"];
  async function submitTempGrades(id: any, name: any, gr: any) {
    try {
      const docRef = await addDoc(collection(db, "Grades"), {
        studentId: id,
        studentName: name,
        grade: gr,
        wage: wage,
        subject: subject,
        class: pickedClas,
        teacher: teacher,
        category: category,
      });
    } catch (error) {
      notifyProblem();
    }
  }

  async function submitAllGrades() {
    if (wage === "" || subject === "" || teacher === "" || category === "") {
      notifyProblem();
    }
    if (
      wage === undefined ||
      subject === undefined ||
      teacher === undefined ||
      category === undefined
    ) {
      notifyProblem();
    } else {
      await tempGrades.map((obj: any) => {
        return submitTempGrades(obj.studentId, obj.studentName, obj.grade);
      });
      await notify();
      navigate("/Teacher/ManageClasses/Grades");
    }
  }

  const Student = (student: user | any) => {
    const checkDuplicate = () => {
      return tempGrades.find(
        (obj: any) => obj.studentId === student.student.id
      );
    };

    async function addTempGrade(gradeX: any) {
      if (checkDuplicate() !== undefined) {
        const index = tempGrades.findIndex(
          (obj: any) => obj.studentId === student.student.id
        );
        console.log(index);
        await tempGrades.splice(index, 1);
        await tempGrades.push({
          studentId: student.student.id,
          studentName: student.student.username,
          grade: gradeX,
        });
      }
      if (checkDuplicate() === undefined) {
        tempGrades.push({
          studentId: student.student.id,
          studentName: student.student.username,
          grade: gradeX,
        });
      }
    }

    return (
      <div className="AddGrade__student">
        <div className="AddGrade__container-row1">
          <div className="AddGrade__student-name">
            {student.student.username}
          </div>

          <div className="AddGrade__container-row1">
            <select
              className="AddGrade__select-small"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                addTempGrade(e.target.value)
              }
            >
              {" "}
              <option></option>
              {grades?.map((obj) => (
                <option>{obj}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  };

  function validateTeacher() {
    const x = teachers?.filter((obj: any) => {
      return obj.atrribute === subject;
    });
    setSbjTeachers(x);
  }

  useEffect(() => {
    validateTeacher();
  }, [subject]);

  return (
    <div className="AddGrade">
      <div className="AddGrade__container-row1">
        <div className="AddGrade__container-row">
          <Link
            to={"/Teacher/ManageClasses/Grades"}
            className="ClassGrades__link"
          >
            <ArrowBackIosIcon fontSize="large" />
          </Link>

          <div className="AddGrade__title">Add new grade</div>
        </div>
        <div onClick={submitAllGrades} className="AddGrade__btn">
          Add
        </div>
      </div>
      <div className="AddGrade__form">
        <div className="AddGrade__container-row2">
          <div className="AddGrade__container-column">
            <div className="AddGrade__form-Mcategory">
              <div className="AddGrade__form-label">Pick subject</div>
              <select
                className="AddGrade__select AddGrade__select-blue"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSubject(e.target.value)
                }
              >
                {" "}
                <option></option>
                {allLessons?.map((obj: String | any) => (
                  <option>{obj}</option>
                ))}
              </select>
            </div>
            {subject && (
              <div className="AddGrade__form-Mcategory">
                <div className="AddGrade__form-label">Pick Teacher</div>
                <select
                  className="AddGrade__select AddGrade__select-red"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setTeacher(e.target.value)
                  }
                >
                  {" "}
                  <option></option>
                  {sbjTeachers?.map((obj: String | any) => (
                    <option>{obj.username}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="AddGrade__form-Mcategory">
              <div className="AddGrade__form-label">Pick cateogry</div>
              <select
                className="AddGrade__select AddGrade__select-teal"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setCategory(e.target.value)
                }
              >
                <option></option>
                {categories?.map((obj) => (
                  <option>{obj}</option>
                ))}
              </select>
            </div>

            <div className="AddGrade__container-row">
              <div className="AddGrade__form-wage">
                <div className="AddGrade__form-label">Pick wage</div>
                <select
                  className="AddGrade__select AddGrade__select-yellow"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setWage(e.target.value)
                  }
                >
                  <option></option>
                  {wages?.map((obj) => (
                    <option>{obj}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="AddGrade__students">
            {students?.map((student: user) => (
              <Student student={student} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
