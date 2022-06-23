import PropTypes from 'prop-types';
import React from 'react';

function Alerts({ onClick, title }) {
    return (
        <button
            className="w-full px-4 py-3 flex items-center justify-center space-x-4 rounded-xl
            text-white bg-gray-100 duration-200 opacity-75 hover:opacity-100 bg-gradient-to-r from-purple-600 to-cyan-400"
            onClick={onClick}
            type="button"
        >
            <span className="-mr-1 font-medium">{title}</span>
        </button>
    );
}

Alerts.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};
export default Alerts;
