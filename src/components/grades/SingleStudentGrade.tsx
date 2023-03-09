import { useState, useEffect } from "react";

import * as React from "react";
import { db } from "../../firebase/firebase";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { Modal } from "react-rainbow-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type user = {
  atrribute: String;
  email: String;
  id: String;
  isTeacher: Boolean;
  password: String;
  username: String;
};

type props = {
  userId: String;
  username: String;
  student: user;
  subject: String;
};

export default function SingleStudentGrade({
  userId,
  username,
  student,
  subject,
}: props) {
  const [grades, setGrades] = useState<String[] | any>(null);
  const [modalOpened, setModalOpened] = useState(Boolean);
  const [modalInfo, setModalInfo] = useState<any>();

  const fetchUserGrades = async () => {
    const q = query(collection(db, "Grades"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    const gr = data.filter((obj) => {
      return obj.studentId === userId;
    });

    const gr2 = gr.filter((obj) => {
      return obj.subject === subject;
    });
    setGrades(gr2);
  };

  useEffect(() => {
    fetchUserGrades();
  }, [subject]);

  const notify = () =>
    toast.success("Grade deleted", {
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
    toast.success("There is a problem. Grade not deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const GradeModal = () => {
    console.log(modalInfo);
    const closeModal = () => {
      setModalOpened(false);
      setModalInfo(null);
    };

    async function handleDeleteClick() {
      try {
        const reference = doc(db, "Grades", modalInfo?.id);
        await deleteDoc(reference);
        setModalOpened(false);
        setModalInfo(null);
        fetchUserGrades();
        notify();
      } catch (error) {
        notifyProblem();
      }
    }
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
        <div className="grade__modal-center">
          <div className="grade__modal-dlt" onClick={handleDeleteClick}>
            Delete
          </div>
        </div>
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
    <>
      <div className="grade">
        <GradeModal />
        <div className="grade__container-row1">
          <div>
            <div className="grade__utility">
              <div className="grade__utility-subcjet">{username}</div>
            </div>
            <div className="grade__grades">
              <ul className="grade__list">
                {grades?.map((grade: Object | any) => (
                  <SingleGrade gr={grade} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
