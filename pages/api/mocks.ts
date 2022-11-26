// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { TProductSKU, TPurchase, TUserInfo } from "../../src/commonsType";
import data from "../../src/data/mocks";

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
