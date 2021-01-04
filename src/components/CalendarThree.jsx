import React from 'react';
import PropTypes from 'prop-types';
import {datesGenerator} from 'dates-generator';
import moment from 'moment';
 
const CalendarThree = () => {
    const [selectedDate, setSelectedDate] = React.useState(moment());
    const [currentMonth, setCurrentMonth] = React.useState(moment());

    const body = {
      month: currentMonth.month(),
      year: currentMonth.year()
    };

    const { dates, nextMonth, nextYear, previousMonth: prevMonth, previousYear } = datesGenerator(body);

    function renderHeader() {
        const dateFormat = "MMMM YYYY";

        return (
        <div className="header row flex-middle">
            <div className="col col-start">
                <div className="icon" onClick={prevMonthClick}>
                    chevron_left
                </div>
            </div>

            <div className="col col-center">
                <span>
                    {currentMonth.clone().format(dateFormat)}
                </span>
            </div>

            <div className="col col-end">
                <div className="icon" onClick={nextMonthClick}>
                    chevron_right
                </div>
            </div>
        </div>
        );
    }

  function renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = currentMonth.clone().startOf('week');

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {moment(moment(startDate).add(i, 'day')).format(dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  function renderCells() {
    const monthStart = currentMonth.clone().startOf('month');

    return(
        <div className="body">
            {dates.length > 0 && dates.map((week, index) => (
                <div className="row" key={index}>

                    {week.map((each, index) => (
                        <div
                            className={`col cell ${
                                each.month !== monthStart.month()
                                    ? "disabled"
                                    : moment(each).isSame(selectedDate, 'day')
                                        ? "selected"
                                        : ""
                            }`}
                            key={each.date}
                            onClick={() => onDateClick(moment(each))}
                        >
                            <span className="number">{each.date}</span>
                            <span className="bg">{each.date}</span>
                        </div>
                    ))}

                </div>
            ))}
        </div>
    )
}

  const onDateClick = day => {
    setSelectedDate(day);
  };

  const nextMonthClick = () => {
    setCurrentMonth(
        currentMonth.clone().month(nextMonth)
    );
  };

  const prevMonthClick = () => {
    setCurrentMonth(
        currentMonth.clone().month(prevMonth)
    );
  };

    return (
        <div className="calendar">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
}
 
CalendarThree.propTypes = {};
 
export default CalendarThree;