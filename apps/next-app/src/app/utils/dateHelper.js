export function getNextWeekendDateStrings() {
  const today = new Date();
  const day = today.getDay();
  const diffToSaturday = (6 - day + 7) % 7;
  const diffToSunday = (7 - day + 7) % 7;

  const saturday = new Date(today);
  saturday.setDate(today.getDate() + diffToSaturday);
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + diffToSunday);

  const formatDate = (d) => {
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${weekdays[d.getDay()]}）`;
  };

  return {
    today: formatDate(today),
    saturday: formatDate(saturday),
    sunday: formatDate(sunday),
  };
}
