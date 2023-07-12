import { ChangeEvent, useState } from 'react';
import { ReactComponent as Down } from 'shared/assets/icons/down.svg';
import { ReactComponent as Up } from 'shared/assets/icons/up.svg';
import { BookPreview } from 'types/book-preview';

import { Day } from './day';

import './calendar.scss';

export const Calendar = ({ handleChange, book }: { handleChange: (date: string) => void; book: BookPreview }) => {
  const weeks = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const monthes = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const { booking } = book;

  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date(String(booking?.dateOrder)).toDateString());

  const m = date.getMonth();
  const y = date.getFullYear();
  const lastDateOfMonth = new Date(y, m + 1, 0).getDate();
  const lastDateOfLastMonth = m === 0 ? new Date(y - 1, 12, 0).getDate() : new Date(y, m, 0).getDate();
  const week = new Date(y, m, 1).getDay() || 7;

  const handleClick = (data: string) => {
    setSelectedDate(data);
    handleChange(data);
  };

  const createCells = () => {
    const days = [];

    for (let i = 1; i <= lastDateOfMonth; i++) {
      let dow = new Date(y, m, i).getDay();

      const createDay = (el: number) => (
        <Day date={{ y, m, d: i }} selectedDate={selectedDate} handleClick={handleClick} el={el} />
      );

      if (i === 1 && dow !== 1) {
        let k = lastDateOfLastMonth - week + 2;

        for (let j = 1; j < week; j++) {
          days.push(
            <button data-test-id='day-button' className='calendar__btn' disabled={true} type='button'>
              {k}
            </button>
          );
          k += 1;
        }
      }

      days.push(createDay(i));

      if (i === lastDateOfMonth && dow) {
        let k = 1;

        for (dow; dow < 7; dow++) {
          days.push(createDay(k));
          k += 1;
        }
      }
    }

    return days;
  };

  const createRows = () => {
    const days = createCells();
    const size = 7;
    const rows = [];

    for (let i = 0; i < Math.ceil(days.length / size); i++) {
      rows[i] = days.slice(i * size, i * size + size);
    }

    return rows;
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const month = Number(e.target.value);

    setDate(new Date(y, month));
  };

  const handleUp = () => {
    const year = m === 0 ? y - 1 : y;
    const month = m === 0 ? 11 : m - 1;

    setDate(new Date(year, month));
  };

  const handleDown = () => {
    const year = m === 11 ? y + 1 : y;
    const month = m === 11 ? 0 : m + 1;

    setDate(new Date(year, month));
  };

  return (
    <div className='calendar' data-test-id='calendar'>
      <header>
        <select data-test-id='month-select' value={m} onChange={handleSelect}>
          {monthes.map((month, idx) => (
            <option key={month} value={idx}>
              {`${month} ${y}`}
            </option>
          ))}
        </select>
        <div className='calendar__btns'>
          <button data-test-id='button-prev-month' type='button' onClick={handleUp}>
            <Up />
          </button>
          <button data-test-id='button-next-month' type='button' onClick={handleDown}>
            <Down />
          </button>
        </div>
      </header>

      <table>
        <thead>
          <tr>
            {weeks.map((weekEl) => (
              <th key={weekEl}>{weekEl}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {createRows().map((row, idx) => {
            const rk = idx;

            return (
              <tr key={rk}>
                {row.map((cell, idxC) => {
                  const ck = idxC;

                  return <td key={ck}>{cell}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
