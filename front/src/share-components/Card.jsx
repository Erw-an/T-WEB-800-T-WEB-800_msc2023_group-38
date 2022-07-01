import PropTypes from 'prop-types';
import React from 'react';
import planerDown from '../utils/icons/planerDown.svg';
import planerUp from '../utils/icons/planerUp.svg';

function Card({ done, onClick }) {
    return (
        <article className="p-6 bg-white sm:p-8 rounded-xl ring ring-indigo-50 shadow-md m-6">
            <div className="flex items-start">
                <div
                    className="hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
                    ariaHidden="true"
                >
                    <div className="flex items-center gap-1">
                        <img
                            src={done === false ? planerUp : planerDown}
                            alt="planer"
                        />
                    </div>
                </div>

                <div className="sm:ml-8">
                    <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 mx-1 py-1.5 text-[10px] font-medium text-white">
                        Toulouse
                    </strong>
                    <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 mx-1 py-1.5 text-[10px] font-medium text-white">
                        Paris
                    </strong>

                    <h2 className="mt-4 text-lg font-medium sm:text-xl">
                        <button
                            type="button"
                            onClick={() => onClick()}
                            className="hover:underline"
                        >
                            See resume {' >'}
                        </button>
                    </h2>

                    {/* <p className="mt-1 text-sm text-gray-700">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Ipsam nulla amet voluptatum sit rerum, atque, quo
                        culpa ut necessitatibus eius suscipit eum accusamus,
                        aperiam voluptas exercitationem facere aliquid fuga.
                        Sint.
                    </p> */}

                    <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                        {/* <div className="flex items-center text-gray-500">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="ml-1 text-xs font-medium">
                                48:32 minutes
                            </p>
                        </div> */}

                        {/* <span className="hidden sm:block" ariaHidden="true">
                            &middot;
                        </span> */}

                        {/* <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                            Featuring{' '}
                            <div className="underline hover:text-gray-700">
                                Barry
                            </div>
                            ,
                            <div className="underline hover:text-gray-700">
                                Sandra
                            </div>{' '}
                            and
                            <div className="underline hover:text-gray-700">
                                August
                            </div>
                        </p> */}
                    </div>
                </div>
            </div>
        </article>
    );
}

Card.propTypes = {
    done: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};
export default Card;
