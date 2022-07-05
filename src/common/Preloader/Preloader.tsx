import React from 'react';
import loader from '../../assets/images/loader.svg'

const Preloader = () => {
    return (
        <img alt='loader' src={loader} height={'100px'}/>
    );
};

export default Preloader;