import PropTypes from 'prop-types';
import React from 'react';
import { BlueMain, BlueSec } from '../utils/style';

function ButtonArrow({ onClick, title, outlined, active }) {
    return (
        <>
            {/* <!-- Base - Right --> */}
            {outlined === 'false' ? (
                <>
                    {active ? (
                        <button
                            type="button"
                            className={`z-0 relative 
                    
                    inline-flex items-center px-8 py-3 overflow-hidden text-white bg-${BlueMain} rounded-full  group focus:bg-${BlueSec} active:bg-${BlueMain} focus:outline-none focus:ring `}
                            onClick={() => onClick()}
                        >
                            <span className="absolute left-0 transition-transform -translate-x-full group-hover:translate-x-4">
                                <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>

                            <span className="text-sm font-medium transition-all group-hover:ml-4">
                                {title}
                            </span>
                        </button>
                    ) : (
                        <button
                            type="button"
                            className={`z-0 relative cursor-not-allowed opacity-50 inline-flex items-center px-8 py-3 overflow-hidden text-white bg-${BlueMain} rounded-full  group focus:bg-${BlueSec} active:bg-${BlueMain} focus:outline-none focus:ring `}
                        >
                            <span className="text-sm font-medium transition-all group-hover:ml-4">
                                {title}
                            </span>
                        </button>
                    )}
                    <div />
                </>
            ) : (
                <div>
                    {active ? (
                        <button
                            type="button"
                            className={`relative inline-flex items-center bg-white px-8 py-3 overflow-hidden text-indigo-600 border border-current rounded-full group focus:bg-${BlueSec} active:bg-${BlueMain} focus:outline-none focus:ring`}
                            onClick={() => onClick()}
                        >
                            <span className="absolute left-0 transition-transform -translate-x-full group-hover:translate-x-4">
                                <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>

                            <span className="text-sm font-medium transition-all group-hover:ml-4">
                                {title}
                            </span>
                        </button>
                    ) : (
                        <button
                            type="button"
                            className={`relative cursor-not-allowed opacity-50 inline-flex items-center bg-white px-8 py-3 overflow-hidden text-indigo-600 border border-current rounded-full  focus:bg-${BlueSec} active:bg-${BlueMain} focus:outline-none focus:ring`}
                        >
                            <span className="text-sm font-medium ">
                                {title}
                            </span>
                        </button>
                    )}
                    <div />
                </div>
            )}
        </>
    );
}

ButtonArrow.propTypes = {
    title: PropTypes.string.isRequired,

    outlined: PropTypes.string.isRequired,

    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    // setMsg: PropTypes.func.isRequired,
};

ButtonArrow.defaultProps = {
    active: true,
};
export default ButtonArrow;
