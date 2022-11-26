import purchases from "./purchase.json";

const userInfo = {
  username: "Joh Wick",
  companyName: "Advotics Group",
};

const salesTurnover = {
  total: 3600000,
  percentage: 13.8,
  status: "down",
};

const listSku = [
  {
    id: "product-sku-1",
    img: "",
    productName: "Susu Bendera 200g",
    price: 20000,
    soldAmount: 123,
  },
  {
    id: "product-sku-2",
    img: "",
    productName: "Susu Bendera 200g",
    price: 20000,
    soldAmount: 123,
  },
  {
    id: "product-sku-3",
    img: "",
    productName: "Susu Bendera 200g",
    price: 20000,
    soldAmount: 123,
  },
  {
    id: "product-sku-4",
    img: "",
    productName: "Susu Bendera 200g",
    price: 20000,
    soldAmount: 123,
  },
  {
    id: "product-sku-5",
    img: "",
    productName: "Susu Bendera 200g",
    price: 20000,
    soldAmount: 123,
  },
];

const mocks = {
  listSku,
  salesTurnover,
  userInfo,
  purchases,
};

export default mocks;
