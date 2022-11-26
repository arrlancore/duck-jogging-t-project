import { Menu } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import {
  Divider,
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Image from "next/image";
import React from "react";

interface DrawerProps extends MuiDrawerProps {
  drawerWidth: number;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<DrawerProps>(({ theme, open, drawerWidth }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Sidebar = (props: {
  open: boolean;
  drawerWidth: number;
  children: JSX.Element;
  toggleDrawer: () => void;
}) => {
  return (
    <Drawer
      variant="permanent"
      drawerWidth={props.drawerWidth}
      open={props.open}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={props.toggleDrawer}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      {props.children}
    </Drawer>
  );
};

export default Sidebar;
