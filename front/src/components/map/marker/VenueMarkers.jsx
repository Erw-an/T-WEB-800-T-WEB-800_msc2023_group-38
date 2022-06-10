import React from 'react';
import { Marker } from 'react-leaflet';
import PropTypes from 'prop-types';
import VenueLocationIcon from './VenueLocationIcon';
import MarkerPopup from './MarkerPopup';

function VenueMarkers({ data, setError, setMsg }) {
    const markers = data.map((elem) => (
        <Marker
            key={elem.id}
            position={[elem.lat, elem.lon]}
            icon={VenueLocationIcon}
        >
            <MarkerPopup elem={elem} setError={setError} setMsg={setMsg} />
        </Marker>
    ));
    return <div>{markers}</div>;
}

VenueMarkers.propTypes = {
    data: PropTypes.shape({
        map: PropTypes.func,
    }).isRequired,
    setError: PropTypes.func.isRequired,
    setMsg: PropTypes.func.isRequired,
};

export default VenueMarkers;
