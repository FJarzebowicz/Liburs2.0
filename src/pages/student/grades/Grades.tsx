import SingleSubcjetGrade from "../../../components/grades/SingleSubcjetGrade";
import NavBar from "../../../layout/NavBar/NavBar";
import { db } from "../../../firebase/firebase";
import { usePickedClas } from "../../../store/pickedClass";
import { collection, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function SGrades() {
  const { pickedClas } = usePickedClas();
  const [lessons, setLessons] = useState<any>();

  const fetchLessons = async () => {
    const lessons: any = [];
    const uniqeLessons: any = [];
    const q = query(collection(db, "SchedualLessons"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    const x = data.filter((obj: any) => {
      return (obj.class = pickedClas);
    });
    x.map((obj) => {
      return lessons.push(obj.mainInfo?.toString().split("-")[0]);
    });
    lessons.forEach((object: String) => {
      if (!uniqeLessons.includes(object)) {
        uniqeLessons.push(object);
      }
    });
    setLessons(uniqeLessons);
  };
  console.log(lessons);
  useEffect(() => {
    fetchLessons();
  }, []);
  return (
    <>
      <NavBar />
      <div className="grades">
        {lessons?.map((subject: String) => (
          <SingleSubcjetGrade key={subject} subject={subject} />
        ))}
      </div>
    </>
  );
}
