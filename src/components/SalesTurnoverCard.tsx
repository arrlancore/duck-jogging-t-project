import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, CardHeader, Grid, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import Image from "next/image";
import { downArrow, salesTurnover } from "../assets";
import { formatPrice } from "../utils";

type Props = {
  total: number;
  percentage: number;
  status: string;
};

const SalesTurnover = (props: Props) => {
  return (
    <Card sx={{ minWidth: 330 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        subheader="Sales Turnover"
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <Grid container>
          <Grid item>
            {/* <Image /> */}
            <Typography color="text.secondary" fontWeight="bold" variant="h4">
              {formatPrice(props.total)}
            </Typography>
            <Box>
              <Image {...downArrow} alt={props.status} />
              <Typography display="inline" fontWeight="bold" color="error">
                {props.percentage}
              </Typography>{" "}
              <Typography
                display="inline"
                variant="caption"
                color="text.secondary"
              >
                last period in products sold
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pl: "10px",
            }}
          >
            <Image {...salesTurnover} alt="sales-turnover" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SalesTurnover;
