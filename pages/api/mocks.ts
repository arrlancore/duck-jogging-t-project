// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { StaticImageData } from "next/image";
import data from "../../src/data/mocks";

export type TPurchase = {
  date: string;
  apv: number;
  net: number;
  gross: number;
  upt: number;
};

export type TUserInfo = {
  username: string;
  companyName: string;
};

export type TProductSKU = {
  id: string;
  img: StaticImageData;
  productName: string;
  price: number;
  soldAmount: number;
};

export type TMocksResponse = {
  listSku: Array<TProductSKU>;
  salesTurnover: {
    total: number;
    percentage: number;
    status: string;
  };
  userInfo: TUserInfo;
  purchases: Array<TPurchase>;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TMocksResponse>
) {
  res.status(200).json(data);
}
