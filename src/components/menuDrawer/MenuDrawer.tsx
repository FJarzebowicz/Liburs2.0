import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsMenuOpen } from "../../store/utilitySlices/menuSlice";
import { slicesState } from "../../store/utilitySlices/menuTypes";

type Anchor = "left";

export default function MenuDrawer() {
  const categories = useSelector(
    (state: slicesState) => state.menuSlice.categories
  );
  const isOpened = useSelector(
    (state: slicesState) => state.menuSlice.isOpened
  );
  const dispatch = useDispatch();

  const toggleDrawer = (open: boolean) => () => {
    dispatch(setIsMenuOpen(open));
  };

  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {categories?.map((name: string, index: number) => (
          <Link to={`/Student/${name}`} className="menu__link">
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <div className="menu__title">{name}</div>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
  return (
    <Drawer anchor="left" open={isOpened} onClose={toggleDrawer(false)}>
      {list("left")}
    </Drawer>
  );
}
