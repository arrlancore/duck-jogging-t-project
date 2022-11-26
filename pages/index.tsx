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
import { TMocks, TMocksResponse, TPurchase } from "./api/mocks";
import BackdropComponent from "../src/components/Backdrop";
import Navbar from "../src/components/Navbar";
import Sidebar from "../src/components/Sidebar";
import Heading from "../src/components/Heading";
import { addDays, format, isAfter, isBefore, isEqual } from "date-fns";
import SalesTurnover from "../src/components/SalesTurnoverCard";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import AveragePurchaseCard from "../src/components/AveragePurchaseCard";
import ProductSKUCard from "../src/components/ProductSkuCard";

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

function createDataAPVChart(list: TPurchase[], { startDate, endDate }) {
  type TPurchaseChart = TPurchase & { name: string };

  const purchaseList: TPurchaseChart[] = [];
  for (let i = 0; i < list.length; i++) {
    const data = list[i];
    const target = new Date(data.date);
    if (
      (isAfter(target, startDate) || isEqual(target, startDate)) &&
      (isBefore(target, endDate) || isEqual(target, endDate))
    ) {
      purchaseList.push({ ...data, name: format(target, "dd/MM/yyyy") });
    }
  }

  return purchaseList;
}

function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const [expandFilter, setExpandFilter] = React.useState(false);
  const [dateRanges, setDateRanges] = React.useState({
    endDate: new Date(),
    startDate: addDays(new Date(), -7),
  });
  const router = useRouter();
  const { data } = useFetch<TMocksResponse>("/api/mocks");

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const onDateRangeChange = (newRange) => {
    setExpandFilter(false);
    setDateRanges(newRange);
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

        <Container
          maxWidth="xl"
          sx={{ mt: 4, mb: 4, minHeight: "calc(100% - 164px)" }}
        >
          <Heading
            expand={expandFilter}
            onToggle={() => setExpandFilter((prev) => !prev)}
            onFilterChange={onDateRangeChange}
            dateRange={dateRanges}
          />
          <Grid container spacing={3}>
            <Grid xs={12} sx={{ paddingLeft: "24px", paddingTop: "24px" }}>
              <Accordion
                defaultExpanded
                sx={{ background: "transparent", boxShadow: "none" }}
              >
                <AccordionSummary
                  sx={{ background: "#37B04C" }}
                  expandIcon={<ExpandMore color="primary" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    fontWeight={"bold"}
                    fontSize={"20px"}
                    variant="h3"
                    color={"white"}
                  >
                    MARKET INSIGHT
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ background: "transparent", padding: "24px 0" }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={3}>
                      <SalesTurnover />
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <AveragePurchaseCard
                            data={createDataAPVChart(
                              data?.purchases ?? [],
                              dateRanges
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <ProductSKUCard />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Paper
                            sx={{
                              p: 2,
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {/* <Orders /> */}
                          </Paper>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default DashboardContent;
