'use strict';

const date = new Date()
const month =  date.getMonth();
const year = date.getFullYear();
console.log()
const daysInMonth = function (month, year) {
  return new Date(year, month + 1 , 0).getDate();
}



function createDayList() {
  let daysPrevMonth;
  const  arr = [], arrPrev = [], arrNext = [];
  const maxCell = 35; //максимальное кол-во ячеек в календаре;
  const maxCellRow = 7; //максимальное кол-во ячеек в строке;
  const remainderDay = (maxCell - daysInMonth(month, year)); //получаем оставшиеся дни из предыдущего месяца которые поместятся в первуюстроку
  const dayPrevMonth =  daysInMonth(month - 1, year) - maxCellRow;
  const dateStartMonth = new Date(year, month, 1);
  const dateEndMonth = new Date(year, month + 1, 0);  
  const getMonthDays =  () => {
    for (let i = 1; i <= daysInMonth(month, year); i++){
        
      if(date.getDate() === i) {
        arr.push({num: i, className: 'ui-datepicker-today'});
        continue;
      } 
      arr.push({num: i, className: null})  //получаем массив из количества дней в текущем месяце
    } 
  };
  const resuideDayPrevMonth = () => {
    for (let i = dayPrevMonth; i <= daysInMonth(month - 1, year); i++){
      arrPrev.push({num: i, className: 'ui-datepicker-other-month'}) //получаем массив из оставшихся дней   предыдущего месяца
    };
  }
  if(dateEndMonth.getDay() === 0) {
    getMonthDays();
    
    resuideDayPrevMonth();
    
    daysPrevMonth = arrPrev.splice(-remainderDay) //колличество дней оставшихся в предыдущем месяце
    
    return  [...daysPrevMonth, ...arr];
  }
  
  if(dateStartMonth.getDay() === 1) {
    getMonthDays();

    for (let i = 1; i < maxCellRow; i++){
      arrNext.push({num: i, className: 'ui-datepicker-other-month'}) //получаем массив из первых дней следующего месяца
    }
    
    daysPrevMonth = arrNext.splice(remainderDay);

    return [...arr, ...arrNext]
  }

  if(dateStartMonth.getDay() !== 1 &&  dateEndMonth.getDay() !== 0) {
    getMonthDays();
    
    resuideDayPrevMonth();

    for (let i = 1; i < maxCellRow; i++){
      arrNext.push({num: i, className: 'ui-datepicker-other-month'}) //получаем массив из первых дней следующего месяца
    }
    
    daysPrevMonth = arrPrev.splice(-(dateStartMonth.getDay()? dateStartMonth.getDay() -1 : 6)); 
    return [...daysPrevMonth, ...arr, ...arrNext]    
  }
  
  
}

const Calendar = ({date}) => {    
  const day = date.getDate();  
  const weekday = date.toLocaleString("ru", {weekday: 'long'});
  const month = date.toLocaleString("ru", {month: 'long'});  
  const monthMaterial = date.toLocaleString("ru", {day: 'numeric', month: 'long'}).split(' ').pop();
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
          <span className="ui-datepicker-month">{month}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col/>
          <col/>
          <col/>
          <col/>
          <col/>
          <col className="ui-datepicker-week-end"/>
          <col className="ui-datepicker-week-end"/>
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>        
        {getItemRow(createDayList())}       
      </table>
    </div>
  )
}

const getItemRow = function (data) {  
  return (    
    <tbody>
      <tr>
        <td className={data[0].className}>{data[0].num}</td>
        <td className={data[1].className}>{data[1].num}</td>
        <td className={data[2].className}>{data[2].num}</td>
        <td className={data[3].className}>{data[3].num}</td>
        <td className={data[4].className}>{data[4].num}</td>
        <td className={data[5].className}>{data[5].num}</td>
        <td className={data[6].className}>{data[6].num}</td>
      </tr>
      <tr>
        <td className={data[7].className}>{data[7].num}</td>
        <td className={data[8].className}>{data[8].num}</td>
        <td className={data[9].className}>{data[9].num}</td>
        <td className={data[10].className}>{data[10].num}</td>
        <td className={data[11].className}>{data[11].num}</td>
        <td className={data[12].className}>{data[12].num}</td>
        <td className={data[13].className}>{data[13].num}</td>
      </tr>
      <tr>
        <td className={data[14].className}>{data[14].num}</td>
        <td className={data[15].className}>{data[15].num}</td>
        <td className={data[16].className}>{data[16].num}</td>
        <td className={data[17].className}>{data[17].num}</td>
        <td className={data[18].className}>{data[18].num}</td>
        <td className={data[19].className}>{data[19].num}</td>
        <td className={data[20].className}>{data[20].num}</td>
      </tr>
      <tr>
        <td className={data[21].className}>{data[21].num}</td>
        <td className={data[22].className}>{data[22].num}</td>
        <td className={data[23].className}>{data[23].num}</td>
        <td className={data[24].className}>{data[24].num}</td>
        <td className={data[25].className}>{data[25].num}</td>
        <td className={data[26].className}>{data[26].num}</td>
        <td className={data[27].className}>{data[27].num}</td>
      </tr>
      <tr>
        <td className={data[28].className}>{data[28].num}</td>
        <td className={data[29].className}>{data[29].num}</td>
        <td className={data[30].className}>{data[30].num}</td>
        <td className={data[31].className}>{data[31].num}</td>
        <td className={data[32].className}>{data[32].num}</td>
        <td className={data[33].className}>{data[33].num}</td>
        <td className={data[34].className}>{data[34].num}</td>
      </tr> 
        
       {(createDayList()[34].num === 29 ||
         createDayList()[34].num === daysInMonth(month, year)-1 )?
         addWeek(createDayList()) : null
       }  
    </tbody>
  )
}
console.log(daysInMonth(month, year) )
const addWeek = function (data) {  
  return (
    <tr>
        <td className={data[35].className}>{data[35].num}</td>
        <td className={data[36].className}>{data[36].num}</td>
        <td className={data[37].className}>{data[37].num}</td>
        <td className={data[38].className}>{data[38].num}</td>
        <td className={data[39].className}>{data[39].num}</td>
        <td className={data[40].className}>{data[40].num}</td>
        <td className={data[41].className}>{data[41].num}</td>
    </tr>
  )
}

