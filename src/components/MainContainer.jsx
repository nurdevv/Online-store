import React from 'react';
import {HomeContainer, Countdown, Products} from "./index";


const MainContainer = () => {
    return (
        <div className='w-full h-auto flex flex-col items-center justify-center'>
            <HomeContainer/>

            <Countdown hours={24} minutes={0}/>

            <Products/>
        </div>
    );
};

export default MainContainer;