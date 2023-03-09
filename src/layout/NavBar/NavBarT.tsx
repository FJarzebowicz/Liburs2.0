// import profilePhoto from "../../assets/profilePhoto.jpg";
import { useDispatch } from "react-redux";

import MenuDrawerTeacher from "../../components/menuDrawer/MenuDrawerTeacher";

import { setIsTMenuOpen } from "../../store/utilitySlices/menuSlice";

export default function NavBarT() {
  const openModal = () => {
    return dispatch(setIsTMenuOpen(true));
  };

  const dispatch = useDispatch();
  return (
    <div className="navigation__container">
      <div className="navigation__menu-container">
        <MenuDrawerTeacher />
        <div className="navigation__container-row">
          <img
            src={require("../../assets/menu.png")}
            className="navigation__menu-icon"
            alt="menu"
            onClick={() => openModal()}
          />
          <div className="navigation__logo">Librus</div>
          <div className="navigation__label">For Teachers</div>
        </div>
      </div>
    </div>
  );
}
