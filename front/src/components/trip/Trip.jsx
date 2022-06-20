import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import api from '../../api';
import Alerts from '../../share-components/Alerts';
import ButtonArrow from '../../share-components/ButtonArrow';
import Card from '../../share-components/Card';

function Trip({ navigateToDestination }) {
    const [trips, setTrips] = useState([]);
    const [error, setError] = useState();
    const [newTrip, setNewTrip] = useState(null);

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
            <div className="ml-7">
                <ButtonArrow
                    title="Create a new trip"
                    onClick={handleClick}
                    outlined="true"
                />
            </div>

            {newTrip ? (
                <Alerts
                    title="New trip created !"
                    desc={`Id: ${newTrip.id} Created at: ${newTrip.createdAt} Updated at: ${newTrip.updatedAt}`}
                    type="success"
                />
            ) : (
                <div>
                    {trips.length > 0 &&
                        trips.map((elem, idx) => (
                            <Card
                                title={idx}
                                createdAt={elem.trip.createdAt}
                                updatedAt={elem.trip.updatedAt}
                            />
                        ))}
                </div>
            )}
            <p>{error}</p>
        </>
    );
}

Trip.propTypes = {
    navigateToDestination: PropTypes.func.isRequired,
};

export default Trip;
