import React from "react";
import dateFns from "date-fns";
import moment from 'moment';

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{moment(this.state.currentMonth).format(dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = moment(this.state.currentMonth).startOf('week');

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {moment(moment(startDate).add(i, 'day')).format(dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const {currentMonth, selectedDate} = this.state;
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
                    onClick={() => this.onDateClick(cloneDay)}
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

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: moment(this.state.currentMonth).add(1, 'month')
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: moment(this.state.currentMonth).subtract(1, 'month')
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;
