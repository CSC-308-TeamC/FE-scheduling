import React from "react";
import Calendar from "./components/Calendar";
import "./css/App.css";
import NewEventButton from "./components/NewEventButton";
//import Buttons from "./components/Buttons";
import { useSelector, useDispatch } from 'react-redux';

import { prevMonthDispatch, nextMonthDispatch } from "./actions/actionCreatorsDispatch"
// const dispatch = useDispatch();
// const calendarContext = useSelector(state => state.calendarState);

export const Buttons = () => {

  const calendarContext = useSelector(state => state.calendarState);

  const dispatch = useDispatch();

  return (
    <div className="buttons">
      <button
        className="prev-btn"
        onClick={() => {
          dispatch(prevMonthDispatch(calendarContext));
        }}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button
        className="next-btn"
        onClick={() => {
          dispatch(nextMonthDispatch(calendarContext));
        }}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};
function App() {
  return (
    <>
      <div className="App">
        <NewEventButton />
        <div className="container">
          <Calendar />
        </div>
  
        
      </div>
    </>
  );
}

export default App;
//export default Buttons;
