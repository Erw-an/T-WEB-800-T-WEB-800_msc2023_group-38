import React from 'react';
import PropTypes from 'prop-types';
import plane from '../utils/icons/plane.png';
import earth from '../utils/icons/earth.png';

function Logo({ size }) {
    console.log('size:', size);
    return (
        <div className={`relative w-${size} h-${size}`}>
            <img
                src={plane}
                alt="plane"
                className={`animate-spin-slow absolute h-${size}`}
            />
            <img src={earth} alt="earth" className={` absolute h-${size}`} />
        </div>
    );
}

Logo.propTypes = {
    size: PropTypes.number.isRequired,
};

export default Logo;
