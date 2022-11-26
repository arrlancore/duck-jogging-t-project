import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import { useRouter } from "next/router";

import Copyright from "../src/components/Copyright";
import { dashboard, logo } from "../src/assets";
import useFetch from "../src/api/useFetch";
import { TMocks } from "./api/mocks";
import BackdropComponent from "../src/components/Backdrop";
import Navbar from "../src/components/Navbar";
import Sidebar from "../src/components/Sidebar";
import Heading from "../src/components/Heading";
import { addDays } from "date-fns";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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

function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const [expandFilter, setExpandFilter] = React.useState(false);
  const [dateRanges, setDateRanges] = React.useState({
    endDate: new Date(),
    startDate: addDays(new Date(), -7),
  });
  const router = useRouter();
  const { data } = useFetch<TMocks>("/api/mocks");

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const onDateRangeChange = (newRange) => {
    console.log(newRange);
    setExpandFilter(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <BackdropComponent open={!data} />
      <Navbar open={open} drawerWidth={drawerWidth} userInfo={data?.userInfo} />
      <Sidebar
        drawerWidth={drawerWidth}
        open={open}
        toggleDrawer={toggleDrawer}
      >
        <List component="nav">
          <ListItemButton onClick={toggleDrawer}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Menu" />
          </ListItemButton>
          <ListItemButton
            selected // TODO: make it dynamic when we have more menu
            onClick={() => router.push("/")}
          >
            <ListItemIcon>
              <Image
                {...dashboard}
                alt="menu-dashboard"
                width="24"
                height="24"
              />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </List>
      </Sidebar>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Heading
            expand={expandFilter}
            onToggle={() => setExpandFilter((prev) => !prev)}
            onFilterChange={onDateRangeChange}
            defaultDateRange={dateRanges}
          />
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                {/* <Chart /> */}
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                {/* <Deposits /> */}
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                {/* <Orders /> */}
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}

export default DashboardContent;
