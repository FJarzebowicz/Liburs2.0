import { useState, useEffect } from "react";
import * as React from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { usePickedUser } from "../../store/pickedUser";

import { Modal } from "react-rainbow-components";
export type grades = {
  class: String;
  grade: String;
  studentId: String;
  studentName: String;
  subject: String;
  wage: String;
};

export default function SingleSubcjetGrade({ subject }: any) {
  const { pickedUser } = usePickedUser();

  const [grades, setGrades] = useState<any>();
  const [modalOpened, setModalOpened] = useState(Boolean);
  const [modalInfo, setModalInfo] = useState<any>();

  const fetchGrades = async () => {
    const q = query(collection(db, "Grades"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    const subjectGrades = data.filter((grade: any) => {
      return grade.subject === subject;
    });
    const userGrades = subjectGrades.filter((grade: any) => {
      return grade.studentId === pickedUser.id;
    });
    setGrades(userGrades);
  };
  useEffect(() => {
    fetchGrades();
  }, []);

  const GradeModal = () => {
    const closeModal = () => {
      setModalOpened(false);
      setModalInfo(null);
    };

    return (
      <Modal
        isOpen={modalOpened}
        onRequestClose={closeModal}
        className="grade__modal "
      >
        <div className="grade__modal-center">
          <div className="grade__modal-heading">{modalInfo?.subject}</div>
        </div>
        <div className="grade__modal-text">category: {modalInfo?.category}</div>
        <div className="grade__modal-text">grade: {modalInfo?.grade}</div>
        <div className="grade__modal-text">wage: {modalInfo?.wage}</div>

        <div className="grade__modal-text"> teacher: {modalInfo?.teacher}</div>
      </Modal>
    );
  };

  const SingleGrade = ({ gr }: any) => {
    const [theme, setTheme] = useState(String);
    const grade = gr.grade;
    const pickTheme = () => {
      if (grade === "1") {
        setTheme("SingleGrade-red");
      }
      if (grade === "2") {
        setTheme("SingleGrade-orange");
      }
      if (grade === "3") {
        setTheme("SingleGrade-yellow");
      }
      if (grade === "4") {
        setTheme("SingleGrade-blue");
      }
      if (grade === "5") {
        setTheme("SingleGrade-teal");
      }
      if (grade === "6") {
        setTheme("SingleGrade-green");
      }
    };

    useEffect(() => {
      pickTheme();
    }, []);

    const openModal = () => {
      setModalInfo(gr);
      setModalOpened(true);
    };
    return (
      <div onClick={openModal}>
        <li className={`grade__grade ${theme}`}>{gr.grade}</li>
      </div>
    );
  };

  return (
    <div className="grade">
      <GradeModal />
      <div className="grade__utility">
        <div className="grade__utility-subcjet">{subject}</div>
        <div className="grade__utility-term"></div>
      </div>
      <div className="grade__grades">
        <ul className="grade__list">
          {grades?.map((grade: Object | any) => (
            <SingleGrade gr={grade} />
          ))}
        </ul>
      </div>
    </div>
  );
}
