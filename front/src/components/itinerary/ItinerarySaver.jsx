/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import domtoimage from 'dom-to-image';
import 'leaflet/dist/leaflet.css';
import api from '../../api';
import PreviewMarkers from './marker/PreviewMarkers';

function ItinerarySaver({
    navigateToTrip,
    positionEnd,
    dirSteps,
    adresseStart,
    adresseEnd,
}) {
    const [error, setError] = useState('');

    const [data, setData] = useState(null);

    const { lat, lng } = positionEnd;
    const zoom = 12;

    useEffect(() => {
        (async () => {
            try {
                const res = await api.tripService.getItinerary();
                setData(res.itinerary);
            } catch (err) {
                setData(null);
                setError(err);
            }
        })();
    }, []);

    const domToImgDll = async () => {
        let node = document.getElementById('itinerary');
        // eslint-disable-next-line react/no-find-dom-node
        node = ReactDOM.findDOMNode(node);
        try {
            const blob = await domtoimage.toBlob(node);
            const formData = new FormData();
            formData.append('itinerary_blob', blob);
            await api.tripService.saveItineraryFile({ formData });
            navigateToTrip();
        } catch (err) {
            console.error('oops, something went wrong!', err);
        }
    };

    return (
        <>
            <div id="itinerary">
                <h3>Itinerary resume</h3>
                <p>{error}</p>
                {data && (
                    <>
                        <MapContainer
                            center={{ lat, lng }}
                            zoom={zoom}
                            scrollWheelZoom={false}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />{' '}
                            <PreviewMarkers data={data.places} />
                        </MapContainer>

                        <>
                            <h3>Itinerary infos :</h3>
                            <p>Itinerary created at : {data.createdAt}</p>
                            <p>Start from :{adresseStart}</p>
                            <p>Finish to :{adresseEnd}</p>
                            <h4>Places to visit :</h4>
                            {data.places.map((elem) => {
                                const { place: tag } = elem;
                                return (
                                    <div>
                                        {JSON.stringify(tag)}{' '}
                                        <p>
                                            -----------------------------------------------------------------------
                                        </p>
                                    </div>
                                );
                            })}

                            <h4>Directions steps :</h4>
                            {dirSteps.map((step) => (
                                <div>
                                    <div>{JSON.stringify(step)}</div>
                                    <p>
                                        -----------------------------------------------------------------------
                                    </p>
                                </div>
                            ))}
                        </>
                    </>
                )}
            </div>
            <button type="button" onClick={domToImgDll}>
                Save
            </button>
        </>
    );
}

ItinerarySaver.propTypes = {
    adresseEnd: PropTypes.string.isRequired,
    adresseStart: PropTypes.string.isRequired,
    dirSteps: PropTypes.array.isRequired,
    navigateToTrip: PropTypes.func.isRequired,
    positionEnd: PropTypes.array.isRequired,
};

export default ItinerarySaver;
