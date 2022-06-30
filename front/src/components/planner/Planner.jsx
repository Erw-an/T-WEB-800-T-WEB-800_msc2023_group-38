/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
/* eslint react/prop-types: 0 */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RadioGroup from '../../share-components/RadioGroup';
import api from '../../api';
import ButtonArrow from '../../share-components/ButtonArrow';

function Planner({
    sharedState,
    setData,
    setStepState,
    setSelected,
    selected,
}) {
    const { positionEnd } = sharedState;
    const [error, setError] = useState('');

    const values = [
        { label: 'Enjoy 🍇', value: 'enjoy' },
        { label: 'Eat 🥭', value: 'eat' },
        // { label: 'Sleep 🥭', value: 'sleep' },   // TODO
        { label: 'Drink 🥭', value: 'drink' },
        { label: 'Travel 🍓', value: 'travel' },
    ];

    const handleClick = async () => {
        try {
            if (selected === undefined) {
                throw new Error('Please select option');
            }

            const amenity = selected.value;
            const res = await api.geoService.getPlacesNearby(
                positionEnd,
                amenity,
            );

            setData(res);
            setStepState(3);
        } catch (e) {
            setError(e.message);
            setData({});
        }
    };

    return (
        <>
            <div>
                {/* <h3 className="mb-10 font-semibold">{adressEnd}</h3> */}

                <RadioGroup
                    values={values}
                    setSelected={setSelected}
                    selected={selected}
                />
                <div className="w-full flex justify-center mt-12">
                    <ButtonArrow title="Next" onClick={handleClick} />
                </div>
            </div>
            <p>{error}</p>
        </>
    );
}

Planner.propTypes = {
    navigateToItinerarySaver: PropTypes.func.isRequired,
    sharedState: PropTypes.shape({
        adressEnd: PropTypes.any,
        positionEnd: PropTypes.shape({
            lat: PropTypes.any,
            lng: PropTypes.any,
        }),
    }).isRequired,
};

export default Planner;
