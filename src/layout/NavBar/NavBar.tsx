import MenuDrawer from "../../components/menuDrawer/MenuDrawer";
import { useDispatch } from "react-redux";
import { setIsMenuOpen } from "../../store/utilitySlices/menuSlice";

export default function NavBar() {
  const openModal = () => {
    return dispatch(setIsMenuOpen(true));
  };

  const dispatch = useDispatch();
  return (
    <div className="navigation__container">
      <MenuDrawer />
      <div className="navigation__container-row">
        <img
          src={require("../../assets/menu.png")}
          className="navigation__menu-icon"
          alt="menu"
          onClick={() => openModal()}
        />
        <div className="navigation__logo">Librus</div>
      </div>
    </div>
  );
}
