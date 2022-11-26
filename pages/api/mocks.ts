// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../src/data/mocks";

export type TPurchase = {
  date: string;
  apv: number;
  net: number;
  gross: number;
  upt: number;
};

export type TMocksResponse = {
  listSku: Array<{
    id: string;
    img: string;
    productName: string;
    price: number;
    soldAmount: number;
  }>;
  salesTurnover: {
    total: number;
    percentage: number;
    status: string;
  };
  userInfo: {
    username: string;
    companyName: string;
  };
  purchases: Array<TPurchase>;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TMocksResponse>
) {
  res.status(200).json(data);
}
