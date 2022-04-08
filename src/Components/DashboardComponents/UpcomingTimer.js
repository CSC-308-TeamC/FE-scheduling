import React from 'react';
import { useCountdown } from '../../Hooks/useCountdown';

const CountDownTimer = ({targetDate, expirationCallback}) => {
    const [hours, minutes, seconds] = useCountdown(targetDate);

    if(hours + minutes + seconds <= 0){
        return (<>Appointment Arriving</>)
    }else{
        return (<> Appointment Arriving in {hours}:{minutes}:{seconds} </>)
    }
}

export default CountDownTimer;