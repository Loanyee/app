import moment from "moment/moment";

const formatText = (text, number) => {
  let returnValue = "";

  text === "month" && number > 1
    ? (returnValue = "months")
    : (returnValue = "month");

  if (text === "month") return returnValue;

  text === "day" && number > 1 ? (returnValue = "days") : (returnValue = "day");

  return returnValue;
};

const GET_TIME = (timestamp1, timestamp2) => {
  const time1 = moment.unix(timestamp1).format("YYYY/MM/DD");
  const time2 = moment.unix(timestamp2).format("YYYY/MM/DD");
  const now = moment(time1);
  const end = moment(time2);
  const duration = moment.duration(now.diff(end));
  const months = duration.months();
  const days = duration.days();

  // if month and day available then return this combination
  let comb = `${months} ${formatText("month", months)} ${days} ${formatText(
    "day",
    days
  )}`;
  // if months doesn't exsist then return this combination

  if (months == 0) {
    comb = `${days}  ${formatText("day", days)}`;
  }

  // if days doesn't exsist then return this combination

  if (days == 0) {
    comb = `${months} ${formatText("month", months)}`;
  }
  return comb;
};
export { GET_TIME };
