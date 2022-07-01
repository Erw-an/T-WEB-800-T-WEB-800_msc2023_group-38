import PropTypes from 'prop-types';
import React from 'react';

function Alerts({ onClick, title, icon }) {
    return (
        <button
            className="w-full px-4 py-3 flex items-center justify-center space-x-4 rounded-xl
            text-white bg-gray-100 duration-200  hover:opacity-50 bg-gradient-to-r from-purple-600 to-cyan-400 shadow-md"
            onClick={onClick}
            type="button"
        >
            <img className="h-6 w-6" src={icon} alt="icon" />
            <span className="-mr-1 font-medium">{title}</span>
        </button>
    );
}

Alerts.propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};
export default Alerts;
