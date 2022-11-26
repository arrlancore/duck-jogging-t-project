import {
  isAfter,
  isBefore,
  isEqual,
  format,
  addMonths,
  addDays,
  startOfMonth,
} from "date-fns";
import { TPurchase } from "../pages/api/mocks";

export function createDataAPVChart(
  list: TPurchase[],
  { startDate, endDate }: { startDate: Date; endDate: Date }
) {
  type TPurchaseChart = TPurchase & { name: string };

  const purchaseList: TPurchaseChart[] = [];
  for (let i = 0; i < list.length; i++) {
    const data = list[i];
    const target = new Date(data.date);
    if (
      (isAfter(target, startDate) || isEqual(target, startDate)) &&
      (isBefore(target, endDate) || isEqual(target, endDate))
    ) {
      purchaseList.push({ ...data, name: format(target, "dd/MM/yyyy") });
    }
  }

  return purchaseList;
}

export function formatPrice(price: number) {
  return "Rp. " + new Intl.NumberFormat().format(price);
}

export function formatDateForFilter(date: Date) {
  return format(date, "dd MMMM yyyy");
}

export function getCurrentDateArray() {
  const date = new Date();
  return [date.getFullYear(), date.getMonth(), date.getDate()];
}

export function getPredefinedRanges(currentDate = [2022, 1, 1]) {
  const dataRanges = {
    config: {
      minDate: addMonths(new Date(...currentDate), -6),
      maxDate: new Date(),
    },
    today: {
      startDate: new Date(...currentDate),
      endDate: new Date(...currentDate),
    },
    yesterday: {
      startDate: addDays(new Date(...currentDate), -1),
      endDate: addDays(new Date(...currentDate), -1),
    },
    last7: {
      startDate: addDays(new Date(...currentDate), -7),
      endDate: new Date(...currentDate),
    },
    last30: {
      startDate: addDays(new Date(...currentDate), -30),
      endDate: new Date(...currentDate),
    },
    this_month: {
      startDate: startOfMonth(new Date(...currentDate)),
      endDate: new Date(...currentDate),
    },
    custom: {},
  };

  return dataRanges;
}
