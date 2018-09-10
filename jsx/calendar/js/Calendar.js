'use strict';

const date = new Date();
const month = date.getMonth();
const year = date.getFullYear();

const daysInMonth = function(month, year) {
  return new Date(year, month + 1, 0).getDate();
};

function createDayList() {
  let daysPrevMonth;
  const arrMiddle = [],
    arrPrev = [],
    arrNext = [];
  const dateStartMonth = new Date(year, month, 1); //первый день текущего месяца
  const dateEndMonth = new Date(year, month + 1, 0); //последний день текущего месяца
  const getMonthDays = () => {
    for (let i = 1; i <= daysInMonth(month, year); i++) {
      if (date.getDate() === i) {
        arrMiddle.push({ num: i, className: 'ui-datepicker-today' });
        continue;
      }
      arrMiddle.push({ num: i, className: null }); //получаем массив из количества дней в текущем месяце
    }
  };
  const resuideDayPrevMonth = () => {
    for (let i = 25; i <= daysInMonth(month - 1, year); i++) {
      arrPrev.push({ num: i, className: 'ui-datepicker-other-month' }); //получаем массив последних дней предыдущего месяца
    }
  };
  const resuideDayNextMonth = () => {
    for (let i = 1; i < 7; i++) {
      arrNext.push({ num: i, className: 'ui-datepicker-other-month' }); //получаем массив из первых дней следующего месяца
    }
  };
  const createArrDays = (...prevMonth) => {
    // создаем многомерный массив для динамического построениясетки дней
    let listMonthDays = [...prevMonth];
    let newlistMonthDays = [];
    let quantityRow;

    listMonthDays[34] === 29 || dateEndMonth.getDay() === 1 ? (quantityRow = 6) : (quantityRow = 5); //в зависимости от месяца создаем кол-во рядов

    for (let i = 0; i < quantityRow; i++) {
      newlistMonthDays.push(listMonthDays.splice(0, 7));
    }

    return newlistMonthDays;
  };

  if (dateEndMonth.getDay() === 0) {
    //создаем массив дляварианта когда последний день месяца воскр
    getMonthDays();
    resuideDayPrevMonth();
    daysPrevMonth = arrPrev.splice(-(dateStartMonth.getDay() ? dateStartMonth.getDay() - 1 : 6)); //колличество дней оставшихся в предыдущем месяце

    return createArrDays(...daysPrevMonth, ...arrMiddle);
  } else if (dateStartMonth.getDay() === 1) {
    //создаем массив для варианта когда первый день месяца понедельник
    getMonthDays();
    resuideDayNextMonth();
    daysPrevMonth = arrNext.splice(dateEndMonth.getDay() ? dateEndMonth.getDay() + 1 : null);

    return createArrDays(...arrMiddle, ...arrNext);
  } else {
    //массив для всех остальных вариантов
    getMonthDays();
    resuideDayPrevMonth();
    resuideDayNextMonth();
    daysPrevMonth = arrPrev.splice(-(dateStartMonth.getDay() ? dateStartMonth.getDay() - 1 : 6));

    return createArrDays(...daysPrevMonth, ...arrMiddle, ...arrNext);
  }
}

function createWeek(item) {
  return (
    <tr>
      <td className={item[0].className}>{item[0].num}</td>
      <td className={item[1].className}>{item[1].num}</td>
      <td className={item[2].className}>{item[2].num}</td>
      <td className={item[3].className}>{item[3].num}</td>
      <td className={item[4].className}>{item[4].num}</td>
      <td className={item[5].className}>{item[5].num}</td>
      <td className={item[6].className}>{item[6].num}</td>
    </tr>
  );
}

const Calendar = ({ date }) => {
  const day = date.getDate();
  const weekday = date.toLocaleString('ru', { weekday: 'long' });
  const month = date.toLocaleString('ru', { month: 'long' });
  const monthMaterial = date
    .toLocaleString('ru', { day: 'numeric', month: 'long' })
    .split(' ')
    .pop();
  const year = date.getFullYear();

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{weekday}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{day}</div>
          <div className="ui-datepicker-material-month">{monthMaterial}</div>
          <div className="ui-datepicker-material-year">{year}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{month}</span>
          &nbsp;
          <span className="ui-datepicker-year">{year}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">
              Пн
            </th>
            <th scope="col" title="Вторник">
              Вт
            </th>
            <th scope="col" title="Среда">
              Ср
            </th>
            <th scope="col" title="Четверг">
              Чт
            </th>
            <th scope="col" title="Пятница">
              Пт
            </th>
            <th scope="col" title="Суббота">
              Сб
            </th>
            <th scope="col" title="Воскресенье">
              Вс
            </th>
          </tr>
        </thead>
        <tbody>{createDayList().map(createWeek)}</tbody>
      </table>
    </div>
  );
};
