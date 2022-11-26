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
import { DateRange } from "./commonsType";

export type TPurchaseChart = TPurchase & { name: string };

export function createDataAPVChart(
  list: TPurchase[],
  { startDate, endDate }: { startDate: Date; endDate: Date }
) {
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

type TPredefinedConfig = {
  minDate: Date;
  maxDate: Date;
};

type TPredefinedRange = {
  [key: string]: DateRange;
};

export type TPredefinedRanges = {
  ranges: {
    [key: string]: TPredefinedRange | {};
  };
  config: TPredefinedConfig;
};

export function getPredefinedRanges([year, month, day] = [2022, 1, 1]) {
  const dataRanges: TPredefinedRanges = {
    config: {
      minDate: addMonths(new Date(year, month, day), -6),
      maxDate: new Date(),
    },
    ranges: {
      today: {
        startDate: new Date(year, month, day),
        endDate: new Date(year, month, day),
      },
      yesterday: {
        startDate: addDays(new Date(year, month, day), -1),
        endDate: addDays(new Date(year, month, day), -1),
      },
      last7: {
        startDate: addDays(new Date(year, month, day), -7),
        endDate: new Date(year, month, day),
      },
      last30: {
        startDate: addDays(new Date(year, month, day), -30),
        endDate: new Date(year, month, day),
      },
      this_month: {
        startDate: startOfMonth(new Date(year, month, day)),
        endDate: new Date(year, month, day),
      },
      custom: {},
    },
  };

  return dataRanges;
}
