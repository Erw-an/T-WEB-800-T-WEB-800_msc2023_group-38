/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import api from '../../api';

import './Planner.css';
import MapView from '../map/MapView';

function Planner({ sharedState, navigateToItinerary }) {
    const { positionEnd, adressEnd } = sharedState;
    const [selected, setSelected] = useState([]);
    const [error, setError] = useState('');
    const [data, setData] = useState({});
    const [mapIsHidden, setMapIsHidden] = useState(true);
    const [lastSelected, setLastSelected] = useState({});

    const selectOptions = [
        { label: 'Enjoy 🍇', value: 'enjoy' },
        { label: 'Eat 🥭', value: 'eat' },
        // { label: 'Sleep 🥭', value: 'sleep' },   // TODO
        { label: 'Drink 🥭', value: 'drink' },
        { label: 'Travel 🍓', value: 'travel' },
    ];

    const handleClick = async () => {
        try {
            if (!selected.length > 0) {
                throw new Error('Please select option');
            }

            const amenity = selected.map((item) => item.value)[0];
            const res = await api.geoService.getPlacesNearby(
                positionEnd,
                amenity,
            );

            setData(res);
            setMapIsHidden(false);
            setLastSelected(selected[0].label);
        } catch (e) {
            setError(e.message);
            setData({});
            setMapIsHidden(true);
        }
    };

    return (
        <>
            <div>
                <h3> Find something to do around : {adressEnd}</h3>

                <MultiSelect
                    options={selectOptions}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                />

                <button type="button" onClick={handleClick}>
                    Search
                </button>

                <button
                    type="button"
                    onClick={() => {
                        if (data.length > 0) setMapIsHidden(!mapIsHidden);
                    }}
                >
                    {!data.length > 0
                        ? 'No data loaded'
                        : mapIsHidden
                        ? 'Show map'
                        : 'Hide map'}
                </button>
            </div>
            <p>{error}</p>
            <div>
                {data.length > 0 && !mapIsHidden && (
                    <>
                        <MapView
                            data={data}
                            lat={positionEnd.lat}
                            lng={positionEnd.lng}
                            amenity={lastSelected}
                            setError={setError}
                        />
                        <button type="button" onClick={navigateToItinerary}>
                            See map preview
                        </button>
                    </>
                )}
            </div>
        </>
    );
}

Planner.propTypes = {
    navigateToItinerary: PropTypes.func.isRequired,
    sharedState: PropTypes.shape({
        adressEnd: PropTypes.any,
        positionEnd: PropTypes.shape({
            lat: PropTypes.any,
            lng: PropTypes.any,
        }),
    }).isRequired,
};

export default Planner;
