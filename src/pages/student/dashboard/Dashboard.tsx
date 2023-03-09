import LuckyNumberModal from "../../../layout/homePage/LuckyNumber/LuckyNumberModal";
import NewsFeedModal from "../../../layout/homePage/NewsFeed/NewsFeedModal";
import NavBar from "../../../layout/NavBar/NavBar";
import { useAuth } from "../../../store/authContext";
import { usePickedClas } from "../../../store/pickedClass";
import { db } from "../../../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect } from "react";
import { usePickedUser } from "../../../store/pickedUser";

export default function Home() {
  const { currentUser } = useAuth();
  const { handlePickedClas } = usePickedClas();
  const { handlePickedUser } = usePickedUser();

  const fetchUsers = async () => {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    const us1 = data?.filter((obj: any) => {
      return obj.email === currentUser.email;
    });

    handlePickedUser(us1[0]);
    handlePickedClas(us1[0].atrribute);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="Dashboard__content">
        <div className="Dashboard__row">
          <div className="Dashboard__col">
            {" "}
            <NewsFeedModal />
          </div>

          <div className="Dashboard__col">
            <div className="Dashboard__column">
              <div className="center">
                <LuckyNumberModal />
              </div>
              <div className="dashboard__container-center">
                <div className="Dashboard__ilustration2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
