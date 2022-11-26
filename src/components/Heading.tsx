import React, { useCallback, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import {
  Avatar,
  Container,
  Grid,
  IconButton,
  ListItemButton,
  TextField,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  MoreVert,
  SpaceBar,
} from "@mui/icons-material";
import constants from "../constants";
import Image from "next/image";
import { calendar } from "../assets";

import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { addDays, addMonths, startOfMonth, format } from "date-fns";
import { DateRangePicker, Calendar } from "react-date-range";
import {
  formatDateForFilter,
  getCurrentDateArray,
  getPredefinedRanges,
} from "../utils";

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

type DateRange = {
  startDate: Date;
  endDate: Date;
};

type HeadingProps = {
  expand: boolean;
  onToggle: () => void;
  onFilterChange: (DateRange) => void;
  dateRange: DateRange;
};

type DateFilterDialogProps = {
  open: boolean;
  onToggle: () => void;
  onFilterChange: (DateRange) => void;
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
  const currentDate = getCurrentDateArray();
  const ranges = getPredefinedRanges(currentDate);

  const onDateRangeChange = (item) => {
    setDateRanges([item.selection]);
    if (filterType !== "custom") {
      setFilterType("custom");
    }
  };

  const onDateRangeChangeApplied = ({ startDate, endDate }) =>
    onFilterChange({ startDate, endDate });

  useEffect(() => {
    const range = ranges[filterType];
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
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={dateRanges}
              direction="horizontal"
              minDate={ranges.config.minDate}
              maxDate={ranges.config.maxDate}
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
}: HeadingProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: constants.spaceBottom,
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
        Dashboard
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
