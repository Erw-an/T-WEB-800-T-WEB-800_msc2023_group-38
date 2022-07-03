/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import domtoimage from 'dom-to-image';
import 'leaflet/dist/leaflet.css';
import api from '../../api';
import PreviewMarkers from './marker/PreviewMarkers';
import CardSm from '../../share-components/CardSm';
import CardPlace from '../../share-components/CardPlace';
import Button from '../../share-components/Button';

import save from '../../utils/icons/save.svg';

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

    const sendFile = async () => {
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
            <div className="flex justify-between mt-5 -mb-5 mx-5">
                <div />
                <div className="w-2/12">
                    <Button onClick={sendFile} title="Save" icon={save} />
                </div>
            </div>
            <div id="itinerary" className=" mx-5 mt-12 bg-white rounded-lg">
                <div className="m-5">
                    <p>{error}</p>
                    {data && (
                        <>
                            <section>
                                <div className="max-w-screen-xl px-4 -mt-8 py-16 sm:px-6 lg:px-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-16 lg:items-center">
                                        <div className="max-w-lg mx-auto text-center lg:text-left lg:mx-0">
                                            <h2 className="text-3xl font-bold sm:text-4xl">
                                                Trip resume
                                            </h2>

                                            <p className="mt-4 text-gray-600 w-full">
                                                <p>
                                                    <strong> From : </strong>{' '}
                                                    {adresseStart}
                                                </p>
                                                <p>
                                                    {' '}
                                                    <strong>To : </strong>
                                                    {adresseEnd}
                                                </p>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="flex">
                                <MapContainer
                                    center={{ lat, lng }}
                                    zoom={zoom}
                                    scrollWheelZoom={false}
                                    className="w-full rounded-md"
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />{' '}
                                    <PreviewMarkers data={data.places} />
                                </MapContainer>
                                <div className="ml-4 bg-gray-50 p-5 rounded-lg">
                                    {data.places.map((info) => (
                                        // const { place: tag } = elem;
                                        <CardPlace info={info} />
                                    ))}
                                </div>
                            </div>

                            <>
                                {dirSteps.map((step) => (
                                    <div className="my-3">
                                        <CardSm
                                            title={step.name}
                                            desc={step.instruction}
                                        />
                                    </div>
                                ))}
                            </>
                        </>
                    )}
                </div>
            </div>
            <button type="button" onClick={sendFile}>
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
