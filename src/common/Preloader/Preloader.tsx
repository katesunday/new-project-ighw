import React from 'react';
import loader from '../../assets/images/loader.svg'

const Preloader = () => {
    return (
        <div style = {{display: 'flex', justifyContent: 'space-around'}}>
            <img alt='loader' src={loader} height={'100px'}/>
        </div>

    );
};

export default Preloader;