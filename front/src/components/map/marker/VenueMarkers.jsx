import React from 'react';
import { Marker } from 'react-leaflet';
import PropTypes from 'prop-types';
import VenueLocationIcon from '../../../assets/MarkerIcon';
import MarkerPopup from './MarkerPopup';

function VenueMarkers({ data, onClickMarker }) {
    const markers = data.map((elem) => (
        <Marker
            key={elem.id}
            position={[elem.lat, elem.lon]}
            icon={VenueLocationIcon}
        >
            <MarkerPopup elem={elem} onClickMarker={onClickMarker} />
        </Marker>
    ));
    return <div>{markers}</div>;
}

VenueMarkers.propTypes = {
    data: PropTypes.shape({
        map: PropTypes.func,
    }).isRequired,
    onClickMarker: PropTypes.func.isRequired,
};

export default VenueMarkers;
