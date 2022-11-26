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

const SalesTurnover = () => {
  return (
    <Card sx={{ minWidth: 320 }}>
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
          <Grid xs="9">
            {/* <Image /> */}
            <Typography color="text.secondary" fontWeight="bold" variant="h4">
              Rp 3,600,000
            </Typography>
            <Box>
              <Image {...downArrow} alt="down" />
              <Typography display="inline" fontWeight="bold" color="error">
                12.8
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
            xs="3"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
