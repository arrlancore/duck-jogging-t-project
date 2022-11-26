import { StaticImageData } from "next/image";

export type DateRange = {
  startDate: Date;
  endDate: Date;
};

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
