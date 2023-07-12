export const Day = ({
  date,
  selectedDate,
  handleClick,
  el,
}: {
  date: { y: number; m: number; d: number };
  selectedDate: string;
  handleClick: (e: string) => void;
  el: number;
}) => {
  const { y, m, d } = date;
  const curDate = new Date();
  const cellDate = new Date(y, m, d);

  const isCurMonthAndYear = curDate.getMonth() === m && curDate.getFullYear() === y;

  const isTodayFriday = curDate.getDay() === 5;
  const isTodayWeekend = curDate.getDay() === 0 || curDate.getDay() === 6;

  const isToday = isCurMonthAndYear && curDate.getDate() === d;
  const isTodayOpen = isToday && !isTodayWeekend;
  const isTomorrow = isCurMonthAndYear && curDate.getDate() + 1 === d;
  const isTomorrowOpen = isTomorrow && !isTodayFriday && !isTodayWeekend;

  const isCellSaturday = cellDate.getDay() === 6;
  const isCellSunday = cellDate.getDay() === 0;
  const isCellWeekend = isCellSaturday || isCellSunday;

  const isMondayOpen = (() => {
    const fr = new Date(curDate);
    const sa = new Date(curDate);
    const su = new Date(curDate);

    fr.setDate(curDate.getDate() + 3);
    sa.setDate(curDate.getDate() + 2);
    su.setDate(curDate.getDate() + 1);

    const isCellMonday = cellDate.getDay() === 1;
    const isDateEquel = (day: Date) => day.toDateString() === cellDate.toDateString();

    return !isTomorrowOpen && isCellMonday && (isDateEquel(fr) || isDateEquel(sa) || isDateEquel(su));
  })();

  const isSelected = selectedDate === cellDate.toDateString();

  const open = isTodayOpen || isTomorrowOpen || isMondayOpen;
  const name = isSelected
    ? 'calendar__selected'
    : isToday && isCellWeekend
    ? 'calendar__today calendar__weekend'
    : isTodayOpen
    ? 'calendar__today'
    : isTomorrowOpen || isMondayOpen
    ? 'calendar__tomorrow'
    : isCellWeekend
    ? 'calendar__weekend'
    : '';

  return (
    <button
      data-test-id='day-button'
      className={`calendar__btn ${name}`}
      disabled={!open}
      type='button'
      onClick={() => handleClick(cellDate.toDateString())}
    >
      {el}
    </button>
  );
};
