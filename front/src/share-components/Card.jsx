import PropTypes from 'prop-types';
import React from 'react';
import planerDown from '../utils/icons/planerDown.svg';
import planerUp from '../utils/icons/planerUp.svg';

function Card({ done, onClick, itineraries }) {
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
                    {itineraries.map((elem) => {
                        const { adressStart, adressEnd } =
                            elem.content.itinerary.coords;

                        return (
                            <>
                                <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 mx-1 py-1.5 text-[10px] font-medium text-white">
                                    {adressStart}
                                </strong>

                                <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 mx-1 py-1.5 text-[10px] font-medium text-white">
                                    {adressEnd}
                                </strong>
                            </>
                        );
                    })}

                    <h2 className="mt-4 text-lg font-medium sm:text-xl">
                        <button
                            type="button"
                            onClick={() => onClick()}
                            className="hover:underline"
                        >
                            See resume {' >'}
                        </button>
                    </h2>
                </div>
            </div>
        </article>
    );
}

Card.propTypes = {
    done: PropTypes.bool.isRequired,
    itineraries: PropTypes.shape({
        map: PropTypes,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};
export default Card;
