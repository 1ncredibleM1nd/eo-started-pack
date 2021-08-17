import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/calendar";
import duration from "dayjs/plugin/duration";
import "dayjs/locale/ru";

dayjs.locale("ru");
dayjs.extend(relativeTime);
dayjs.extend(duration);

export default dayjs;

export function toCalendar(date: dayjs.Dayjs, formats = {}) {
  return date.calendar(null, {
    sameDay: "Сегодня",
    lastDay: "Вчера",
    nextDay: "DD MMM",
    nextWeek: "DD MMM",
    lastWeek: "DD MMM",
    sameElse: "DD MMM",
    ...formats,
  });
}
