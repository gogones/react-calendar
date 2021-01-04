import React from 'react';
import PropTypes from 'prop-types';
import datesGenerator from 'dates-generator';
import moment from 'moment';
 
const CalendarTwo = () => {
    const [selectedDate, setSelectedDate] = React.useState(moment());
    const [currentMonth, setCurrentMonth] = React.useState(moment());

    function renderHeader() {
        const dateFormat = "MMMM YYYY";

        return (
        <div className="header row flex-middle">
            <div className="col col-start">
            <div className="icon" onClick={prevMonth}>
                chevron_left
            </div>
            </div>
            <div className="col col-center">
            <span>{moment(currentMonth).format(dateFormat)}</span>
            </div>
            <div className="col col-end" onClick={nextMonth}>
            <div className="icon">chevron_right</div>
            </div>
        </div>
        );
    }

  function renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = moment(currentMonth).startOf('week');

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {moment(startDate.clone().add(i, 'day')).format(dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  function renderCells() {
    const monthStart = moment(currentMonth).startOf('month');
    const monthEnd = monthStart.clone().endOf('month');
    const startDate = monthStart.clone().startOf('week');
    const endDate = monthEnd.clone().endOf('week');

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate.clone();
    let formattedDate = "";

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = day.clone().format(dateFormat);
            const cloneDay = day.clone();
            days.push(
                <div
                    className={`col cell ${
                        !day.isSame(monthStart, 'month')
                            ? "disabled"
                            : day.isSame(selectedDate, 'day')
                              ? "selected"
                              : ""
                    }`}
                    key={day}
                    onClick={() => onDateClick(cloneDay)}
                >
                    <span className="number">{formattedDate}</span>
                    <span className="bg">{formattedDate}</span>
                </div>
            );
            day = day.add(1, 'day');
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
}

  const onDateClick = day => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(moment(currentMonth).add(1, 'month'))
  };

  const prevMonth = () => {
    setCurrentMonth(moment(currentMonth).subtract(1, 'month'));
  };

    return (
        <div className="calendar">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
}
 
CalendarTwo.propTypes = {};
 
export default CalendarTwo;