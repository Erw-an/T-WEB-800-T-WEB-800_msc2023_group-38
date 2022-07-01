import PropTypes from 'prop-types';
import React from 'react';

function Card({ title, desc }) {
    return (
        <div className="relative border border-gray-200 bg-white rounded-lg ">
            <button
                type="button"
                className="absolute p-1 bg-gray-100 border border-gray-300 rounded-full -top-1 -right-1"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            <div className="flex items-center p-4">
                <div className="object-cover w-12 h-12 rounded-lg bg-gray-50 border-gray-100 border-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-arrow-back"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#000000"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
                    </svg>
                </div>

                <div className="ml-3 overflow-hidden">
                    <p className="font-medium text-gray-900">{title}</p>
                    <p className="max-w-xs text-sm text-gray-500 truncate">
                        {desc}
                    </p>
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
};
export default Card;
