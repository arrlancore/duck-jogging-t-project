import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  CardHeader,
  Grid,
  IconButton,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import Image from "next/image";
import { downArrow, salesTurnover } from "../assets";

const ProductSKUCard = ({ data }) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="BEST SELLING SKU"
        titleTypographyProps={{ sx: { fontSize: "20px" } }}
      />
      <CardContent sx={{ paddingTop: 0 }}>list</CardContent>
    </Card>
  );
};

export default ProductSKUCard;
