import purchases from "./purchase.json";
import productImage1 from "../assets/product1.jpeg";
import productImage2 from "../assets/product2.jpeg";

const userInfo = {
  username: "Don Wick",
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
    img: productImage1,
    productName: "Susu Bendera 200g",
    price: 20000,
    soldAmount: 123,
  },
  {
    id: "product-sku-2",
    img: productImage2,
    productName: "Susu Bendera 200g",
    price: 20000,
    soldAmount: 123,
  },
  {
    id: "product-sku-3",
    img: productImage1,
    productName: "Susu Bendera 200g",
    price: 20000,
    soldAmount: 123,
  },
  {
    id: "product-sku-4",
    img: productImage2,
    productName: "Susu Bendera 200g",
    price: 20000,
    soldAmount: 123,
  },
  {
    id: "product-sku-5",
    img: productImage1,
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
