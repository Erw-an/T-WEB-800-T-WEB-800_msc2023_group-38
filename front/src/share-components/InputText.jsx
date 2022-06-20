import React from 'react';
import PropTypes from 'prop-types';

function Card({ onChange, placeholder, value }) {
    return (
        <label
            className="relative block p-3 border-2 border-gray-200 rounded-lg bg-white"
            htmlFor="name"
        >
            <input
                onChange={onChange}
                className="w-full px-0 pt-3.5 pb-0 text-sm placeholder-transparent border-blue-200 !outline-none border-none focus:ring-0 peer"
                id="name"
                type="text"
                placeholder={placeholder}
                value={value}
            />

            <span className="absolute text-xs font-medium text-gray-500 transition-all left-3 peer-focus:text-xs peer-focus:top-3 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm">
                {placeholder}
            </span>
        </label>
    );
}

Card.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
export default Card;
