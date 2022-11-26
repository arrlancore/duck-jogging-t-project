import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { downArrow, salesTurnover } from "../assets";
import { formatPrice } from "../utils";

const ProductSKUCard = ({ products, title }) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={title}
        titleTypographyProps={{ sx: { fontSize: "20px" } }}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            "& li:first-child": {
              background: "#FFE7BD",

              "& > img": {
                width: "80px",
                height: "80px",
              },

              "& div > span": {
                fontSize: "18px",
              },
              "& div > p > div > span": {
                fontSize: "14px",
              },
            },
          }}
        >
          {products?.map((product) => (
            <React.Fragment key={product.id}>
              <ListItem
                alignItems="flex-start"
                disablePadding
                sx={{
                  mb: "8px",
                  border: "1px solid #eee",
                  borderRadius: "10px",
                }}
              >
                <Image
                  style={{ marginRight: "6px" }}
                  src={product.img}
                  width="60"
                  height="auto"
                  alt="product"
                />
                <ListItemText
                  primary={product.productName}
                  secondary={
                    <Box sx={{ display: "flex", mt: "4px" }}>
                      <Typography
                        sx={{ display: "inline", fontSize: 12, flex: "1" }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {formatPrice(product.price)}
                      </Typography>

                      <Typography
                        sx={{ display: "inline", fontSize: 12, flex: "1" }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {`(${product.soldAmount} terjual)`}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ProductSKUCard;
