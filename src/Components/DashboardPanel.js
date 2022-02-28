import React from 'react';
import '../index.css';
import Clock from 'react-live-clock';

function DashboardPanel(props) { 
  return (
    <div class="flex-container">
    
    <div class="dateFlex">
      <div id="date">
        <Clock format={'dddd, MMMM Do YYYY, h:mm a'} ticking={true} timezone={'US/Pacific'} />
      </div>
    </div>
  </div>
  );
}

export default DashboardPanel;