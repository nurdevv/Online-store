import React from 'react';
import NotFound from "../img/NotFound.svg";

const Feedback = () => {
    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center">
            <img src={NotFound} className="h-340" alt={`NotFound`}/>
            <p className="text-xl text-headingColor font-semibold my-5">
                Страница на этабе разработки
            </p>
        </div>
    );
};

export default Feedback;