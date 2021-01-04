import React from "react";

import Calendar from "./components/Calendar";

import "./App.css";
import CalendarTwo from "./components/CalendarTwo";
import CalendarThree from "./components/CalendarThree";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <div id="logo">
            <span className="icon">date_range</span>
            <span>
              react<b>calendar</b>
            </span>
          </div>
        </header>
        <main>
          <Calendar />
          <CalendarTwo />
          <CalendarThree />
        </main>
      </div>
    );
  }
}

export default App;
