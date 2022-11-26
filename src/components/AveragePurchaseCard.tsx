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
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";
import { TPurchase } from "../../pages/api/mocks";

type Props = {
  data: TPurchase & { name: string };
};

const AveragePurchaseCard = ({ data }: Props) => {
  const isMd = useMediaQuery("(min-width:1000px)");

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        action={
          <>
            <Select defaultValue={1} sx={{ height: "36px", minWidth: "140px" }}>
              <MenuItem value={1}>Last 6 month</MenuItem>
            </Select>
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          </>
        }
        title="AVERAGE PURCHASE VALUE"
        titleTypographyProps={{ sx: { fontSize: "20px" } }}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <ComposedChart
          width={isMd ? 600 : 400}
          height={387}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="gross" stackId="a" fill="#37B04C" />
          <Bar dataKey="net" stackId="a" fill="#82ca9d" />
          <Line type="monotone" dataKey="apv" stroke="#ff7300" />
          <Bar dataKey="upt" stackId="a" fill="#aaaccc" />
        </ComposedChart>
      </CardContent>
    </Card>
  );
};

export default AveragePurchaseCard;
