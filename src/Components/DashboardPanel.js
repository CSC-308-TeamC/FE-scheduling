import React from 'react';
import '../index.css';
import Clock from 'react-live-clock';
import Datetime from 'react-datetime';

function DashboardPanel(props) { 
  return (
    <div class="flex-container">
    
    <div class="dateFlex">
      <div id="date">
        <Clock format={'dddd, MMMM Do YYYY, h:mm a'} ticking={true} timezone={'US/Pacific'} />
      </div>
    </div>

    {/* <div class="timeFlex">
      <div id="time">
        <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />
      </div>
    </div> */}
    
  </div>
  );
}

export default DashboardPanel;