import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { logo } from "../assets";

type userInfo = {
  userName: string;
  companyName: string;
};

type Props = {
  userInfo?: userInfo;
  open: boolean;
  drawerWidth: number;
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerWidth: number;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Navbar = (props: Props) => {
  return (
    <AppBar
      position="absolute"
      open={props.open}
      drawerWidth={props.drawerWidth}
    >
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Image {...logo} width="128" height="32" alt="brand" />
          <Box sx={{ padding: "0 0.5rem", display: "inline-flex" }}>
            <Typography variant="subtitle2" color="text.secondary">
              powered by
            </Typography>
          </Box>
          <Image
            {...logo}
            width="72"
            height="18"
            alt="powered-brand"
            style={{
              position: "relative",
              top: 4,
            }}
          />
        </Box>
        <>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="subtitle2" color="text.secondary">
              {props.userInfo?.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {props.userInfo?.companyName}
            </Typography>
          </Box>
          <IconButton color="default">
            <Avatar />
          </IconButton>
          <IconButton color="default">
            <LogoutOutlined />
          </IconButton>
        </>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
