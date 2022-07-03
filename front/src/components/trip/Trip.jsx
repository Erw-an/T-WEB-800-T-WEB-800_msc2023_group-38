import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../api';
import Card from '../../share-components/Card';

function Trip({ done }) {
    const [trips, setTrips] = useState([]);
    const [error, setError] = useState();

    const history = useNavigate();

    const navigateToTripItem = (id) => {
        history(`/trip/${id}`);
    };
    useEffect(() => {
        (async () => {
            try {
                const res = await api.tripService.getTrips();
                console.log('res:', res);
                setTrips(res);
            } catch (e) {
                setError(e.message);
                setTrips([]);
            }
        })();
    }, []);

    return (
        <>
            <div>
                {trips.length > 0 &&
                    trips.map((elem, idx) => (
                        <Card
                            done={done}
                            title={idx}
                            itineraries={elem.trip.itineraries}
                            createdAt={elem.trip.createdAt}
                            updatedAt={elem.trip.updatedAt}
                            onClick={() => navigateToTripItem(elem.trip.id)}
                        />
                    ))}
            </div>

            <p>{error}</p>
        </>
    );
}

Trip.propTypes = {
    done: PropTypes.bool.isRequired,
};

export default Trip;
