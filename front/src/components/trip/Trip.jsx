import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import api from '../../api';

function Trip({ navigateToDestination, navigateToTripItem }) {
    const [trips, setTrips] = useState([]);
    const [error, setError] = useState();
    const [newTrip, setNewTrip] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.tripService.getTrips();
                setTrips(res);
            } catch (e) {
                setError(e.message);
                setTrips([]);
            }
        })();
    }, []);

    const handleClick = async () => {
        try {
            const res = await api.tripService.createTrip();
            setNewTrip(res);
            setTimeout(() => navigateToDestination(), 1500);
        } catch (e) {
            setError(e.message);
            setNewTrip(null);
        }
    };
    return (
        <>
            <button type="button" onClick={handleClick}>
                Create a trip
            </button>

            {newTrip ? (
                <>
                    <h4>New trip created !</h4>
                    <>
                        <p>{newTrip.id}</p>
                        <p>{newTrip.createdAt}</p>
                        <p>{newTrip.updatedAt}</p>
                    </>
                </>
            ) : (
                <div>
                    <h2>Trips list :</h2>
                    {trips.length > 0 &&
                        trips.map((elem, idx) => (
                            <div>
                                <p>
                                    ================================================
                                </p>
                                <p>Trip {idx}</p>
                                <p>Created at :{elem.trip.createdAt}</p>
                                <p>Updated at :{elem.trip.updatedAt}</p>
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigateToTripItem(elem.trip.id)
                                    }
                                >
                                    See trips
                                </button>
                            </div>
                        ))}
                </div>
            )}
            <p>{error}</p>
        </>
    );
}

Trip.propTypes = {
    navigateToDestination: PropTypes.func.isRequired,
    navigateToTripItem: PropTypes.func.isRequired,
};

export default Trip;
