import moment from "moment/moment";
const GET_TIME = (timestamp1, timestamp2) => {
  const time1 = moment.unix(timestamp1).format("YYYY/MM/DD");
  const time2 = moment.unix(timestamp2).format("YYYY/MM/DD");
  const now = moment(time1);
  const end = moment(time2);
  const duration = moment.duration(now.diff(end));
  const months = duration.months();
  const days = duration.days();
  const comb = `${months} Months ${days} days`;
  return comb;
};

export { GET_TIME };
