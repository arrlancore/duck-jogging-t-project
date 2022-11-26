import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import { Container, Grid, IconButton, ListItemButton } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import constants from "../constants";
import Image from "next/image";
import { calendar } from "../assets";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import {
  formatDateForFilter,
  getCurrentDateArray,
  getPredefinedRanges,
} from "../utils";
import { DateRange } from "../commonsType";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const filterVariants = [
  {
    title: "Today",
    type: "today",
  },
  {
    title: "Yesterday",
    type: "yesterday",
  },
  {
    title: "Last 7 days",
    type: "last7",
  },
  {
    title: "Last 30 days",
    type: "last30",
  },
  {
    title: "This Month",
    type: "this_month",
  },
  {
    title: "Custom",
    type: "custom",
  },
];

type HeadingProps = {
  expand: boolean;
  onToggle: () => void;
  onFilterChange: (arg: DateRange) => void;
  dateRange: DateRange;
  title: string;
};

type DateFilterDialogProps = {
  open: boolean;
  onToggle: () => void;
  onFilterChange: (arg: DateRange) => void;
  defaultDateRange: DateRange;
};

function DateFilterDialog({
  open,
  onToggle,
  onFilterChange,
  defaultDateRange,
}: DateFilterDialogProps) {
  const [filterType, setFilterType] = useState("last7");
  const [dateRanges, setDateRanges] = useState([
    {
      key: "selection",
      ...defaultDateRange,
    },
  ]);
  const [year, month, day] = getCurrentDateArray();
  const predefinedRanges = getPredefinedRanges([year, month, day]);

  const onDateRangeChange = (item: RangeKeyDict) => {
    setDateRanges([
      {
        startDate: item.selection.startDate || new Date(),
        endDate: item.selection.endDate || new Date(),
        key: item.selection.key || "",
      },
    ]);
    if (filterType !== "custom") {
      setFilterType("custom");
    }
  };

  const onDateRangeChangeApplied = ({ startDate, endDate }: DateRange) =>
    onFilterChange({ startDate, endDate });

  useEffect(() => {
    const range = predefinedRanges.ranges[filterType];
    setDateRanges((prev) => [{ ...prev[0], ...range }]);
  }, [filterType]);

  return (
    <Dialog
      maxWidth="lg"
      open={open}
      onClose={onToggle}
      TransitionComponent={Transition}
    >
      <Container sx={{ padding: 2 }}>
        <AppBar sx={{ position: "relative", boxShadow: "none" }}>
          <Toolbar>
            <Image {...calendar} alt="calendar" />
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Period
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onToggle}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
          }}
          container
        >
          <Grid sx={{ paddingRight: 4 }}>
            <List sx={{ marginBottom: 4, minWidth: 130 }}>
              {filterVariants.map((filter) => (
                <React.Fragment key={filter.type}>
                  <ListItemButton
                    selected={filter.type == filterType}
                    onClick={() => setFilterType(filter.type)}
                  >
                    <ListItemText primary={filter.title} />
                  </ListItemButton>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Button
              onClick={() => onDateRangeChangeApplied(dateRanges[0])}
              color="secondary"
              variant="contained"
              fullWidth
              size="large"
            >
              Apply
            </Button>
          </Grid>
          <Grid>
            <DateRangePicker
              onChange={onDateRangeChange}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={dateRanges}
              direction="horizontal"
              minDate={predefinedRanges.config.minDate}
              maxDate={predefinedRanges.config.maxDate}
            />
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}

const Heading = ({
  expand,
  onToggle,
  onFilterChange,
  dateRange,
  title,
}: HeadingProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "36px",
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 40,
        }}
        variant="h2"
        color="#707070C4"
        gutterBottom
      >
        {title}
      </Typography>

      <Box>
        <Card sx={{ minWidth: 300 }}>
          <CardHeader
            avatar={<Image {...calendar} aria-label="period" alt="period" />}
            action={
              <IconButton aria-label="filter" onClick={onToggle}>
                {expand ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            }
            title={
              <Box>
                <Typography color="text.secondary" variant="subtitle2">
                  {`Period: ${formatDateForFilter(
                    dateRange.startDate
                  )} - ${formatDateForFilter(dateRange.endDate)}`}
                </Typography>
              </Box>
            }
          />
        </Card>
      </Box>
      <DateFilterDialog
        onFilterChange={onFilterChange}
        open={expand}
        onToggle={onToggle}
        defaultDateRange={dateRange}
      />
    </Box>
  );
};

export default Heading;
