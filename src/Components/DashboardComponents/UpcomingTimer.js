import React from 'react';
import { useTimer } from 'react-timer-hook';

function UpcomingTimer({ expiryTimestamp }) {
    const { seconds, minutes, hours, days, isRunning,
      start, pause, resume, restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

    return(
        <>Arriving in: {minutes}:{seconds} minutes</>
    );

} 
export default UpcomingTimer;
  