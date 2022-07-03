import React from 'react';
import { Marker } from 'react-leaflet';
import PropTypes from 'prop-types';
import PreviewMarkerIcon from '../../../assets/MarkerIcon';
import PreviewMarkerPopup from './PreviewMarkerPopup';

function PreviewMarkers({ data }) {
    const markers = data.map((elem) => {
        const { place } = elem;
        return (
            <Marker
                key={place.id}
                position={[place.lat, place.lng]}
                icon={PreviewMarkerIcon}
            >
                <PreviewMarkerPopup elem={place} />
            </Marker>
        );
    });
    return <div>{markers}</div>;
}

PreviewMarkers.propTypes = {
    data: PropTypes.shape({
        map: PropTypes.func,
    }).isRequired,
};

export default PreviewMarkers;
