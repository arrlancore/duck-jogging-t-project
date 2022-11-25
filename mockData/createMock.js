const d = require("date-fns");
const fs = require("fs").promises;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createMockWithRandom() {
  const [min, max] = [15000, 26000];

  const apv = getRandomInt(min, max);
  const net = getRandomInt(apv, max + 1000);
  const gross = getRandomInt(net, max + 1000);
  const upt = getRandomInt(40, 150) / 10;

  return { apv, net, gross, upt };
}

async function generate() {
  let it = 1;
  let data = [];
  const startDate = new Date(2022, 4, 2);
  const endDate = new Date(2022, 12, 2);
  let current = startDate;
  while (d.isEqual(current, endDate) === false) {
    if (d.getDate(current) === 1) {
      const json = JSON.stringify(data, null, 2);
      await fs.writeFile(`mockData/mockDataPurchase${it}.json`, json, "utf8");
      console.log("generated!!");
      it++;
      data = [];
    }

    data.push({
      date: current.toISOString(),
      ...createMockWithRandom(),
    });

    current = d.add(current, { days: 1 });
  }
}

generate();
