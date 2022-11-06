import React, {useEffect, useState} from 'react';
import {actionType} from "../context/reducer";
import {useStateValue} from "../context/StateProvider";


const Countdown = ({hours = 0, minutes = 0, seconds = 0}) => {
    const [paused, setPaused] = useState(false);
    const [over, setOver] = useState(false);
    const [[h, m, s], setTime] = useState([hours, minutes, seconds]);

   const [dispatch] = useStateValue();

    const tick = () => {
        if (paused || over) return;

        if (h === 0 && m === 0 && s === 0) {
            setOver(true);
        } else if (m === 0 && s === 0) {
            setTime([h - 1, 59, 59]);
        } else if (s === 0) {
            setTime([h, m - 1, 59]);
        } else {
            setTime([h, m, s - 1]);
        }

    };

    // const reset = () => {
    //     setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);
    //     setPaused(false);
    //     setOver(false);
    // };


    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    })




    return (

            <div className='h-[60vh] flex items-center'>
                <div className='text-center '>
                    <div className='text-[1.4rem] md:text-[3rem] font-bold tracking-wide text-headingColor'>
                        <p>Торопитесь! Закажите еду из наших котологов с 30% скидкой</p>
                        <p className='text-orange-500'>Акция закончиться через</p>
                    </div>
                    <p className='text-[2.5rem] md:text-[4rem] tracking-wide text-orange-400 py-10 text-xl font-bold'>
                        {
                            `${h.toString().padStart(2, '0')}
                    :
                    ${m.toString().padStart(2, '0')}
                    :
                    ${s.toString().padStart(2, '0')}`
                        }
                    </p>

                    {/*<div>{over ? "Time's up!" : ''}</div>*/}
                    {/*<button onClick={() => setPaused(!paused)}>*/}
                    {/*    {paused ? 'Resume' : 'Pause'}*/}
                    {/*</button>*/}
                    {/*<button onClick={() => reset()}>Restart</button>*/}

                </div>
            </div>

    );
};

export default Countdown