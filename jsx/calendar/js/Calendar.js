'use strict';

function createDayList(date, year, month) {
  let daysPrevMonth;
  const arrMiddle = [],
    arrPrev = [],
    arrNext = [];
  const dateStartMonth = new Date(year, month, 1).getDay(); //номер первого дня текущего месяца
  const dateEndMonth = new Date(year, month + 1, 0).getDay(); //номер последнего дня  текущего месяца
  const dateEndMonthDay = new Date(year, month + 1, 0).getDate(); //число дней в текущем месяце
  const dateEndPrevMonth = new Date(year, month, 0).getDate(); //число дней в предыдущем месяце
  //получаем массив из количества дней в текущем месяце
  const getMonthDays = () => {
    for (let i = 1; i <= dateEndMonthDay; i++) {
      if (date.getDate() === i) {
        arrMiddle.push({ num: i, className: 'ui-datepicker-today' });
        continue;
      }
      arrMiddle.push({ num: i, className: null });
    }
  };
  //получаем массив последних дней предыдущего месяца
  const resuideDayPrevMonth = () => {
    for (let i = 25; i <= dateEndPrevMonth; i++) {
      arrPrev.push({ num: i, className: 'ui-datepicker-other-month' });
    }
  };
  //получаем массив из первых дней следующего месяца
  const resuideDayNextMonth = () => {
    for (let i = 1; i < 7; i++) {
      arrNext.push({ num: i, className: 'ui-datepicker-other-month' });
    }
  };
  // создаем многомерный массив для динамического построениясетки дней
  const createArrDays = (...prevMonth) => {
    let listMonthDays = [...prevMonth];
    let newlistMonthDays = [];
    let quantityRow;

    listMonthDays[34].num === 29 || dateEndMonth === 1 ? (quantityRow = 6) : (quantityRow = 5); //в зависимости от месяца создаем кол-во рядов

    for (let i = 0; i < quantityRow; i++) {
      newlistMonthDays.push(listMonthDays.splice(0, 7));
    }

    return newlistMonthDays;
  };

  if (dateEndMonth === 0) {
    //создаем массив дляварианта когда последний день месяца воскр
    getMonthDays();
    resuideDayPrevMonth();
    daysPrevMonth = arrPrev.splice(-(dateStartMonth ? dateStartMonth - 1 : 6)); //колличество дней оставшихся в предыдущем месяце

    return createArrDays(...daysPrevMonth, ...arrMiddle);
  } else if (dateStartMonth === 1) {
    //создаем массив для варианта когда первый день месяца понедельник
    getMonthDays();
    resuideDayNextMonth();
    daysPrevMonth = arrNext.splice(dateEndMonth ? dateEndMonth + 1 : null);

    return createArrDays(...arrMiddle, ...arrNext);
  } else {
    //массив для всех остальных вариантов
    getMonthDays();
    resuideDayPrevMonth();
    resuideDayNextMonth();
    daysPrevMonth = arrPrev.splice(-(dateStartMonth ? dateStartMonth - 1 : 6));

    return createArrDays(...daysPrevMonth, ...arrMiddle, ...arrNext);
  }
}

const createWeek = function(item) {
  return (
    <tr>
      {item.map(el => (
        <td className={el.className}>{el.num}</td>
      ))}
    </tr>
  );
};

const Calendar = ({ date }) => {
  const month = date.getMonth();
  const day = date.getDate();
  const weekday = date.toLocaleString('ru', { weekday: 'long' });
  const monthLongName = date.toLocaleString('ru', { month: 'long' });
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
          <span className="ui-datepicker-month">{monthLongName}</span>
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
        <tbody>{createDayList(date, year, month).map(createWeek)}</tbody>
      </table>
    </div>
  );
};
