import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isToday from "dayjs/plugin/isToday";
import relativeTime from "dayjs/plugin/relativeTime";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const formatStr = {
  dateTime: "DD MMM YYYY h:mm a",
  date: "DD MMM YYYY",
  time: "h:mm a",
  split: {
    dateTime: "DD/MM/YYYY h:mm a",
    date: "DD/MM/YYYY",
  },
  paramCase: {
    dateTime: "DD-MM-YYYY h:mm a",
    date: "DD-MM-YYYY",
  },
};

export function fToday(format: string): string {
  return dayjs(new Date()).startOf("day").format(format);
}

export function fBefore(
  date: dayjs.ConfigType,
  compare?: dayjs.ConfigType
): boolean {
  return dayjs(date).isBefore(compare ?? dayjs());
}

export function fAfter(
  date: dayjs.ConfigType,
  compare?: dayjs.ConfigType
): boolean {
  return dayjs(date).isAfter(compare ?? dayjs());
}

export function fSameOrAfter(
  date: dayjs.ConfigType,
  compare?: dayjs.ConfigType
): boolean {
  return dayjs(date).isSameOrAfter(compare ?? dayjs());
}

export function fSameOrBefore(
  date: dayjs.ConfigType,
  compare?: dayjs.ConfigType
): boolean {
  return dayjs(date).isSameOrBefore(compare ?? dayjs());
}

export function fDateTime(
  date: dayjs.ConfigType,
  format?: string
): string | null {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid
    ? dayjs(date).format(format ?? formatStr.dateTime)
    : "Invalid time value";
}

export function fUtc(date: dayjs.ConfigType): dayjs.Dayjs {
  return dayjs(date).tz("Europe/Berlin");
}

export function fDate(date: dayjs.ConfigType, format?: string): string | null {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid
    ? dayjs(date).format(format ?? formatStr.date)
    : "Invalid time value";
}

export function fTime(date: dayjs.ConfigType, format?: string): string | null {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid
    ? dayjs(date).format(format ?? formatStr.time)
    : "Invalid time value";
}

export function fTimestamp(date: dayjs.ConfigType): number | string | null {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid ? dayjs(date).valueOf() : "Invalid time value";
}

export function fToNow(date: dayjs.ConfigType): string | null {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid ? dayjs(date).toNow(true) : "Invalid time value";
}

export function fIsBetween(
  inputDate: dayjs.ConfigType,
  startDate: dayjs.ConfigType,
  endDate: dayjs.ConfigType
): boolean {
  if (!inputDate || !startDate || !endDate) {
    return false;
  }

  const formattedInputDate = fTimestamp(inputDate);
  const formattedStartDate = fTimestamp(startDate);
  const formattedEndDate = fTimestamp(endDate);

  if (formattedInputDate && formattedStartDate && formattedEndDate) {
    return (
      formattedInputDate >= formattedStartDate &&
      formattedInputDate <= formattedEndDate
    );
  }

  return false;
}

export function fIsAfter(
  startDate: dayjs.ConfigType,
  endDate: dayjs.ConfigType
): boolean {
  return dayjs(startDate).isAfter(endDate);
}

export function fIsSame(
  startDate: dayjs.ConfigType,
  endDate: dayjs.ConfigType,
  units?: dayjs.OpUnitType
): boolean | string {
  if (!startDate || !endDate) {
    return false;
  }

  const isValid = dayjs(startDate).isValid() && dayjs(endDate).isValid();

  if (!isValid) {
    return "Invalid time value";
  }

  return dayjs(startDate).isSame(endDate, units ?? "year");
}

export function fDateRangeShortLabel(
  startDate: dayjs.ConfigType,
  endDate: dayjs.ConfigType,
  initial?: boolean
): string {
  const isValid = dayjs(startDate).isValid() && dayjs(endDate).isValid();

  const isAfter = fIsAfter(startDate, endDate);

  if (!isValid || isAfter) {
    return "Invalid time value";
  }

  let label = `${fDate(startDate)} - ${fDate(endDate)}`;

  if (initial) {
    return label;
  }

  const isSameYear = fIsSame(startDate, endDate, "year");
  const isSameMonth = fIsSame(startDate, endDate, "month");
  const isSameDay = fIsSame(startDate, endDate, "day");

  if (isSameYear && !isSameMonth) {
    label = `${fDate(startDate, "DD MMM")} - ${fDate(endDate)}`;
  } else if (isSameYear && isSameMonth && !isSameDay) {
    label = `${fDate(startDate, "DD")} - ${fDate(endDate)}`;
  } else if (isSameYear && isSameMonth && isSameDay) {
    label = `${fDate(endDate)}`;
  }

  return label;
}

export interface IAddProps {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

export function fAdd({
  years = 0,
  months = 0,
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
}: IAddProps): string {
  const result = dayjs()
    .add(
      dayjs.duration({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
      })
    )
    .format();

  return result;
}

export interface ISubProps {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

export function fSub({
  years = 0,
  months = 0,
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
}: ISubProps): string {
  const result = dayjs()
    .subtract(
      dayjs.duration({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
      })
    )
    .format();

  return result;
}

export function fIsToday(date: dayjs.ConfigType): boolean {
  return dayjs(date).isToday();
}
