import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import Image from "next/image";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { formatPrice } from "../utils";
import { TProductSKU } from "../commonsType";

const captions = { sold: "terjual" };

const ProductSKUCard = ({
  products,
  title,
}: {
  products: TProductSKU[];
  title: string;
}) => {
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
          {products?.map((product: TProductSKU) => (
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
                  height="60"
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
                        {`(${product.soldAmount} ${captions.sold})`}
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
