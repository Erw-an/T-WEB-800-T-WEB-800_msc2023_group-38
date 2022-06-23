/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from './marker/VenueMarkers';
import api from '../../api';

function MapView({ lat, lng, data, amenity, setError }) {
    const [msg, setMsg] = useState('');

    const currentLocation = { lat, lng };
    const zoom = 12;
    const mounted = useRef(false);

    // eslint-disable-next-line no-promise-executor-return
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        (async () => {
            if (mounted.current) {
                await sleep(5000);
                setMsg('');
            } else {
                mounted.current = true;
            }
        })();
    }, [msg]);

    const onClickMarker = async (elem) => {
        try {
            await api.tripService.savePlace({
                content: { ...elem },
            });
            setMsg('Element added');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <h3>{amenity}</h3>
            <p>{msg}</p>
            <MapContainer
                center={currentLocation}
                zoom={zoom}
                scrollWheelZoom={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />{' '}
                <Markers data={data} onClickMarker={onClickMarker} />
            </MapContainer>
        </>
    );
}

MapView.propTypes = {
    amenity: PropTypes.any.isRequired,
    data: PropTypes.any.isRequired,
    lat: PropTypes.string.isRequired,
    lng: PropTypes.string.isRequired,
    setError: PropTypes.func.isRequired,
};
export default MapView;
