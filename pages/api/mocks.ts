// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../src/data/mocks";

export type TMocks = {
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
  purchase: Array<{
    date: string;
    apv: number;
    net: number;
    gross: number;
    upt: number;
  }>;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TMocks>
) {
  res.status(200).json(data);
}
