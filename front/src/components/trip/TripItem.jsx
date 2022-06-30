/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';

function TripItem() {
    const { id } = useParams();

    const [error, setError] = useState('');

    const [itineraries, setItineraries] = useState(null);

    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    const parseItysBufferToUrl = (itys) => {
        const result = new Map();

        // eslint-disable-next-line no-restricted-syntax
        for (const item of itys) {
            const { resumeFile } = item;
            const buffer = resumeFile.data.data;

            const base64String = arrayBufferToBase64(buffer);

            const { data, ...out } = resumeFile;
            out.b64String = `data:image/png;base64,${base64String}`;

            result.set(out.id, out);
        }

        return result;
    };

    useEffect(() => {
        (async () => {
            try {
                sessionStorage.setItem('tripId', id);
                const res = await api.tripService.getItineraries();
                const arg = res.itineraries.filter((e) => e.resumeFile);
                const itys = parseItysBufferToUrl(arg);
                setItineraries(itys);
            } catch (err) {
                setItineraries(null);
                setError(err);
            }
        })();
    }, []);

    return (
        <>
            <button type="button" onClick={() => console.log('ok')}>
                Add New Itinerary
            </button>
            <div id="itinerary">
                <h3>Itinerary List</h3>
                {/* <p>{error}</p> */}
                {itineraries &&
                    [...itineraries].map(([key, value]) => (
                        <img src={value.b64String} alt="" />
                    ))}
                <button
                    type="button"
                    onClick={() => console.log('To download')}
                >
                    Download
                </button>
            </div>
        </>
    );
}

export default TripItem;
