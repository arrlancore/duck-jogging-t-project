import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import { useRouter } from "next/router";
import { dashboard } from "../src/assets";
import useFetch from "../src/api/useFetch";
import { TMocksResponse } from "./api/mocks";
import BackdropComponent from "../src/components/Backdrop";
import Navbar from "../src/components/Navbar";
import Sidebar from "../src/components/Sidebar";
import Heading from "../src/components/Heading";
import { addDays } from "date-fns";
import SalesTurnover from "../src/components/SalesTurnoverCard";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import AveragePurchaseCard from "../src/components/AveragePurchaseCard";
import ProductSKUCard from "../src/components/ProductSkuCard";
import { createDataAPVChart } from "../src/utils";
import { DateRange } from "../src/commonsType";

const drawerWidth: number = 240;

function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const [expandFilter, setExpandFilter] = React.useState(false);
  const [dateRanges, setDateRanges] = React.useState<DateRange>({
    endDate: new Date(),
    startDate: addDays(new Date(), -7),
  });
  const router = useRouter();
  const { data } = useFetch<TMocksResponse>("/api/mocks");

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const onDateRangeChange = (newRange: DateRange) => {
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
          backgroundColor: (theme) => theme.palette.grey[100],
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
              {/* MARKET INSIGHT SECTION */}
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
                      <SalesTurnover
                        total={data?.salesTurnover.total ?? 0}
                        percentage={data?.salesTurnover.percentage ?? 0}
                        status={data?.salesTurnover.status ?? ""}
                      />
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                      <Grid
                        flexWrap="wrap"
                        alignItems="stretch"
                        container
                        spacing={2}
                      >
                        <Grid item xs={12} md={6}>
                          <AveragePurchaseCard
                            data={createDataAPVChart(
                              data?.purchases ?? [],
                              dateRanges
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <ProductSKUCard
                            title="BEST SELLING SKU"
                            products={data?.listSku ?? []}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <ProductSKUCard
                            title="TOP COMPETITOR SKU"
                            products={data?.listSku ?? []}
                          />
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
